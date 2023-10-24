// src/layout/Header.vue

<template>
    <div>
        <div class ="header">
            <!-- Navbar -->
            <div class="box-brand" @click="selectProductType(ProductType.PRODUCT_TYPE_ALL)">
                <a class="navbar-brand">MOOKMALL</a>
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
                <b-list-group-item @click="selectProductType(ProductType.PRODUCT_TYPE_ALL)" class="hover-item">신제품</b-list-group-item>
                <b-list-group-item @click="selectProductType(ProductType.PRODUCT_TYPE_FOOD)" class="hover-item">식품</b-list-group-item>
                <b-list-group-item @click="selectProductType(ProductType.PRODUCT_TYPE_FURNITURE)" class="hover-item">가구</b-list-group-item>
                <b-list-group-item @click="selectProductType(ProductType.PRODUCT_TYPE_ELECTRONICS)" class="hover-item">전자</b-list-group-item>
                <b-list-group-item @click="selectProductType(ProductType.PRODUCT_TYPE_CLOTHE)" class="hover-item">의류</b-list-group-item>
                <b-list-group-item @click="selectProductType(ProductType.PRODUCT_TYPE_BOOK)" class="hover-item">도서</b-list-group-item>
                <b-list-group-item @click="selectProductType(ProductType.PRODUCT_TYPE_LIFE)" class="hover-item">생활</b-list-group-item>
            </b-list-group>

            <!-- orderType 선택 드롭다운 -->
            <div class="dropdown-container">
                <select v-model="selectedOrderType">
                    <option v-for="orderType in orderTypes" :key="orderType" :value="orderType"> {{ orderType }} </option>
                </select>
            </div>

            <!-- sortOrder 선택 드롭다운 -->
            <div class="dropdown-container">
                <select v-model="selectedSortOrder">
                    <option v-for="order in sortOrders" :key="order" :value="order">{{ order }}</option>
                </select>
            </div>

        </div>

        

    </div>
</template>


<script>
import { mapState } from 'vuex';
import axios from 'axios';
import { ProductType, OrderType, SortOrder } from '../enum/enum.js'; 


export default {
    name: "HeaderLayout",
    data() {
        return {
            isMenuOpen: false,
            selectedOrderType: '',
            selectedSortOrder: '',
            orderTypes: Object.values(OrderType),
            sortOrders: Object.values(SortOrder),
            ProductType: ProductType
        };
    },

    watch: {
            selectedOrderType(newVal) {
                this.$store.commit('SET_SELECTED_ORDER_TYPE', newVal);
                this.$store.dispatch('fetchGetProducts');
            },

            selectedSortOrder(newVal) {
                this.$store.commit('SET_SELECTED_SORT_ORDER', newVal);
                this.$store.dispatch('fetchGetProducts');
            }
            
    },

    computed: {
        ...mapState(['isLoggedIn']),  // Vuex 스토어의 isLoggedIn 상태를 매핑
        apiEndpoint() {
            return this.$store.state.apiEndpoint;
        }
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },

        selectProductType(newVal) {
            this.$store.commit('SET_SELECTED_PRODUCT_TYPE', newVal);
            this.$store.dispatch('fetchGetProducts');
        },

        async logout() {
            try {

                // 로컬 스토리지에서 토큰 제거
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                
                // 로그인 상태 업데이트
                this.$store.commit('SET_LOGIN_STATE', false);

                // 백엔드로 로그아웃 요청
                await axios.post(`${this.apiEndpoint}auth/logout`, {}, {
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

.box-brand:hover {
    background-color: #fab464;
    cursor: pointer;
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
    margin-top: 20px;
    display: inline-flex
}

.hover-item:hover {
    background-color: #f5f5f5 !important;
    cursor: pointer;
}

.list-group-item {
    border: none;
    background-color: #9088fd;
}

.list-group-item-action {
    width: 7%;
    color: #030d16;
}

.dropdown-container{
    
    margin-top: 10px;
    margin-left: 20px;
}


</style>
