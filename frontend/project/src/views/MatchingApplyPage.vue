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

    <!-- 매칭 현황 -->
    <div class="match-status">
      <!-- 매칭 현황의 내용이 동적으로 표시될 영역 -->
    </div>
  </div>


  <div class="content-container">
      <div class="content matching-form">
        <form ref="myForm">
          <div class="form-group">
            <div class="radio-container">
              <!-- 문제점 1: 1-2인 매칭, 3인 이상 텍스트 스타일 변경 -->
              <label class="radio-label">
                <input type="radio" id="matching-type-1" name="matchingType" value="1-2인 매칭" v-model="matchingType">
                <span class="bold-purple">1-2인 매칭</span>
              </label>
              <label class="radio-label">
                <input type="radio" id="matching-type-2" name="matchingType" value="3인 이상 매칭" v-model="matchingType">
                <span class="bold-purple">3인 이상 매칭</span>
              </label>
            </div>
          </div>

          <div class="form-group">
    <!-- 매칭 제목 -->
    <label for="matchingTitle" class="bold-purple">매칭 제목</label>
    <input
      type="text"
      id="matchingTitle"
      v-model="matchingTitle"
      @input="checkMatchingTitleLength"
      :maxlength="maxMatchingTitleLength" 
      required
      :disabled="!editMode"
    />
    <p class="text-muted">{{ matchingTitle.length }} / {{ maxMatchingTitleLength }}</p> <!-- 글자수 표시 -->
  </div>

  <div class="form-group">
    <!-- 매칭 내용 -->
    <label for="matchingContent" class="matching-label">매칭 내용</label>
    <textarea
      id="matchingContent"
      rows="8"
      v-model="matchingContent"
      @input="checkMatchingContentLength"
      :maxlength="maxMatchingContentLength" 
      required
      :disabled="!editMode"
    ></textarea>
    <p class="text-muted">{{ matchingContent.length }} / {{ maxMatchingContentLength }}</p> <!-- 글자수 표시 -->
  </div>
          <div class="btn-container">
            <button type="button" class="apply-btn" @click="applyMatching">
              신청
            </button>
            <button type="button" class="cancel-btn" @click="cancelMatching">
              취소
            </button>
          </div>

        </form>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      editMode: true,
      matchingType: '',
      matchingTitle: '',
      matchingContent: '',
      resultMessage: '', // To display the result message
      resultMessageColor: '', 
      maxMatchingTitleLength: 50, // 최대 제목 길이
    maxMatchingContentLength: 500, // 최대 내용 길이
    };
},
computed: {
    user() {
      return JSON.parse(localStorage.getItem('user')) || {};
    }
  },  
  methods: {
    checkMatchingTitleLength() {
      if (this.matchingTitle.length > this.maxMatchingTitleLength) {
        this.matchingTitle = this.matchingTitle.slice(0, this.maxMatchingTitleLength);
        this.$refs.myForm.querySelector("#matchingTitle").classList.add("input-error");
        this.resultMessage = '매칭 제목은 최대 ' + this.maxMatchingTitleLength + '자까지 입력 가능합니다.';
        this.resultMessageColor = 'red';
      } else {
        this.$refs.myForm.querySelector("#matchingTitle").classList.remove("input-error");
        this.resultMessage = ''; // 글자 수가 제한 이내일 때 메시지를 지웁니다.
      }
    },

    checkMatchingContentLength() {
      if (this.matchingContent.length > this.maxMatchingContentLength) {
        this.matchingContent = this.matchingContent.slice(0, this.maxMatchingContentLength);
        this.$refs.myForm.querySelector("#matchingContent").classList.add("input-error");
        this.resultMessage = '매칭 내용은 최대 ' + this.maxMatchingContentLength + '자까지 입력 가능합니다.';
        this.resultMessageColor = 'red';
      } else {
        this.$refs.myForm.querySelector("#matchingContent").classList.remove("input-error");
        this.resultMessage = ''; // 글자 수가 제한 이내일 때 메시지를 지웁니다.
      }
    },
    async applyMatching() {
      // 모든 필드가 채워져 있는지 확인
      if (
          this.matchingType !== '' &&
          this.matchingTitle.trim() !== '' &&
          this.matchingContent.trim() !== ''
      ) {
          
const user = JSON.parse(localStorage.getItem('user'));
const userID = user ? user.id : null;

const postData = {
              matchingType: this.matchingType,
              matchingTitle: this.matchingTitle,
              matchingContent: this.matchingContent,
              userID: userID  // You might also need to send the userID
          };

          // Send the post data to the server
          try {
            const response = await fetch("http://localhost:3001/api/addPost", {
              method: 'POST',
              headers: { 
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(postData)
          });
          
          if (response.ok) {
            const data = await response.json();
            alert(data.message);
            this.$refs.myForm.reset();
            this.$router.go(0);
            } else {
              const errorData = await response.json();
              alert(errorData.error);
              this.resultMessage = '매칭 신청에 실패했습니다.';
              this.resultMessageColor = 'red';
              this.$router.go(0);
              }
          } catch (error){
            console.error("오류", error);
          }
        }
    },

    cancelMatching() {
      // 폼 필드를 지우고 결과 메시지 초기화
      this.matchingType = '';
      this.matchingTitle = '';
      this.matchingContent = '';
      this.resultMessage = '';
      this.resultMessageColor = ''; // 색상 재설정
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
  }
};

</script>

<style scoped>
body {
    margin: 0;
    background-color: white;
    font-family: 'jua', sans-serif;
}

#matchingContent {
  font-family: 'jua', sans-serif;
}
.MatchingUs {
    font-size: 28px;
    color: #9370DB;
    font-family: 'jua', sans-serif;
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
}

.navbar_right .btn {
    margin-left: auto;
    background-color: #F6E6F6; /* Set the background color to match the navbar background color */
/* Set the border color to match the text color */
}

.navbar_right .btn a {
/* Set the text color of the button */
    text-decoration: none;
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
}


.menuBar {
  top: 95px; /* Adjust this value according to your fixed navbar height */
}

.container {
  display: flex;
  justify-content: center;
}

.content {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  width: 500px;
  margin-left:350px;
  margin-right: 150px;
}

.section-title {
  color: #9370DB;
  margin-bottom: 20px;
  font-size: 24px;
  font-family: 'jua', sans-serif;
}

.bold-purple {
  /* 문제점 1: 보라색 굵은 글씨 스타일 */
  color: #9370db;
  font-weight: bold;
  font-family: 'jua', sans-serif;
}

.matching-form {
  width: 100%;
  max-width: 600px;
  margin: 3px auto; /* 폼을 더 아래로 내림 */
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 20px;
}

.radio-container {
  display: flex;
  align-items: center;
}

.radio-label {
  margin-right: 20px;
}

.matching-label {
  /* 문제점 2: 매칭 내용 레이블 위치 조정 */
  float: left;
  margin-right: 10px;
  color: #9370db;
  font-weight: bold;
  font-family: 'jua', sans-serif;
}


.btn-container {
  /* 수정된 스타일 */
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  align-items: center;
  margin-top: 20px;
}

.apply-btn,
.cancel-btn {
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


.result-message {
  margin-top: 10px;
  color: #008000; /* Green color for successful message */
  font-weight: bold;
  font-family: 'jua', sans-serif;
}

.content-container {
  display: flex;
  justify-content: center; /* 수평으로 가운데 정렬 */
  margin-left: 350px;
  margin-right: 150px;
  align-items: flex-start;
  margin-top: 100px;
}

textarea {
  /* 문제점 3: 텍스트 박스 크기 조정 */
  width: 100%;
  resize: vertical;
  border-radius: 10px;
  border: 1px solid #DDD;
}

#matchingTitle {
  width: 100%;
  padding: 12px;
  border: 1px solid #DDD;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 15px;
  transition: border-color 0.3s;
  font-family: 'jua', sans-serif;
}

input[type="text"],
textarea {
  /* 문제점 3: 텍스트 박스 크기 조정 */
  width: 100%;
  resize: vertical;
  margin-top: 5px; /* 추가된 코드: 텍스트박스 위 여백 */
}


.input-error {
  color: red;
}

@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";

@font-face {
  font-family: 'jua';
  src:url(../../public/fonts/font.ttf)
}

</style>