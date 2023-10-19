<template>
    <div class="login-page">
      <div class="login-form-container">
        <h2>로그인</h2>
        <b-form @submit="onSubmit">
          <b-form-group label="이메일" label-for="email-input">
            <b-form-input
              id="email-input"
              type="email"
              required
              placeholder="이메일을 입력하세요."
            ></b-form-input>
          </b-form-group>
          <b-form-group label="비밀번호" label-for="password-input">
            <b-form-input
              id="password-input"
              type="password"
              required
              placeholder="비밀번호를 입력하세요."
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">로그인</b-button>
        </b-form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginView',
    methods: {
      onSubmit(event) {
        event.preventDefault();
        // 로그인 처리 로직
      }
    }
  }
  </script>
  
  <style scoped>
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
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
  