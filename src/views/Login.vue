<template>
    <div class="login-page">

      <div class="header">
            <a href="/" class="mookmall-header">MOOKMALL</a>
      </div>

      <div class="login-form-container">
        <h2>로그인</h2>
        <b-form @submit="onSubmit">
          <b-form-group label="이메일" label-for="email-input">
            <b-form-input
              id="email-input"
              type="email"
              v-model="email"
              required
              placeholder="이메일을 입력하세요."
            ></b-form-input>
          </b-form-group>
          <b-form-group label="비밀번호" label-for="password-input">
            <b-form-input
              id="password-input"
              type="password"
              v-model="password"
              required
              placeholder="비밀번호를 입력하세요."
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">로그인</b-button>
          <div v-if="errorMessage">
            <p class="error-message">{{ errorMessage }}</p>
          </div>
        </b-form>
      </div>
      
    </div>
</template>
  
  <script>

  import axios from 'axios';

  export default {
    name: 'LoginView',
    data() {
      return {
        email: '',
        password: '',
        errorMessage: null,
      };
    },
    methods: {
      async onSubmit(event) {
        event.preventDefault();
        
        //console.log(this.email);

        try {
          const response = await axios.post('http://localhost:8080/login', {
            email: this.email,
            password: this.password,
          });

          // 로그인 성공
          if(response.data.status === 200) {

            const accessToken = response.headers['authorization'].split(' ')[1];  // "Bearer "를 제거
            const refreshToken = response.headers['refreshtoken'].split(' ')[1];

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            this.$store.dispatch('setLoginState', true);
            this.$router.push('/');
          } else {
            // 오류 메시지 처리
            console.error(response.data.value);
          }

        } catch (error) {
          if (error.response) {
            // 서버에서 제공하는 에러 메시지 출력
            this.errorMessage = error.response.data.data.value;
            console.error("Error from server:", this.errorMessage);
          } else {
            // 다른 이유로 발생한 에러 처리
            console.error("Other error:", error.message);
        }
        }
      }
    }
  }
  </script>
  
  <style scoped>

  .login-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

  }

  .header {
      background-color: orange;
      width: 20%;
      text-align: center;
      position: absolute;
      top: 3%;
  }

  .mookmall-header {
    font-size: 24px;
    font-weight: bold;
    color: white;  
    text-decoration: none;
  }
  
  .login-form-container {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    width: 80vw;
    max-width: 400px;
  }
  </style>
  