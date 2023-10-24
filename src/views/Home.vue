

<template>
    <div class="recent-list">
      <ul v-if="receivedProducts && receivedProducts.length">
        <li v-for="product in receivedProducts" :key="product.id">
          <div class="img">
            <router-link :to="`/productdetail/${product.id}`">
              <img :src="product.photo" alt="product.productname">
            </router-link>
          </div>

          <div class="productname">
            <router-link :to="`/productdetail/${product.id}`">{{ product.productname }}</router-link>
          </div>

          <div class="price">
            <strong><span>{{ product.price }}</span>원</strong>
          </div>
        </li>
      </ul>

      <div class="pagination">
        <button @click="goToPage(0)" :disabled="currentPage === 0">First</button>
        <button @click="prevPage" :disabled="currentPage === 0">Previous</button>
        <span v-for="page in pageNumbers" :key="page">
            <button 
                v-if="currentPage !== page" 
                @click="goToPage(page)" 
            >
                {{ page + 1 }}
            </button>
            <span v-else>{{ page + 1 }}</span>
        </span>
        <button @click="nextPage" :disabled="currentPage + 1 === totalPages">Next</button>
        <button @click="goToPage(totalPages - 1)" :disabled="currentPage + 1 === totalPages">Last</button>
    </div>

    </div>
</template>

<script>
import { mapState } from 'vuex';
//import axios from 'axios';

export default {
  name: 'HomeView',
    data() {
        return {
            //products: [],
          
        }
    },
    computed: {
      ...mapState(['receivedProducts', 'currentPage', 'totalPages', 'pageSize']),
      pageNumbers() {
        return [...Array(this.totalPages).keys()];
      }
    },
    async created() {
      await this.$store.dispatch('fetchGetProducts');
    },
    methods: {
      async nextPage() {
      if (this.currentPage + 1 < this.totalPages) {
          this.$store.commit('INCREMENT_CURRENT_PAGE');
          await this.$store.dispatch('fetchGetProducts');
      }
      },
      async prevPage() {
          if (this.currentPage > 0) {
              this.$store.commit('DECREMENT_CURRENT_PAGE');
              await this.$store.dispatch('fetchGetProducts');
          }
      },
      async goToPage(page) {
          this.$store.commit('SET_CURRENT_PAGE', page);
          await this.$store.dispatch('fetchGetProducts');
      }
    }
}
</script>

<style scoped>

.recent-list{
  margin-top: 50px;
}

.recent-list ul li {
    position: relative;
    display: inline;
    float: left;
    width: 200px;
    height: 240px;
    margin-left: 70px;
    margin-right: 70px;
    margin-top: 25px;
    margin-bottom: 25px;
}


.img img {
    width: 250px;  /* 원하는 너비 */
    height: 220px; /* 원하는 높이 */
    object-fit: cover; /* 이미지 비율 유지 및 여백 제거 */
}

.pagination{
  display: flex;
  justify-content: center;
  position: relative;
  clear: both;
  padding-top: 2%;
}
</style>