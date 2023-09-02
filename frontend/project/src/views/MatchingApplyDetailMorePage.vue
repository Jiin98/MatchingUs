<template>
    <div>
      <!-- 네비게이션 바 -->
      <nav class="navbar bg-body-tertiary fixed-top">
        
     
  <div class="container-fluid">
          <div class="navbar_logo">
            <!-- 매칭어스 로고 이미지 -->
            <span class="MatchingUs">
              <img  @click="goToMainPage" src="/image/logo.png" class="img"  alt="매칭어스 로고" />
            </span>
          </div>
          <div class="navbar_right">
            <div class="navbar_welcome">
              <!-- 사용자 이름과 환영 메시지 -->
              <div class="welcome">환영합니다, <strong class="name">{{ user.name }}</strong>님! <i class="fa-regular fa-face-smile"></i></div>
            </div>
            <!-- 로그아웃 버튼 -->
            <button @click="logout" class="btn btn-outline-success" style="color: #9370DB; text-decoration: none;">
              <i class="fa-solid fa-right-from-bracket"></i> LOG OUT!
            </button>
          </div>
        </div>
      </nav>
  
      <!-- 사이드 메뉴 바 -->
      <nav class="menuBar fixed-top">
        <div class="side_nav">
          <ul class="basicMenu">
            <li>
              <!-- 내 정보 페이지로 이동 버튼 -->
              <button @click="goToMyInfoPage"><p style="text-decoration: none; color: white;">내 정보</p></button>
            </li>
            <li>
              <!-- 매칭 신청 페이지로 이동 버튼 -->
              <button @click="goToMatchingApplyPage"><p style="text-decoration: none; color: white;">매칭 신청</p></button>
            </li>
            <li>
              <!-- 매칭 현황 페이지로 이동 버튼 -->
              <button @click="goToMatchingStatusPage"><p style="text-decoration: none; color: white;">매칭 현황</p></button>
            </li>
            <li>
                      <!-- 공지사항 페이지로 이동 -->
                      <button @click="goToNoticePage"><p style="text-decoration: none; color: white;">공지사항</p></button>
                  </li>
          </ul>
        </div>
      </nav>
      </div>
      
      <div class="content">
        <section id="postDetailContainer">
            <div  class="post-it female">
                <h3> 컴퓨터공학과 남학생 3명과 친목 과팅을 구합니다!</h3>
                <p>인원: 3명</p>
                <p>학과: 공과대학 시스템경영공학부 산업경영공학전공</p>
                <p>내용: 컴퓨터공학과의 친구들과 함께 재미있고 유익한 시간을 보내고 싶어 과팅을 구하고 있습니다. 함께 편하게 대화하며 공부나 취미 등 다양한 이야기를 나눌 수 있는 분들을 찾고 있어요. 관심 있으신 분들은 댓글 부탁드립니다! </p>
            </div>
             <!-- Edit and Delete buttons -->
      <div class="edit-delete-buttons">
          <button class="edit-button" @click="editMatching">수정</button>
          <button class="delete-button" @click="deleteMatching">삭제</button>
      </div>
            <div class="comments-section">
          <!-- <h4>댓글</h4> -->
          <div class="comments-list">
            <ul class="comment-ul">
              <li v-for="comment in comments" :key="comment">{{ comment }}</li>
            </ul>
          </div>
  
          <div class="add-comment">
            <textarea v-model="newComment" placeholder="댓글을 작성해주세요."></textarea>
            <button class="comment-button" @click="addComment">댓글 추가</button>
          </div>
  
          <p class="warning-text" v-if="isCommentEmpty">추가할 내용이 없습니다.</p>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    data() {
    return {
      comments: ['댓글1: 안녕하세요! 매칭을 원합니다.', '댓글2: 저도 참여하고 싶네요!'],
        newComment: '',
        isCommentEmpty: false // 추가된 부분
    };
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem('user')) || {};
    }
  },  
  methods: {
    editMatching() {
              //수정 로직 구현
          },
          deleteMatching() {
              if (confirm('정말로 삭제하시겠습니까?')) {
                  // 삭제 로직 구현
              }
          },
     
      // 내 정보 페이지로 이동
      goToMyInfoPage() {
        this.$router.push("/MyInfoPage");
      },
  
      // 매칭 신청 페이지로 이동
      goToMatchingApplyPage() {
        this.$router.push("/MatchingApplyPage");
      },
  
      // 매칭 현황 페이지로 이동
      goToMatchingStatusPage() {
        this.$router.push("/MatchingApplyDetailPage");
      },
      goToMatchingApplyDetailMorePage() {
        this.$router.push("/MatchingApplyDetailMorePage");
      },
  
      goToMainPage() {
        this.$router.push("/MainPage");
      },
  
      goToNoticePage() {
        this.$router.push("/NoticePage");
      },addComment() {
        if (this.newComment.trim() !== '') {
          this.comments.push(this.newComment);
          this.newComment = '';
          this.isCommentEmpty = false; // 내용이 있을 때 경고 문구 제거
        } else {
          this.isCommentEmpty = true; // 내용이 없을 때 경고 문구 표시
        }
      }
    }
  }
  </script>
  
  <style scoped>
body {
    margin: 0;
    background-color: white;
    font-family: 'jua', sans-serif;
}

.MatchingUs {
    font-size: 28px;
    color: #9370DB;
}

/* 이미지의 크기를 조절하는 .img 클래스에 스타일 추가 */
.img {
    width: 200px; /* 이미지의 너비를 200px로 조정 */
    height: auto; /* 높이를 자동으로 조정하여 가로 세로 비율 유지 */
    margin-left: -20px; /* 이미지를 왼쪽으로 20px 이동 */
}


.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F6E6F6;
    padding: 8px 12px;
    font-family: 'jua', sans-serif;
}

.navbar_logo {
    font-size: 24px;
    font-family: 'jua', sans-serif;
}

.navbar_logo .logo_image {
    margin-right: 8px; 
}

.navbar_welcome {
    display: flex;
    align-items: center;
    margin-right: 30px; 
    margin-top: 10px;
    font-weight: 400;
    font-family: 'jua', sans-serif;
}

.navbar_welcome .welcome {
    color: #9370DB;
    margin-bottom: 10px;
    font-family: 'jua', sans-serif;
}

.card-img-top {
    width: 300px;
    height: 180px;
}

.btn.btn-outline-success {
    /* color: #9370DB; */
    border-color: #9370DB; 
    font-weight: 500;
    font-family: 'jua', sans-serif;
}

.navbar_right {
    display: flex;
    align-items: center;
    font-family: 'jua', sans-serif;
}

.navbar_right .btn {
    margin-left: auto;
    background-color: #F6E6F6; /* Set the background color to match the navbar background color */
/* Set the border color to match the text color */
font-family: 'jua', sans-serif;
}

.navbar_right .btn a {
/* Set the text color of the button */
    text-decoration: none;
    font-family: 'jua', sans-serif;
}

.navbar_right .btn:hover {
    transform: scale(1.05);
}



/* 사이드 메뉴 바 */
.side_nav {
    width: 200px;
    height: 100%;
    position: fixed;
    background-color:#cccccc; /* 회색으로 변경 */
    padding: 20px;
    font-family: 'jua', sans-serif;
}

.basicMenu button:hover {
    background-color:#AAAAAA; /* 호버시 진한 회색으로 변경 */
    font-family: 'jua', sans-serif;
}

.basicMenu {
    list-style: none;
    padding: 0;
    margin: 0;
    font-family: 'jua', sans-serif;
}

.basicMenu button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
    margin-bottom: 10px;
    width: 100%;
    text-align: left;
    color: white; /* 버튼 텍스트 색상 흰색으로 설정 */
    font-size: 16px;
    transition: background-color 0.3s; /* 호버 효과 추가 */
    font-family: 'jua', sans-serif;
}

.menuBar {
  top: 95px; /* Adjust this value according to your fixed navbar height */
  font-family: 'jua', sans-serif;
}

.container {
 display: flex;
    justify-content: center;
    align-items: center;
  font-family: 'jua', sans-serif;
}
  
.content {
  display: flex;
  flex-direction: column;
  margin-right: 150px;
  margin-left: 350px;
  margin-top: 150px;
}

  
  /* 상세 정보 스타일 */
  
  .post-it.male {
    background-color: #deeeff; /* Blue color for male */
    font-family: 'gangwon', sans-serif;
  }
  
  .post-it.female {
    background-color: #ffe4ee; /* Pink color for female */
    font-family: 'gangwon', sans-serif;
  
  }
  .post-it {
    width: 1000px;
    height: 500px;
    margin: 10px;
    padding: 10px;
  
  
    box-shadow: 2px 2px 5px #aaa;
    background-color: #fefabc; /* Default yellow color for post-it */
    transition: transform 0.2s; /* Animation for hover effect */
    font-size: 25px;
  }
  
  
  .edit-delete-buttons {
    display: flex;
    margin: 10px 0;
  }
  
  .edit-delete-buttons button {
    background-color: #F6E6F6;
  color: #9370DB;
  border: 1px solid #9370DB;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: 'jua', sans-serif;
  }
  
  /* 댓글 섹션 스타일 */
  
  .comment-ul {
  list-style: none;
  margin: none;
  padding: 10px;
}

.comment-ul li {
  margin-bottom: 10px; /* 댓글 간격을 조정 */
  
}

.comment-button {
  width: 70px;
  
}

.comments-section {
  width: 1000px;
  border: 1px solid #eee;
  border-radius: 5px;
  margin: 10px;
  margin-top: 30px;
  padding: 10px;
  
}


.add-comment {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  
}

.textarea-wrapper {
  position: relative;
  
}

.add-comment textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  margin-bottom: 10px;
  resize: vertical;
  border: 1px solid #F6E6F6;
}

.add-comment textarea:focus {
  border: 1px solid #F6E6F6;/* 클릭시에 변경할 border 색상 설정 */
}

.add-comment button {
  width: auto; /* Button width takes up available space */
  background-color: #F6E6F6;
  color: #9370DB;
  border: 1px solid #9370DB;
  padding: 7px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  align-self: flex-end;
}

.add-comment button:hover {
  background-color: #9370DB;
  color: white;
}
  
  .warning-text {
    color: red;
    font-size: 15px;
    margin-top: 10px;
    font-weight: bold;
  }
  /* 반응형 레이아웃 (사이드바가 사라지는 화면 크기 이하) */
  @media (max-width: 768px) { /* 예시: 768px 이하의 화면 크기에서 적용 */
      .content {
          margin-left: 20px; /* 사이드바가 사라지면 좌측 마진을 줄임 */
      }
      
      .side_nav {
          display: none; /* 사이드바를 숨김 */
      }
  }
  
  @font-face {
    font-family: 'gangwon';
    src:url(../../public/fonts/강원교육현옥샘.ttf)
  }
  
  @import "~bootstrap/dist/css/bootstrap.min.css";
  @import "~@fortawesome/fontawesome-free/css/all.min.css";
  </style>