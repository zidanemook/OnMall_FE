<template>
    <div class="signup-container">

      <div class="header">
            <a href="/" class="mookmall-header">MOOKMALL</a>
      </div>


      <div class="signup-card">
        <h2>회원가입</h2>
  
        <b-form @submit="onSignup">
          <b-form-group label="이메일">
            <b-form-input type="email" v-model="email" placeholder="이메일을 입력하세요"></b-form-input>
          </b-form-group>

          <b-form-group label="아이디">
            <b-form-input type="text" v-model="username" placeholder="아이디를 입력하세요"></b-form-input>
          </b-form-group>
  
          <b-form-group label="비밀번호">
            <b-form-input type="password" v-model="password" placeholder="비밀번호를 입력하세요"></b-form-input>
          </b-form-group>
  
          <b-form-group label="비밀번호 확인">
            <b-form-input type="password" v-model="confirmPassword" placeholder="비밀번호를 다시 입력하세요"></b-form-input>
          </b-form-group>
  
          <b-form-group label="회원 유형">
            <b-form-select v-model="role" :options="userOptions"></b-form-select>
          </b-form-group>

          <b-button type="submit" variant="primary">회원가입</b-button>
        </b-form>
      </div>
    </div>
  </template>
  
  <script>

  import axios from 'axios';

  export default {
    name: 'SignupView',
    data() {
      return {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: '',
        userOptions: [ // 옵션 값을 객체로 설정하여 display와 value 값을 갖게 함.
                { text: '판매자', value: 'ROLE_SELLER' },
                { text: '구매자', value: 'ROLE_CUSTOMER' }
            ]
      };
    },
    computed: {
        apiEndpoint() {
            return this.$store.state.apiEndpoint;
        }
    },
    methods: {
      async onSignup(event) {
        event.preventDefault();

        if (this.password !== this.confirmPassword) {
          alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
          return;
        }

        if(!this.role){
          alert('회원 유형을 선택해주세요.');
          return;
        }

        try {
          const response = await axios.post(`${this.apiEndpoint}signup`, {
            email: this.email,
            username: this.username,
            password: this.password,
            role: this.role
          });

          // 성공적으로 회원가입이 되었을 경우의 처리
          if(response.data.status === 200) {
            this.$router.push('/');
          } else {
            // 오류 메시지 처리
            console.error(response.data.message);
          }

        } catch (error) {
          // 네트워크 오류나 서버 오류 처리
          console.error('An error occurred:', error);
        }
      }
    }
  }
  </script>
  
  <style scoped>

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
  
  .signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .signup-card {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  