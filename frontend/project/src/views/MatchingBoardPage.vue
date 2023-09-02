<template>
  <div>
    <!-- 네비게이션 바 -->
    <!-- 상단 고정 네비게이션 바 -->
    <nav class="navbar bg-body-tertiary fixed-top">
      <div class="container-fluid">
        <div class="navbar_logo">
          <!-- 매칭어스 로고 이미지 -->
          <span class="MatchingUs">
            <img @click="goToMainPage"
              src="/image/logo.png"
              class="img"
              alt="매칭어스 로고"
            />
          </span>
        </div>
        <div class="navbar_right">
          <div class="navbar_welcome">
            <!-- 사용자 이름과 환영 메시지 -->
            <div class="welcome">환영합니다, <strong class="name">{{ user.name }}</strong>님! <i class="fa-regular fa-face-smile"></i></div>
          </div>
          <!-- 로그아웃 버튼 -->
          <button @click="goToLoginPage" class="btn btn-outline-success" style="color: #9370DB; text-decoration: none;">
            <i class="fa-solid fa-right-from-bracket"></i> LOG OUT!
          </button>
        </div>
      </div>
    </nav>

    <!-- 사이드 메뉴 바 -->
    <!-- 좌측 고정 사이드 메뉴 바 -->
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
            <button @click="goToMatchingApplyDetailPage"><p style="text-decoration: none; color: white;">매칭 현황</p></button>
          </li>
          <li>
                    <!-- 공지사항 페이지로 이동 -->
                    <button @click="goToNoticePage"><p style="text-decoration: none; color: white;">공지사항</p></button>
                </li>
        </ul>
      </div>
    </nav>

    <div class="content">
            <!-- 매칭을 신청한 사람들이 올려놓은 글들이 포스트잇의 형태로 들어가는 내용 -->

            
            <section id="postItsContainer">
            <div v-for="post in posts" :key="post.postID" @click="goToMatchingBoardDetailPage(post.postID)" class="post-it" :class="{ male: post.gender === 'male', female: post.gender === 'female' }">
              <h3>{{ post.matchingTitle.length > 20 ? post.matchingTitle.slice(0, 20) + '...' : post.matchingTitle }}</h3>
                <p>{{ post.matchingType }}</p>
                <p>{{ post.department }}</p>
                
                
            </div>
                 
            </section>
            <!-- 포스트잇추가 -->
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
        posts: []
    };
},
created() {
    console.log("Attempting to fetch posts...");
    this.fetchPosts();
},
computed: {
    user() {
      return JSON.parse(localStorage.getItem('user')) || {};
    }
  },  
  methods: {
     fetchPosts() {
      console.log("fetchPosts method called");
        axios.get('http://localhost:3001/api/getPostsForMatchingType12')
            .then(response => {
              console.log("API Response:", response.data);  
                this.posts = response.data;
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
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
    goToMatchingApplyDetailPage() {
      this.$router.push("/MatchingApplyDetailPage");
    },

    // 로그인 페이지로 이동
    goToLoginPage() {
      this.$router.push("/");
    },

    goToMainPage() {
      this.$router.push("/MainPage");
    },

    goToNoticePage() {
      this.$router.push("/NoticePage");
    },
    goToMatchingBoardDetailPage(postID) {
      this.$router.push({ name: 'MatchingBoardDetailPage', params: { postID: postID } });
}
  

}
};
</script>
<style scoped> 
.bar {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center;
}

.board-list-wrapper {
  display: flex;
  justify-content: flex-start; /* 변경: 왼쪽으로 정렬 */
  align-items: center;
  height: 100vh;
  background-color: white;
  font-family: 'jua', sans-serif;
}

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

.board-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 100px;
}

.board-list li {
    background-color: white;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    height: 400px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 0 0 calc(50% - 20px);
}

.board-list .btn {
    margin-top: auto;
    background-color: #F6E6F6;
    color: #9370DB; /* 버튼 텍스트 색상 흰색으로 설정 */
    border-color: #F6E6F6;
    width: 100%;
}

.board-list .btn:hover {
    transform: scale(1.05); 
}


.container02 button.active {
  background-color: #9370db;
  color: white;
}

.post-it {
    width: 300px;
    height: 250px;
    box-shadow: 4px 4px 10px #aaa;
    font-size: 25px;
}

.post-it:hover {
    transform: scale(1.08); /* Slightly enlarge the post-it on hover */
}

.post-it.male {
    background-color: #deeeff; /* Blue color for male */
    font-family: 'gangwon', sans-serif;
}

.post-it.female {
    background-color: #ffe4ee; /* Pink color for female */
    font-family: 'gangwon', sans-serif;
}

#postItsContainer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-items: center;
  margin-right: 150px;
  margin-left: 350px; /* Original margin-left value */
  margin-top: 150px;
  transition: margin-left 0.3s; /* Add transition effect for smooth animation */
}

.container {
    display: flex;
    justify-content: center;
}

.board-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 100px;
}

.board-list li {
    background-color: white;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    height: 400px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 0 0 calc(50% - 20px);
}

.board-list .btn {
    margin-top: auto;
    background-color: #F6E6F6;
    color: #9370DB; /* 버튼 텍스트 색상 흰색으로 설정 */
    border-color: #F6E6F6;
    width: 100%;
}

.board-list .btn:hover {
    transform: scale(1.05); 
}


.content {
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  #postItsContainer {
    grid-template-columns: repeat(2, 1fr); /* 600px 이상 화면: 한 줄에 2개씩 */
  }
}

@font-face {
  font-family: 'gangwon';
  src:url(../../public/fonts/강원교육현옥샘.ttf)
}


@media screen and (max-width: 768px) {

#postItsContainer {
  display: grid;
grid-template-columns: repeat(1, 1fr);
gap: 20px;
justify-items: center;
margin-top: 150px;
transition: margin-left 0.3s; /* Add transition effect for smooth animation */
}
}


@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";
</style>