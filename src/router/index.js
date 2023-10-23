// src/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import Mypage from '@/views/Mypage.vue'
import Book from '@/views/Book.vue'
import Clothe from '@/views/Clothe.vue'
import Electronics from '@/views/Electronics.vue'
import Food from '@/views/Food.vue'
import Furniture from '@/views/Furniture.vue'
import Life from '@/views/Life.vue'
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
    path: '/book',
    name: 'Book',
    component: Book
  },
  {
    path: '/clothe',
    name: 'Clothe',
    component: Clothe
  },
  {
    path: '/electronics',
    name: 'Electronics',
    component: Electronics
  },
  {
    path: '/food',
    name: 'Food',
    component: Food
  },
  {
    path: '/furniture',
    name: 'Furniture',
    component: Furniture
  },
  {
    path: '/life',
    name: 'Life',
    component: Life
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

