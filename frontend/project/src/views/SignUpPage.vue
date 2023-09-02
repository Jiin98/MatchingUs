<template>
  <div class="container">
    <span class="MatchingUs">
                    <img @click="goToLoginPage"
                    src="/image/logo.png"
                    class="img"
                    alt="매칭어스 로고"
                />
                </span>
                <div class="question">
  질의사항은 인스타그램 @matching_us_pknu 또는 <br>
  카카오톡 오픈채팅방 https://open.kakao.com/o/siamhTCf 로 문의주시기 바랍니다. <br> <br>
  <strong> 그리고 서비스 이용 전, 메인페이지의 사이드 바에 있는 공지사항을 꼭 읽어주세요.</strong> <br>
  <input type="checkbox" id="agreeCheckbox" v-model="agreed">  개인정보 수집에 동의하십니까?
  <label for="agreeCheckbox" style="color:red; font-size:14px">(동의하지 않으시면 서비스의 이용이 제한됩니다.)</label><br> <br>
</div>


    <form @submit="onSubmit">
      <div class="student-id-container">
       <label for="studentID">학번 (ID)</label>
      <input class="input" type="text" id="studentID" required v-model="studentID" @input="validateStudentID" style="margin-left: 18px">
      <button class="check-button" type="button" style="margin-left: 8px" @click="checkDuplicate">중복 </button> <!--중복일 시, 409conflict 충돌이 발생하여 alert를 띄우는 게 안되는 문제를 해결할 필요가 있음. 중복 아닌 학번에 한해서는 정상 작동함-->
      </div>
     
      <br>

      <label for="password">비밀번호</label>
      <input class="input" type="password" id="password" required v-model="password" style="margin-left: 18px" >
      <br>

      <label for="passwordVerify">비밀번호 확인</label>
      <input type="password" id="passwordVerify" v-model="passwordVerify" required @input="validatePassword" style="margin-left: 18px">
      <br>
      <div class="student-id-container">
      <label for="name">이름</label>
      <input class="input" type="text" id="name" v-model="name" required style="margin-left: 18px " >
      <br>
</div>

<div class="gender-group">
  <label for="male" class="gender-label">남자</label>
  <input type="radio" id="male" name="gender" v-model="selectedGender" value="male">
</div>
<div class="gender-group">
  <label for="female" class="gender-label">여자</label>
  <input type="radio" id="female" name="gender" v-model="selectedGender" value="female">
</div>


      <br> 

      <label for="residence">부산광역시 거주지 (학기중 거주지)</label>
      <select id="residence" v-model="selectedResidence" style="margin-left: 18px">
        <!-- 부산광역시 구들을 옵션으로 추가 -->
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

      <label for="age">출생연도</label>
      <select id="age" v-model="selectedBirthYear" style="margin-left: 18px">
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
      <select id="college" v-model="selectedCollege" @change="updateDepartments" style="margin-left: 18px">
        <!-- 단과대학 옵션들을 추가 -->
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
      <br>

      <label for="department">소속학부</label>
      <select id="department" v-model="selectedDepartment" style="margin-left: 18px">
        <!-- 초기에는 공과대학에 해당되는 소속학과만 보이도록 설정 -->
        <option v-for="department in departments" :key="department" :value="department">{{ department }}</option>
      </select>
      <br>

      <label for="email">학교 이메일</label>
      <input class="input" type="email" id="email" name="email" style="margin-left: 18px" v-model="email" required pattern=".+@pukyong|pknu\.ac\.kr" title="부경대학교 이메일로 입력해주세요 (예: example@pknu.ac.kr 또는example+@pukyong.ac.kr)">
      <br>

      <input @click="validateForm" :disabled="!agreed" type="submit" value="회원가입">
    </form>

    <a @click="goToLoginPage" class="go-back">로그인 페이지로 돌아가기</a> <!-- 로그인 페이지로 돌아가는 링크 추가 -->
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      agreed: false,
      studentID: "",
      password: "",
      passwordVerify: "",
      name: "",
      selectedGender: "",
      selectedResidence: "",
      selectedBirthYear: "",
      selectedCollege: "공과대학",
      selectedDepartment: "",
      departments: [
        // 초기에는 "공과대학"에 해당하는 소속학부들만 보이도록 설정
        "전기공학부",
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
        "생태공학전공",
      ],
      email: "",
    };
  },
  computed: {
    isFormValid() {
      return (
        this.agreed &&
        this.studentID !== "" &&
        this.password.length >= 8 &&
        this.password === this.passwordVerify &&
        this.name !== "" &&
        this.selectedGender !== "" &&
        this.selectedResidence !== "" &&
        this.selectedBirthYear !== "" &&
        this.selectedCollege !== "" &&
        this.selectedDepartment !== "" &&
        this.email !== ""
      );
    },
  },
  methods: {
    checkDuplicate() {
      axios.get(`http://localhost:3001/api/checkDuplicateStudentID/${this.studentID}`)
        .then(response => {
          if (response.data.duplicate) {
            // 중복인 경우 처리 로직 작성
            alert("이미 사용 중인 학번입니다.");
          } else {
            // 중복이 아닌 경우 처리 로직 작성
            alert("가입 가능한 학번입니다.");
          }
        })
        .catch(error => {
          alert('이미 사용 중인 학번입니다.', error);
        });
    },
    onAgreeCheckboxChange() {
      // 동의 체크박스 상태가 변할 때마다 동의 변수를 업데이트
      this.agreed = !this.agreed;
    },

    goToMainPage() {
      this.$router.push("/MainPage");
    },
    goToLoginPage() {
      this.$router.push("/");
    },
  validateForm() {

    if (this.password !== this.passwordVerify) {
    alert("비밀번호와 비밀번호 확인란이 서로 일치하지 않습니다.");
    return;
  }
    const emailPattern = /.+@(pukyong\.ac\.kr|pknu\.ac\.kr)/;
  if (!emailPattern.test(this.email)) {
    alert("부경대학교 이메일로 입력해주세요 (예: example@pknu.ac.kr 또는 example@pukyong.ac.kr)");
    return;
  }

    if (this.password.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    
    if (!this.agreed) {
      alert("개인정보 이용에 동의해야만 회원가입이 가능합니다.");
      return;
    }

    if (!this.isFormValid) {
        alert("모든 필수 입력사항을 입력해주세요.");
        return;
      }

    this.registerUser();
  },

    async registerUser() {
  // 백엔드로 전달할 사용자 정보를 객체로 만듭니다.
  const userData = {
    studentID: this.studentID,
    password: this.password,
    name: this.name,
    gender: this.selectedGender,
    residence: this.selectedResidence,
    birthYear: this.selectedBirthYear,
    college: this.selectedCollege,
    department: this.selectedDepartment,
    email: this.email,
  };

  // 서버로 POST 요청을 보냅니다.
  try {
    const response = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      // 회원가입이 성공적으로 이루어진 경우
      const data = await response.json();
      alert(data.message); // 백엔드에서 전달한 메시지를 알림으로 표시합니다.

      this.$router.push({
        path: '/',
        // query: { name: this.name } // Pass the user's name as a query parameter
      });
    } else {
      // 회원가입이 실패한 경우
      const errorData = await response.json();
      alert(errorData.error); // 백엔드에서 전달한 에러 메시지를 알림으로 표시합니다.
    }
  } catch (error) {
    console.error("Error while registering the user:", error);
    alert("회원가입 중에 문제가 발생했습니다. 다시 시도해주세요.");
  }
},

    validateStudentID() {
      const onlyNumbers = this.studentID.replace(/\D/g, ""); // 문자열 입력시 입력차단

      // 10자리 넘게 입력 방지
      if (onlyNumbers.length > 9) {
        alert("학번은 9자리여야 합니다.");
        this.studentID = onlyNumbers.slice(0, 9);
        return;
      }

      // Ensure the student ID starts with the number 2
      if (!onlyNumbers.startsWith("2")) {
        // Display an error message for an invalid student ID prefix
        alert("가입 가능한 학번이 아닙니다.");
        this.studentID = ""; // 입력된 값 초기화
        return; // Stop further processing
      }

      // Update the studentID data to only contain numeric characters
      this.studentID = onlyNumbers;
    },

    onSubmit(event) {
      event.preventDefault(); // 폼의 기본 동작(새로고침)을 막습니다.

      // 비밀번호와 비밀번호 확인란의 값을 가져옵니다.
      const password = this.password;
      const passwordVerify = this.passwordVerify;

      // 두 값이 다른 경우, alert를 띄웁니다.
      if (password !== passwordVerify) {
        alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
      } else {
        // 두 값이 같은 경우, 회원가입 양식의 유효성 검사 메소드를 호출합니다.
        this.validateForm();
      }
    },


    updateDepartments() {
      // 선택된 단과대학에 따라 소속학부 옵션을 동적으로 업데이트하는 코드 추가
      this.departments = []; // 일단 빈 배열로 초기화 (실제로는 서버로부터 받아온 값으로 설정)

      if (this.selectedCollege === "공과대학") {
        this.departments.push(
          "전기공학부",
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
          "생태공학전공",
        );
      } else if (this.selectedCollege === "인문사회과학대학") {
        this.departments.push(
          "국어국문학과",
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
          "사회계열",
        );
      } else if (this.selectedCollege === "자연과학대학") {
        this.departments.push(
          "응용수학과",
          "물리학과",
          "화학과",
          "미생물학과",
          "간호학과",
          "과학컴퓨팅학과",
        );
      } else if (this.selectedCollege === "경영대학") {
        this.departments.push(
          "경영학부",
          "국제통상학부"
        );
      } else if (this.selectedCollege === "수산과학대학") {
        this.departments.push(
          "식품과학부",
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
          "자원환경경제학전공",
        );
      } else if (this.selectedCollege === "환경해양대학") {
        this.departments.push(
          "지구환경시스템과학부",
          "환경공학전공",
          "해양학전공",
          "환경지질과학전공",
          "환경대기과학전공",
          "공간정보시스템공학전공",
          "해양공학과",
          "에너지자원공학과",
        );
      } else if (this.selectedCollege === "정보융합대학") {
        this.departments.push(
          "데이터정보과학부",
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
          "시각디자인전공",
        );
      } else if (this.selectedCollege === "미래융합대학") {
        this.departments.push(
          "융합인재개발학부",
          "평생교육상담학전공",
          "경찰범죄심리학전공",
          "융합공학부",
          "기계조선에너지시스템공학전공",
          "전기전자소프트웨어공학전공",
        );
      } else if (this.selectedCollege === "글로벌자율전공학부") {
        this.departments.push(
          "글로벌자율전공학부"
        );
      }
    },
  },
};
</script>

<style scoped>

html, body {
  height: 100%;
  margin: 0;
  font-family: 'jua', sans-serif;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'jua', sans-serif;
}


.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  font-family: 'jua', sans-serif;
}

.form-wrapper {
  width: 100%;
}

.form-wrapper form {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'jua', sans-serif;
  width: 100%; /* 추가된 속성: 폼의 가로 폭을 100%로 설정 */
}

label {
  margin-bottom: 8px;
  font-weight: bold;
  font-family: 'jua', sans-serif;
}

input[type="text"],
input[type="password"],
input[type="email"],
select {
  margin-bottom: 10px; /* 수정된 속성: 간격을 조정 */
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  font-size: 16px;
  font-family: 'jua', sans-serif;
  width: 100%; /* 추가된 속성: 텍스트 필드의 가로 폭을 100%로 설정 */
}

.gender-group {
  display: flex;
  align-items: center;
}

.gender-label {
  margin-right: 10px; 
  font-family: 'jua', sans-serif;
}

input[type="radio"] {
  margin-left: 5px; /* 라벨과 라디오 버튼 사이의 간격 조정 */
  margin-bottom: 10px;
  font-family: 'jua', sans-serif;
}


input[type="submit"] {
  background-color: #F6E6F6;
  color: #9370DB;
  border: 1px solid #9370DB;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  
  font-family: 'jua', sans-serif;
}

.go-back {
  display: block;
  text-align: center;
  margin-top: 20px;
  text-decoration: none;
  color: gray;
  font-weight: bold;
  margin-top: 30px;
  font-family: 'jua', sans-serif;
}

.go-back:hover {
  text-decoration: underline;
  color: #333;
  font-family: 'jua', sans-serif;
}


.check-button {
  background-color: #F6E6F6;
  color: #9370DB;
  border: 1px solid #9370DB;
  padding: 10px 20px;
  border-radius: 5px;
  font-family: 'jua', sans-serif;
}

.action-group {
  display: flex;
  justify-content: space-between;
  font-family: 'jua', sans-serif;
}

.img {
  width: 500px;
}

form label {
  display: block;
  margin-bottom: 5px;
  color: #9370DB;
  font-weight: bold;
  font-family: 'jua', sans-serif;
}

@font-face {
  font-family: 'jua';
  src: url(../../public/fonts/font.ttf);
}

/* 부트스트랩과 FontAwesome 라이브러리 임포트 */
@import "~bootstrap/dist/css/bootstrap.min.css";
@import url("~@fortawesome/fontawesome-free/css/all.min.css");
</style>

