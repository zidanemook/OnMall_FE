<template>
    <div>
        <div class ="header">
            <!-- Navbar -->
            <div class="box-brand">
                <a href="/" class="navbar-brand">MOOKMALL</a>
            </div>

            <div class="box-search">
                <input type="text" placeholder="검색..." class="search-input">
            </div>

            <!-- 로그인되지 않았을 때 표시 -->
            <div class="buttons-container" v-if="!isLoggedIn">
                <button class="login-btn" @click="goTo('/login')">로그인</button>
                <button class="signup-btn" @click="goTo('/signup')">회원가입</button>
            </div>

            <!-- 로그인되었을 때 표시 -->
            <div class="buttons-container" v-if="isLoggedIn">
                <button class="mypage-btn" @click="goTo('/mypage')">마이페이지</button>
                <button class="logout-btn" @click="logout">로그아웃</button>
            </div>


        </div>
    

        <!-- Horizontal Category List -->
        <div class="category-list">
            <b-list-group horizontal class="justify-content-center">
                <b-list-group-item to="/food">식품</b-list-group-item>
                <b-list-group-item to="/furniture">가구</b-list-group-item>
                <b-list-group-item to="/electronics">전자</b-list-group-item>
                <b-list-group-item to="/clothes">의류</b-list-group-item>
                <b-list-group-item to="/book">도서</b-list-group-item>
                <b-list-group-item to="/life">생활</b-list-group-item>
            </b-list-group>
        </div>

    </div>
</template>


<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
    name: "HeaderLayout",
    data() {
        return {
            isMenuOpen: false
        };
    },
    computed: {
        ...mapState(['isLoggedIn'])  // Vuex 스토어의 isLoggedIn 상태를 매핑
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },

        async logout() {
            try {

                // 로컬 스토리지에서 토큰 제거
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                
                // 로그인 상태 업데이트
                this.$store.commit('SET_LOGIN_STATE', false);

                // 백엔드로 로그아웃 요청
                await axios.post('http://localhost:8080/auth/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        RefreshToken: `Bearer ${localStorage.getItem('refreshToken')}`
                    }
                });
            } catch (error) {
                console.error('로그아웃 중 오류 발생:', error);
            }
        },
        
        goTo(path) {
        this.$router.push(path);
    }
    }
};
</script>

<style scoped>

.box-brand {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    width: 300px;
    vertical-align: top;
    padding: 1rem;
    background-color: orange;
}

.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: white;
    text-decoration: none;
}

.box-search{
    position: relative;
    display: inline-block;
    margin-top: 15px;
    margin-left: 40px;
    box-sizing: border-box;
}

.search-input {
    width: 20vw;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ddd;
}

.buttons-container {
    position: relative;
    display: inline-block;
    margin-left: 40px;
}

.login-btn, .signup-btn, .mypage-btn, .logout-btn{
    margin-left: 10px;
    border: 1px solid #ddd;
    background-color: white;

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


</style>
