<template>
    <div class="signup-container">
      <div class="signup-card">
        <h2>회원가입</h2>
  
        <b-form @submit="onSignup">
          <b-form-group label="이메일">
            <b-form-input type="email" v-model="email" placeholder="이메일을 입력하세요"></b-form-input>
          </b-form-group>
  
          <b-form-group label="비밀번호">
            <b-form-input type="password" v-model="password" placeholder="비밀번호를 입력하세요"></b-form-input>
          </b-form-group>
  
          <b-form-group label="비밀번호 확인">
            <b-form-input type="password" v-model="confirmPassword" placeholder="비밀번호를 다시 입력하세요"></b-form-input>
          </b-form-group>
  
          <b-button type="submit" variant="primary">회원가입</b-button>
        </b-form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SignupView',
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: ''
      };
    },
    methods: {
      onSignup(event) {
        event.preventDefault();
        // 회원가입 로직 추가
      }
    }
  }
  </script>
  
  <style scoped>
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
  