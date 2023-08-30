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
  
  // 무작위 비밀 키 생성 (예: 32바이트 길이의 문자열)
  const secretKey = generateRandomString(32);
  console.log('Generated Secret Key:', secretKey);

// 데이터베이스 연결 정보 설정
const dbConfig = {
    host: 'localhost', // 데이터베이스 호스트 주소
    user: 'root', // 데이터베이스 사용자 이름
    password: '1207' , // 데이터베이스 사용자 비밀번호
    database: 'matchingus_db' // 데이터베이스 이름
  };
  
  // MySQL 데이터베이스와 연결 생성
  const connection = mysql.createConnection(dbConfig);
  
  // 데이터베이스 연결 오류 처리
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.message);
      return;
    }
    console.log('Connected to the database!');
  });
  
// 사용자 등록 API 엔드포인트
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
    // 헤더에서 JWT 토큰을 추출합니다.
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
    if (token == null) {
      // 토큰이 없는 경우, 인증 오류를 반환합니다.
      return res.status(401).json({ error: 'Authentication failed. Token not found.' });
    }
  
    // 토큰을 검증합니다.
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        // 검증에 실패한 경우, 인증 오류를 반환합니다.
        return res.status(403).json({ error: 'Authentication failed. Invalid token.' });
      }
  
      // 검증이 성공한 경우, 요청 객체에 사용자 정보를 추가합니다.
      req.user = user;
      next();
    });
  }
  
  // 사용자 로그인 API 엔드포인트
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

          res.status(200).json({ message: 'Login successful', user: results[0] });
        }
      }
    });
  });

  // 인증이 필요한 라우트에 authenticateToken 미들웨어를 추가합니다.
app.get('/api/protectedRoute', authenticateToken, (req, res) => {
    // 이 라우트에 접근하기 위해서는 유효한 토큰이 필요합니다.
    // JWT 검증을 통과한 경우, req.user 객체를 통해 사용자 정보에 접근할 수 있습니다.
    res.json({ message: 'Protected route accessed successfully!', user: req.user });
  });

// 게시물 추가 API 엔드포인트
app.post('/api/addPost', (req, res) => {
  const { userID, matchingTitle, matchingContent, matchingType } = req.body;
  const newPost = { userID, matchingTitle, matchingContent, matchingType };
  
  connection.query('INSERT INTO posts SET ?', newPost, (err, result) => {
      if (err) {
          console.error('Error adding the post:', err.message);
          res.status(500).json({ error: 'Failed to add the post' });
      } else {
          res.status(201).json({ message: 'Post added successfully' });
      }
  });
});

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
      res.json(results[0]); // 첫 번째 결과만 반환합니다.
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

// 게시물의 댓글 가져오기 API
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

// 사용자 정보 불러오기 API 엔드포인트 추가
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
        res.json(results[0]); // 첫 번째 결과만 반환합니다.
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    }
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
}); 