// src/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import Mypage from '@/views/Mypage.vue'
import ProductDetail from '../views/ProductDetail.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { hideHeader: true }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: { hideHeader: true }
  },
  {
    path: '/mypage',
    name: 'Mypage',
    component: Mypage
  },
  {
    path: '/productdetail/:id',
    name: 'productdetail',
    component: ProductDetail,
    props: true,
    meta: { hideHeader: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

