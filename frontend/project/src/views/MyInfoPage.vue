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

    <div class="content-container" style="margin-right: 150px; margin-left: 350px;">
      <div class="content">
        <form ref="myForm">
          <label for="studentID">학번 (ID)</label>
          <input type="text" id="studentID" required disabled v-model="userInfo.studentID">
          <br>

          
          <label for="name">이름</label>
          <input type="text" id="name" required disabled v-model="userInfo.name">
          <br>

    <div class="form-group">
      <label for="gender" class="radio-container">남자
        <input type="radio" id="gender-male" name="gender" value="male" v-model="userInfo.gender">
      </label>
      <label for="gender" class="radio-container">여자
        <input type="radio" id="gender-female" name="gender" value="female" v-model="userInfo.gender">
      </label>
    </div>

          <label for="residence">거주지</label>
          <select id="residence" v-model="userInfo.residence" :disabled="!editMode">
        <option value="중구">중구</option>
        <option value="서구">서구</option>
        <option value="동구">동구</option>
        <option value="영도구">영도구</option>
        <option value="부산진구">부산진구</option>
        <option value="동래구">동래구</option>
        <option value="남구">남구</option>
        <option value="북구">북구</option>
        <option value="해운대구">해운대구</option>
        <option value="사하구">사하구</option>
        <option value="금정구">금정구</option>
        <option value="강서구">강서구</option>
        <option value="연제구">연제구</option>
        <option value="수영구">수영구</option>
        <option value="사상구">사상구</option>
        <option value="기장군">기장군</option>
        <option value="그외">그외</option>
          </select>
          <br>

<label for="age" required>출생연도</label>
<select id="age" v-model="userInfo.birthYear" disabled>
  <option value="2004">2004년생</option>
  <option value="2003">2003년생</option>
  <option value="2002">2002년생</option>
  <option value="2001">2001년생</option>
  <option value="2000">2000년생</option>
  <option value="1999">1999년생</option>
  <option value="1998">1998년생</option>
  <option value="1997">1997년생</option>
  <option value="1996">1996년생</option>
  <option value="1995">1995년생</option>
</select>
<br>

<label for="college">단과대학</label>
<select id="college" v-model="userInfo.college" @change="updateDepartments" :disabled="!editMode">
        <option value="공과대학">공과대학</option>
        <option value="인문사회과학대학">인문사회과학대학</option>
        <option value="자연과학대학">자연과학대학</option>
        <option value="경영대학">경영대학</option>
        <option value="수산과학대학">수산과학대학</option>
        <option value="환경해양대학">환경해양대학</option>
        <option value="정보융합대학">정보융합대학</option>
        <option value="미래융합대학">미래융합대학</option>
        <option value="글로벌자율전공학부">글로벌자율전공학부</option>
</select>
<br />

<!-- 소속학부 select element -->
<label for="department">소속학부</label>
<select id="department" v-model="userInfo.department" :disabled="!editMode || !selectedCollege">
  <option v-for="dept in departments" :value="dept" :key="dept">{{ dept }}</option>
</select>
<br>

          <label for="email">이메일:</label>
          <input type="email" id="email" v-model="userInfo.email" required pattern=".+@pknu\.ac\.kr" title="부경대학교 이메일로 입력해주세요 (예: example@pknu.ac.kr)" :disabled="!editMode">
          <br>

          <!-- 수정 버튼을 클릭했을 때 취소 버튼도 함께 보여지도록 템플릿을 수정합니다. -->
          <button v-if="!editMode" type="button" class="edit-btn" @click="enableEditMode">
            수정
          </button>


          <!-- 수정 모드일 때는 저장과 취소 버튼을 보여줍니다. -->
          <div v-if="editMode">
            <button type="button" class="edit-btn" @click="updateUserInformation">
              저장
            </button>
            <button type="button" class="edit-btn" @click="cancelChanges">
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
data() {
  return {
    editMode: false,
    userInfo: [],
    originalFormData: {},
    selectedCollege: '', // 단과대 선택을 저장하는 속성 추가
    departments: [], // 선택한 단과대에 해당하는 학과들을 저장하는 배열
  };
},
computed: {
    user() {
      return JSON.parse(localStorage.getItem('user')) || {};
    }
  },  
  methods: {
    fetchUserInfo() {
      console.log("fetchUserInfo method called");
        axios.get('http://localhost:3001/api/userInfo', { params: { userID: this.user.studentID } })
            .then(response => {
              console.log("API Response:", response.data);  
                this.userInfo = response.data;
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            });
    },

      // Update user information
    updateUserInformation() {
      const updatedInfo = {
        studentID: this.userInfo.studentID,
        userInfo: {
          name: this.userInfo.name,
          gender: this.userInfo.gender,
          residence: this.userInfo.residence,
          birthYear: this.userInfo.birthYear,
          college: this.userInfo.college,
          department: this.userInfo.department,
          email: this.userInfo.email
        }
      };

    axios.put('http://localhost:3001/api/updateUserInfo', updatedInfo)
      .then(response => {
        console.log('User info updated:', response.data.message);
        // Optionally, you can refresh the user info after updating
        this.fetchUserInfo();
      })
      .catch(error => {
        console.error('Error updating user info:', error);
        // Handle error and show error message to the user
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
    // 수정 모드를 활성화하고 폼 필드를 편집 가능하도록 만드는 메소드입니다.
    enableEditMode() {
      this.editMode = true;
      this.enableFormFields();
    },

    enableFormFields() {
  const formFields = this.$refs.myForm.elements;
  for (let i = 0; i < formFields.length; i++) {
    // 학번, 이름 필드는 수정 불가능하도록 설정
    if (
      formFields[i].id !== 'studentID' &&
      formFields[i].id !== 'name' &&
      formFields[i].id !== 'age'
    ) {
      // 성별 라디오 버튼은 언제나 비활성화 상태로 유지
      if (formFields[i].type === 'radio' && (formFields[i].name === 'gender')) {
        formFields[i].disabled = true;
      } else {
        formFields[i].disabled = !this.editMode;
      }
    }
  }
},


saveOriginalFormData() {
  const formFields = this.$refs.myForm.elements;
  for (let i = 0; i < formFields.length; i++) {
    // 학번, 이름, 성별, 출생연도 필드는 저장하지 않음
    if (
      formFields[i].id !== 'studentID' &&
      formFields[i].id !== 'name' &&
      formFields[i].type !== 'radio' &&
      formFields[i].id !== 'age'
    ) {
      this.originalFormData[formFields[i].id] = formFields[i].value;
    }
  }
},

    // 폼 필드 값을 원본 폼 데이터로 복원하는 메소드입니다.
    restoreOriginalFormData() {
      const formFields = this.$refs.myForm.elements;
      for (let i = 0; i < formFields.length; i++) {
        // 학번, 이름, 성별 필드는 복원하지 않음
        if (formFields[i].id !== 'studentID' && formFields[i].id !== 'name' && formFields[i].type !== 'radio') {
          formFields[i].value = this.originalFormData[formFields[i].id];
        }
      }
    },

    // 변경 사항을 저장하고 수정 모드를 비활성화하는 메소드입니다.
    saveChanges() {
      this.editMode = false;
      this.disableFormFields();
      // 이곳에 서버로 변경 사항을 저장하는 로직이나 다른 작업을 추가할 수 있습니다.
    },

    // 변경 사항을 취소하고 수정 모드를 비활성화하는 메소드입니다.
    cancelChanges() {
      this.editMode = false;
      this.disableFormFields();
      this.restoreOriginalFormData(); // 변경 사항을 취소하면 원본 폼 데이터로 복원합니다.
    },


    // 폼 필드를 편집 불가능하도록 비활성화하는 메소드입니다.
    disableFormFields() {
      const formFields = this.$refs.myForm.elements;
      for (let i = 0; i < formFields.length; i++) {
        // 학번, 이름, 성별 필드는 수정 불가능하도록 설정
        if (formFields[i].id !== 'studentID' && formFields[i].id !== 'name' && formFields[i].type !== 'radio') {
          formFields[i].disabled = true;
        }
      }
    },
      // 사용자가 단과대를 선택했을 때 학과들을 업데이트하는 메소드
  updateDepartments() {
    // 선택한 단과대에 해당하는 학과들을 가져오는 로직을 구현합니다.
    // 예를 들어:
    switch (this.selectedCollege) {
      case '공과대학':
        this.departments = ["전기공학부",
        "전기공학전공",
        "제어계측공학전공",
        "디스플레이반도체공학전공",
        "기계공학부",
        "기계공학전공",
        "기계설계공학전공",
        "에너지수송시스템공학부",
        "냉동공조공학전공",
        "기계시스템공학전공",
        "조선해양시스템공학전공",
        "화학공학과",
        "공업화학고분자공학부",
        "공업화학전공",
        "고분자공학전공",
        "나노융합공학과",
        "시스템경영안전공학부",
        "산업경영공학전공",
        "기술데이터공학전공",
        "안전공학전공",
        "소방공학과",
        "융합소재공학부",
        "금속공학전공",
        "재료공학전공",
        "신소재시스템공학전공",
        "건축공학과",
        "지속가능공학부",
        "토목공학전공",
        "생태공학전공",]; // 실제 '공과대학'에 속하는 학과들로 대체
        break;

      case '인문사회과학대학':
        this.departments = ["국어국문학과",
          "영어영문학부",
          "일어일문학부",
          "사학과",
          "경제학과",
          "법학과",
          "행정복지학부",
          "국제지역학부",
          "중국학과",
          "정치외교학과",
          "유아교육과",
          "패션디자인학과",
          "사회계열"]; // 실제 '인문사회과학대학'에 속하는 학과들로 대체
        break;

        case '자연과학대학':
        this.departments = ["응용수학과",
          "물리학과",
          "화학과",
          "미생물학과",
          "간호학과",
          "과학컴퓨팅학과"]; // 실제 '인문사회과학대학'에 속하는 학과들로 대체
        break;

        case '경영대학':
        this.departments = ["경영학부", "국제통상학부"]; // 실제 '인문사회과학대학'에 속하는 학과들로 대체
        break;

        case '수산과학대학':
        this.departments = ["식품과학부",
          "식품공학전공",
          "식품영양학전공",
          "생물공학과",
          "해양생산시스템관리학부",
          "수산생명과학부",
          "양식응용생명과학전공",
          "자원생물학전공",
          "수산생명의학과",
          "수해양산업교육과",
          "해양수산경영경제학부",
          "해양수산경영학전공",
          "자원환경경제학전공"]; 
        break;

        case '환경해양대학':
        this.departments = ["지구환경시스템과학부",
          "환경공학전공",
          "해양학전공",
          "환경지질과학전공",
          "환경대기과학전공",
          "공간정보시스템공학전공",
          "해양공학과",
          "에너지자원공학과"]; 
        break;

        case '정보융합대학':
        this.departments = ["데이터정보과학부",
          "빅데이터융합전공",
          "통계데이터사이언스전공",
          "미디어커뮤니케이션학부",
          "언론정보전공",
          "휴먼ICT융합전공",
          "스마트헬스케어학부",
          "의공학전공",
          "해양스포츠전공",
          "휴먼바이오융합전공",
          "전자정보통신공학부",
          "전자공학전공",
          "정보통신공학전공",
          "조형학부",
          "건축학전공",
          "공업디자인전공",
          "시각디자인전공"]; 
        break;

        case '미래융합대학':
        this.departments = ["융합인재개발학부",
          "평생교육상담학전공",
          "경찰범죄심리학전공",
          "융합공학부",
          "기계조선에너지시스템공학전공",
          "전기전자소프트웨어공학전공"]; 
        break;

          case '글로벌자율전공학부':
            this.departments = ["글로벌자율전공학부"];
            break;


      
      // 다른 단과대에 대한 학과들도 필요에 따라 추가합니다.
      default:
        this.departments = [];
        break;
    }
  },
},
created() {
    // 컴포넌트가 생성될 때 사용자 정보를 불러오도록 설정
    this.fetchUserInfo();
  },
};


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
}

.btn.btn-outline-success {
    /* color: #9370DB; */
    border-color: #9370DB; 
    font-weight: 500;
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
  font-family: 'jua', sans-serif;
}


.menuBar {
  top: 95px; /* Adjust this value according to your fixed navbar height */
}

.content-container {
  display: flex;
  justify-content: center; /* 수평으로 가운데 정렬 */
  align-items: flex-start;
  margin-top: 100px;
}

.content {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  width: 500px;
}

.content h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #9370DB;
  font-size: 24px;
  font-family: 'jua', sans-serif;
}

/* 폼 요소 스타일 */
form input[type="text"],
form input[type="email"],
form select {
  width: 100%;
  padding: 12px;
  border: 1px solid #DDD;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 15px;
  transition: border-color 0.3s;
}

form input[type="text"]:focus,
form input[type="email"]:focus,
form select:focus {
  border-color: #9370DB; /* 포커스 시 밝은 보라색 테두리 */
}

form label {
  display: block;
  margin-bottom: 5px;
  color: #9370DB;
  font-weight: bold;
  font-family: 'jua', sans-serif;
}

form button {
  display: inline-block;
  padding: 10px 20px;
  color: #FFF;
  background-color: #9370DB;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

form button.edit-btn {
  background-color: #F6E6F6;
  color: #9370DB;
  border: 1px solid #9370DB;
}

form button.save-btn {
  background-color: #f4fff5;
  color: #4CAF50;
  border: 1px solid #4CAF50;
}

form button.cancel-btn {
  background-color:#fcf6f5;
  color: #f44336;
  border: 1px solid #f44336;
}

form .form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px; /* 라디오 버튼 사이의 간격을 늘립니다 */
}

form .form-group label {
  margin-right: 10px;
}

form .form-group input[type="radio"] {
  margin-right: 5px; /* 라디오 버튼 사이의 간격을 늘립니다 */
}

@font-face {
  font-family: 'jua';
  src:url(../../public/fonts/font.ttf)
}

</style>




