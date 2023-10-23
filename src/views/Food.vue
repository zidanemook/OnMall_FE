<template>
    <div class="food-list">
      <ul v-if="products && products.length">
        <li v-for="product in products" :key="product.id">
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
import axios from 'axios';


export default {
    name: 'FoodView',
    data() {
        return {
            products: [],
            currentPage: 0,
            totalPages: 0,
            pageSize: 20
        }
    },
    computed: {
        pageNumbers() {
            return [...Array(this.totalPages).keys()];
        }
    },
    async created() {
        await this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            try {
                const response = await axios.get(`http://localhost:8080/product/food?page=${this.currentPage}&size=${this.pageSize}`);
                this.products = response.data.data.content;
                this.totalPages = response.data.data.totalPages;
            } catch (error) {
                console.error("Error fetching products", error);
            }
        },
        async nextPage() {
            if (this.currentPage + 1 < this.totalPages) {
                this.currentPage++;
                await this.fetchProducts();
            }
        },
        async prevPage() {
            if (this.currentPage > 0) {
                this.currentPage--;
                await this.fetchProducts();
            }
        },
        async goToPage(page) {
            this.currentPage = page;
            await this.fetchProducts();
        }
    }
}
</script>

<style scoped>

.food-list{
  margin-top: 50px;
}

.food-list ul li {
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