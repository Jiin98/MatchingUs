const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// 무작위 문자열 생성 함수
function generateRandomString(length) {
  return crypto.randomBytes(length).toString('hex');
}

// 무작위 비밀 키 생성
const secretKey = generateRandomString(32);
console.log('Generated Secret Key:', secretKey);

// 데이터베이스 연결 정보 설정
const dbConfig = {
  host: 'localhost', 
  user: 'root', 
  password: '1207', 
  database: 'matchingus_db'
};

// MySQL 연결
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the database!');
});

// 회원가입 API
app.post('/api/register', (req, res) => {
  const { studentID, password, name, gender, residence, birthYear, college, department, email } = req.body;

  const newUser = { studentID, password, name, gender, residence, birthYear, college, department, email };
  connection.query('INSERT INTO users SET ?', newUser, (err, result) => {
    if (err) {
      console.error('Error registering the user:', err.message);
      res.status(500).json({ error: 'Failed to register the user' });
    } else {
      res.status(201).json({ message: 'User registered successfully' });
    }
  });
});

// JWT를 확인하기 위한 미들웨어
function authenticateToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ error: 'Authentication failed. Token not found.' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Authentication failed. Invalid token.' });
    }

    req.user = user;
    next();
  });
}

// 로그인 API
app.post('/api/login', (req, res) => {
  const { studentID, password } = req.body;

  connection.query('SELECT * FROM users WHERE studentID = ? AND password = ?', [studentID, password], (err, results) => {
    if (err) {
      console.error('Error logging in:', err.message);
      res.status(500).json({ error: 'Failed to log in' });
    } else {
      if (results.length === 0) {
        res.status(401).json({ error: 'Invalid credentials' });
      } else {
        const user = results[0];
        const token = jwt.sign({ userId: user.studentID, name: user.name }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ message: 'login successful', user: results[0] });
      }
    }
  });
});

app.get('/api/protectedRoute', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully!', user: req.user });
});

// 게시물 추가 API
app.post('/api/addPost', (req, res) => {
  const { userID, matchingTitle, matchingContent, matchingType } = req.body;
  const newPost = { userID, matchingTitle, matchingContent, matchingType };

  connection.query('INSERT INTO posts SET ?', newPost, (err, result) => {
    if (err) {
      console.error('Error adding the post:', err.message);
      res.status(500).json({ error: 'Failed to add the post' });
    } else {
      res.status(201).json({ message: 'Success to add the post' });
    }
  });
});

// 1-2인 매칭 게시글 조회 API
app.get('/api/getPostsForMatchingType12', (req, res) => {
  const query = `
  SELECT posts.*, users.gender, users.department
    FROM posts
    JOIN users ON posts.userID = users.id
    WHERE matchingType = '1-2인 매칭'
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching the posts:', err.message);
      res.status(500).json({ error: 'Failed to fetch the posts' });
    } else {
      res.json(results);
    }
  });
});

// 3인 이상 매칭 게시글 조회 API
app.get('/api/getPostsForMatchingType34', (req, res) => {
  const query = `
  SELECT posts.*, users.gender, users.department
    FROM posts
    JOIN users ON posts.userID = users.id
    WHERE matchingType = '3인 이상 매칭'
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching the posts:', err.message);
      res.status(500).json({ error: 'Failed to fetch the posts' });
    } else {
      res.json(results);
    }
  });
});

//postID에 해당하는 게시글 조회 API
app.get('/api/getPostDetail/:postID', (req, res) => {
  const postID = req.params.postID;
  const query = `
    SELECT posts.*, users.gender, users.department
    FROM posts
    JOIN users ON posts.userID = users.id
    WHERE posts.postID = ?
  `;

  connection.query(query, [postID], (err, results) => {
    if (err) {
      console.error('Error fetching the post detail:', err.message);
      res.status(500).json({ error: 'Failed to fetch the post detail' });
    } else {
      res.json(results[0]);
    }
  });
});
//댓글 추가 API
app.post('/api/addComment', (req, res) => {
  const { postID, userID, content } = req.body;

  const query = "INSERT INTO comments (postID, userID, content) VALUES (?, ?, ?)";

  connection.query(query, [postID, userID, content], (err, result) => {
    if (err) {
      console.error('Error adding the comment:', err.message);
      res.status(500).json({ error: 'Failed to add the comment' });
    } else {
      res.status(201).json({ message: 'Comment added successfully' });
    }
  });
});

// postID에 해당하는 게시글의 댓글 조회 API
app.get('/api/getComments/:postID', (req, res) => {
  const postID = req.params.postID;

  const query = "SELECT * FROM comments WHERE postID = ?";

  connection.query(query, [postID], (err, comments) => {
    if (err) {
      console.error('Error fetching the comments:', err.message);
      res.status(500).json({ error: 'Failed to fetch the comments' });
    } else {
      res.status(200).json(comments);
    }
  });
});

// 로그인한 회원 정보 조회 API
app.get('/api/userInfo', (req, res) => {
  const userID = req.query.userID;

  const query = `
    SELECT studentID, name, gender, residence, birthYear, college, department, email
    FROM users
    WHERE studentID = ?
  `;

  connection.query(query, [userID], (err, results) => {
    if (err) {
      console.error('Error fetching user info:', err.message);
      res.status(500).json({ error: 'Failed to fetch user info' });
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    }
  });
});

// 로그인한 회원 정보 수정 시 업데이트 API
app.put('/api/updateUserInfo', (req, res) => {
  const { studentID, userInfo } = req.body;

  const query = `
    UPDATE users
    SET name = ?, gender = ?, residence = ?, birthYear = ?, college = ?, department = ?, email = ?
    WHERE studentID = ?
  `;

  const { name, gender, residence, birthYear, college, department, email } = userInfo;
  connection.query(query, [name, gender, residence, birthYear, college, department, email, studentID], (err, result) => {
    if (err) {
      console.error('Error updating user info:', err.message);
      res.status(500).json({ error: 'Failed to update user info' });
    } else {
      res.status(200).json({ message: 'User info updated successfully' });
    }
  });
});

//학번 중복 여부 조회 API
app.get('/api/checkDuplicateStudentID/:studentID', (req, res) => {
  const studentID = req.params.studentID;

  connection.query('SELECT * FROM users WHERE studentID = ?', [studentID], (err, results) => {
    if (err) {
      console.error('Error checking duplicate studentID:', err.message);
      res.status(500).json({ error: 'Failed to check duplicate studentID' });
    } else {
      if (results.length > 0) {
        res.status(409).json({ duplicate: true });
      } else {
        res.status(200).json({ duplicate: false });
      }
    }
  });
});

// 로그인한 회원의 게시글 조회 API
app.get('/api/getUserPosts', (req, res) => {
  const userID = req.query.userID;

  const query = `
  SELECT posts.*, users.gender, users.department
    FROM posts
    JOIN users ON posts.userID = users.id
    WHERE studentID = ?
  `;


  connection.query(query, [userID], (err, results) => {
    if (err) {
      console.error('Error fetching user posts:', err.message);
      res.status(500).json({ error: 'Failed to fetch user posts' });
    } else {
      res.json(results);
    }
  });
});

// 게시글 수정 시 업데이트 API
app.put('/api/updatePost/:postID', (req, res) => {
  const postID = req.params.postID;
  const { matchingTitle, matchingContent, matchingType } = req.body;

  const updatedPostData = {
    matchingTitle,
    matchingContent,
    matchingType,
  };

  connection.query(
    'UPDATE posts SET ? WHERE postID = ?',
    [updatedPostData, postID],
    (err, result) => {
      if (err) {
        console.error('Error:', err.message);
        res.status(500).json({ error: 'Error' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'No post found' });
        } else {
          res.status(200).json({ message: 'Post updated' });
        }
      }
    }
  );
});

const port = 3001;
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
}); 