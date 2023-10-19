<template>
    <div>
        <!-- Navbar -->
        <b-navbar type="dark" variant="orange" class="custom-navbar justify-content-center">
            <div class="d-flex align-items-center">
                <b-navbar-brand>MOOKMALL</b-navbar-brand>
                <b-form-input placeholder="검색..." style="width: 20vw;"></b-form-input>
            </div>
        </b-navbar>



        <!-- Horizontal Category List -->
        <div class="category-list">
            <b-list-group horizontal class="justify-content-center">
                <b-list-group-item to="/">홈</b-list-group-item>
                <b-list-group-item to="/food">식품</b-list-group-item>
                <b-list-group-item to="/furniture">가구</b-list-group-item>
                <b-list-group-item to="/electronics">전자</b-list-group-item>
                <b-list-group-item to="/clothes">의류</b-list-group-item>
                <b-list-group-item to="/book">도서</b-list-group-item>
                <b-list-group-item to="/life">생활</b-list-group-item>
            </b-list-group>
        </div>

        <div class="login-container">
            <b-button class="login-btn" variant="outline-dark" to="/login">로그인</b-button>
        </div>

        <div class="signup-container">
            <b-button class="signup-btn" variant="outline-dark" to="/signup">회원가입</b-button>
        </div>

    </div>
</template>


<script>
export default {
    name: "HeaderLayout",
    data() {
        return {
            isMenuOpen: false
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        }
    }
};
</script>

<style scoped>
.custom-navbar {
    padding-left: 1%;
    padding-right: 1%;
    width: 60vw;
    margin: auto;
}

.bg-orange {
    background-color: orange !important;
}

.category-list {
    margin-top: 20px;  /* 필요한 경우 마진을 조절할 수 있습니다. */
}

.list-group-item {
    border: none;
    background-color: #9088fd;
}

.list-group-item-action {
    width: 7%;
    color: #030d16;
}

.login-container {
    position: fixed;
    top: 4vh;  
    right: 10vw;  
}

.signup-container{
    position: fixed;
    top: 4vh;  
    right: 2vw;  
}
</style>
