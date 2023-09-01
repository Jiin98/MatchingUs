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
          <button @click="goToLoginPage" class="btn btn-outline-success" style="color: #9370DB; text-decoration: none;">
            <i  class="fa-solid fa-right-from-bracket"></i> LOG OUT!
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
        <div class="post-it" :class="{ male: postDetail.gender === 'male', female: postDetail.gender === 'female' }">
    <h3>{{ postDetail.matchingTitle }}</h3>
    <p>인원: {{ postDetail.matchingType }}</p>
    <p>학과: {{ postDetail.department }}</p>
    <p>내용: {{ postDetail.matchingContent }}</p>
</div>
          <div class="comments-section">
        <!-- <h4>댓글</h4> -->
        <div class="comments-list">
          <ul class="comment-ul">
  <li v-for="comment in comments" :key="comment.commentID">
    {{ comment.content }}
  </li>
</ul>
        </div>

        <div class="add-comment" >
        <textarea class="textarea1" v-model="content" placeholder="댓글을 작성해주세요."></textarea>
        <button class="comment-button" @click="addComment">댓글 추가</button>
    </div>

        <p class="warning-text" v-if="isCommentEmpty">추가할 내용이 없습니다.</p>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
  return {
    comments: [],
    postDetail: {},
    content: '',
    isCommentEmpty: false
  };
},
created() {
    const postID = this.$route.params.postID;
    axios.get(`http://localhost:3001/api/getPostDetail/${postID}`)
    .then(response => {
        this.postDetail = response.data;
    })
    .catch(error => {
        console.error('Error fetching post details:', error);
    });
    axios.get(`http://localhost:3001/api/getComments/${postID}`)
.then(response => {
    this.comments = response.data;
})
.catch(error => {
    console.error('Error fetching comments:', error);
});
},
computed: {
    user() {
      return JSON.parse(localStorage.getItem('user')) || {};
    }
  },  
  methods: {
    async addComment() {
            const postID = this.postDetail.postID;
            const loggedInUser = JSON.parse(localStorage.getItem('user'));
            const userID = loggedInUser.id;

            try {
                const response = await axios.post('http://localhost:3001/api/addComment', {
                    postID,
                    userID,
                    content: this.content // 변경된 부분
                });

                if (response.status === 201) {
                    alert('댓글이 성공적으로 추가되었습니다.');
                    this.content = ''; // 댓글 내용 초기화
                }
            } catch (error) {
                console.error('댓글 추가 중 오류 발생:', error);
                alert('댓글을 추가하는데 실패했습니다.');
            }
        },

    
    // 내 정보 페이지로 이동
    goToMyInfoPage() {
      this.$router.push("/MyInfoPage");
    },

    goToLoginPage() {
      this.$router.push("/");
    },

    // 매칭 신청 페이지로 이동
    goToMatchingApplyPage() {
      this.$router.push("/MatchingApplyPage");
    },

    // 매칭 현황 페이지로 이동
    goToMatchingStatusPage() {
      this.$router.push("/MatchingApplyDetailPage");
    },

    goToMainPage() {
      this.$router.push("/MainPage");
    },

    goToNoticePage() {
      this.$router.push("/NoticePage");
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
  align-items: center; /* 중앙 정렬을 위해 추가 */
  margin-top: 150px;
  margin-right: 150px;
  margin-left: 350px;
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