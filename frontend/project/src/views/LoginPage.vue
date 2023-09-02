<template>

<div class="LoginPageContainer">
    <form class="LoginPage" @submit.prevent="submitUser">
    <div class="logo-container">
      <img src="/image/logo.png" class="logo" alt="매칭어스 로고" />
    </div>
    <div class="int-area">
      <label for="id"></label>
      <input v-model="userId" type="text" name="id" id="id" placeholder="USER ID" />
      <label for="password"></label>
      <input v-model="password" type="password" name="pwd" id="pwd" placeholder="PASSWORD" required />
    </div>

    <div class="btn-area">
        <button @click="loginUser" type="submit" id="login-button" :disabled="!userId || !password">
          LOGIN
        </button>
      </div>

    <div class="caption">
      <a href="#" @click="goToSignUpPage">회원가입</a>
    </div>
  </form>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: 'LoginForm', 
  data() {
    return {
      userId: '',
      password: '',
    };
  },
  methods: {
    goToMainPage() {
      this.$router.push("/MainPage");
    },
    goToSignUpPage() {
      this.$router.push("/SignUpPage");
    },
    checkInputs() {
      if (!this.userId || !this.password) {
        alert('아이디와 비밀번호를 모두 입력해주세요.');
      }
    },
    async loginUser() {
      if (!this.userId || !this.password) {
        alert('아이디와 비밀번호를 모두 입력해주세요.');
        return;
      }

      try {
        const response = await axios.post("http://localhost:3001/api/login", {
          studentID: this.userId,
          password: this.password,
        });

        if (response.status === 200) {
          const { user, token } = response.data;
          alert("로그인에 성공하였습니다!"); 
          
          // 로그인에 성공하면 사용자 정보와 토큰을 로컬 스토리지에 저장합니다.
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);

          // 로그인에 성공하면 Main 페이지로 이동합니다.
          this.$router.push({
            path: '/MainPage',
          });
        } else {
          alert("학번 또는 비밀번호가 틀렸습니다. 다시 시도해주세요!");
        }
      }  catch (error) {
        console.error(error);
        alert("학번 또는 비밀번호가 틀렸습니다. 다시 시도해주세요!");
      }
    },
    async submitUser() {
      try {
        const response = await axios.post("http://localhost:3001/api/login", {
          studentID: this.userId,
          password: this.password,
        });

        if (response.status === 200) {
          const { user, token } = response.data;
          
          // 로그인에 성공하면 사용자 정보와 토큰을 로컬 스토리지에 저장합니다.
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);

          // 로그인에 성공하면 Main 페이지로 이동합니다.
          this.$router.push({
            path: '/MainPage',
          });
        }
      }  catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  font-family: 'jua', sans-serif;
}

.LoginPageContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, white, #F6E6F6);
  overflow: hidden; /* Prevent scrolling */
  font-family: 'jua', sans-serif;
}

.LoginPage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed; /* Change to fixed */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 50px;
}

.logo-container {
  text-align: center;
  margin-bottom: 20px;
  width: 100%; /* Add this line */
}

.logo {
  max-width: 70%;
  height: auto;
  display: inline-block; /* Add this line */
}

.LoginPage h1 {
  font-size: 32px;
  text-align: center;
  margin-bottom: 30px;
}

.int-area input {
  width: 100%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 15px;
  font-family: 'jua', sans-serif;
}


.btn-area button {
  width: 100%; /* Allow the button to expand to the parent width */
  max-width: 300px; /* Set a maximum width for the button */
  margin: 0 auto; /* Center the button horizontally */
  padding: 15px; /* Adjust padding for spacing */
  background: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  font-family: 'jua', sans-serif;
}

.btn-area button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.caption {
  margin-top: 15px;
  text-align: center;
}

.caption a {
  font-size: 16px;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  font-family: 'jua', sans-serif;
}

@font-face {
    font-family: 'HakgyoansimWoojuR';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimWoojuR.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

</style>