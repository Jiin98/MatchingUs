<template>
  <div>
    <!-- 네비게이션 바 -->
    <nav class="navbar bg-body-tertiary fixed-top">
        <div class="container-fluid">
            <div class="navbar_logo">
                <span class="MatchingUs">
                    <img
                    src="/image/logo.png"
                    class="img"
                    alt="매칭어스 로고"
                />
                </span>
            </div>
            <div class="navbar_right">
                <div class="navbar_welcome">
                    <div class="welcome">환영합니다, <strong class="name">{{ user.name }}</strong>님! <i class="fa-regular fa-face-smile"></i></div>
                </div>
                <!-- 로그아웃 버튼을 form 태그 밖으로 이동 -->
                <button @click="goToLoginPage" class="btn btn-outline-success" style="color: #9370DB; text-decoration: none;">
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
                    <!-- 내 정보 페이지로 이동 -->
                    <button @click="goToMyInfoPage"><p style="text-decoration: none; color: white;">내 정보</p></button>
                </li>
                <li>
                    <!-- 매칭 신청 페이지로 이동 -->
                    <button @click="goToMatchingApplyPage"><p style="text-decoration: none; color: white;">매칭 신청</p></button>
                </li>
                <li>
                    <!-- 매칭 현황 페이지로 이동 -->
                    <button @click="goToMatchingApplyDetailPage"><p style="text-decoration: none; color: white;">매칭 현황</p></button>
                </li>
                <li>
                    <!-- 공지사항 페이지로 이동 -->
                    <button @click="goToNoticePage"><p style="text-decoration: none; color: white;">공지사항</p></button>
                </li>
            </ul>
        </div>
    </nav>

   <!-- 게시판 카드 -->
   <div class="container">
      <ul class="board-list" style="margin-right: 150px; margin-left: 350px;">
        <li>
          <img
            src="/image/love.png"
            class="card-img-top"
            alt="사랑그림"
          />
          <div class="card-body">
            <h5 class="card-title"><strong>1~2인 매칭 게시판</strong></h5>
            <p class="card-text">소규모 만남을 원하시는 분들을 위한 게시판입니다. 소개팅을 원하시면 추천!</p>
            <!-- 매칭 보드 페이지로 이동 -->
            <a @click="goToMatchingBoardPage" class="btn btn-lavender"><strong>VIEW NOW!</strong></a>
          </div>
        </li>
        <li>
          <img
            src="/image/love2.png"
            class="card-img-top"
            alt="사랑그림"
          />
          <div class="card-body">
            <h5 class="card-title"><strong>3인 이상 매칭 게시판</strong></h5>
            <p class="card-text">대규모 만남을 원하시는 분들을 위한 게시판입니다. 과팅/미팅을 즐기고 싶으면 추천!</p>
            <!-- 매칭 보드 페이지로 이동 -->
            <a @click="goToMatchingBoardPage02" class="btn btn-lavender"><strong>VIEW NOW!</strong></a>
          </div>
        </li>
      </ul>
    </div>
    <!-- 매칭 현황 -->
    <div class="match-status">
      <!-- 매칭 현황의 내용이 동적으로 표시될 영역 -->
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return JSON.parse(localStorage.getItem('user')) || {};
    }
  },  
  methods: {
    goToMyInfoPage() {
      this.$router.push("/MyInfoPage");
    },

    goToMatchingApplyPage() {
      this.$router.push("/MatchingApplyPage");
    },

    goToMatchingApplyDetailPage() {
      this.$router.push("/MatchingApplyDetailPage");
    },
    

    goToLoginPage() {
      this.$router.push("/");
    },
    
    goToMatchingBoardPage() {
      this.$router.push("/MatchingBoardPage");
    },
    goToMatchingBoardPage02() {
      this.$router.push("/MatchingBoardPage02");
    },

    goToNoticePage() {
      this.$router.push("/NoticePage");
    },
  }
}
</script>

<style scoped>

/* Add these styles to center-align the cards */
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


/* 매칭 카드 스타일 */
.board-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px; /* Add some gap between cards */
  margin-top: 200px;
}

.board-list li {
  background-color: #F6E6F6; /* Set a light background color */
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}
.board-list .btn {
    margin-top: auto;
    background-color: #F6E6F6;
    color: #9370DB; /* 버튼 텍스트 색상 흰색으로 설정 */
    border-color: #F6E6F6;
    width: 100%;
    font-family: 'jua', sans-serif;
}

.board-list .btn:hover {
    transform: scale(1.05); 
    font-family: 'jua', sans-serif;
}

@font-face {
  font-family: 'jua';
  src:url(../../public/fonts/font.ttf)
}

@media screen and (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  .board-list {
    flex-direction: column;
    gap: 20px;
    margin-top: 100px;
  }

  .board-list li {
    width: 100%;
    text-align: center;
  }
}
</style>
