<template>

    <div class="product-detail">

        <div class="header">
            <a href="/" class="mookmall-header">MOOKMALL</a>
        </div>


        <div class="product-box">
            <div class="product-image">
                <img :src="productImage" alt="상품 이미지" />
            </div>

            <div class="product-info">
                <div class="product-name">
                    <strong>제품명: {{ productName }}</strong>
                </div>
                <div class="product-price">
                    <strong>가격: {{ productPrice }}</strong>
                </div>

                <div>
                    <button class="basket-btn">장바구니</button>
                    <button class="purchase-btn">구매하기</button>
                </div>
            </div>
        </div>
    
        <div class="product-moreinfo">
            
            <div class="product-manufacturer">
                <strong>제조사: {{ manufacturer }}</strong>
            </div>
            <div class="product-created">
                <strong>등록일: {{ createdAt }}</strong>
            </div>
        </div>

        <div class="product-description">

        </div>

        <!-- 점수 작성 -->
        <div class="product-rating" v-if="isLoggedIn">
            <b-form-rating v-model="currentRating" stars="10" @change="sendRating"></b-form-rating>
        </div>
            
        <div>
            <p class="mt-2">총평점: {{ ratingvalue }}</p>
        </div>

        <!-- 리뷰 작성 -->
        <div class="product-comment" v-if="isLoggedIn">
            <textarea v-model="commentText" class="comment-input" placeholder="댓글을 작성하세요..."></textarea>
            <button @click="submitComment" class="comment-submit-button">제출</button>
        </div>

        <!-- 리뷰 보기 -->
        <div class="product-reviews">
            <div class="review">아이디<br>댓글 내용</div>
            <div class="review">아이디<br>댓글 내용</div>
            <div class="review">아이디<br>댓글 내용</div>
        </div>

    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'ProductDetail',
    data() {
        return {
            commentText: '',
            productName: '',
            productPrice: '',
            ratingvalue: null,
            productImage: '',
            manufacturer: '',
            createdAt: '',
            currentRating: null,
            productId: null
        };
    },
    created() {
        this.productId = this.$route.params.id;
        axios.get(`${this.apiEndpoint}productdetail?productid=${this.productId}`)
        .then(response => {
            const product = response.data.data;
            this.productName = product.productname;
            this.productPrice = product.price;
            this.ratingvalue = product.rating;
            this.productImage = product.photo;
            this.manufacturer = product.manufacturer;
            this.createdAt = product.createdAt;
        })
        .catch(error => {
            console.error("API 호출 중 오류 발생:", error);
        });

        if(this.$store.state.isLoggedIn === true){
            const token = localStorage.getItem('accessToken');

            axios.get(`${this.apiEndpoint}auth/currentrating?productId=${this.productId}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                this.currentRating = response.data.data;
            })
            .catch(error => {
                console.error("API 호출 중 오류 발생:", error);
            });
        }
        

    },
    computed: {
        isLoggedIn() {
            return this.$store.state.isLoggedIn;
        },
        apiEndpoint() {
            return this.$store.state.apiEndpoint;
        }
    },
    methods: {
        submitComment() {
            if (this.commentText.trim() === '') {
                alert('댓글을 입력해주세요.');
                return;
            }
            
            // TODO: 댓글 제출 로직 (예: API 호출 등)
            console.log('제출된 댓글:', this.commentText);

            // 댓글을 제출한 후 입력창을 초기화합니다.
            this.commentText = '';
        },
        async sendRating() {

            const token = localStorage.getItem('accessToken');

            try {
                // axios를 사용하여 서버에 별점과 제품 ID를 전송합니다.
                const response = await axios.post(`${this.apiEndpoint}auth/rating`,
                    {
                        score: this.currentRating,
                        productId: this.productId
                    },
                    {
                        headers: {
                        'Authorization': 'Bearer ' + token // JWT 토큰을 헤더에 추가
                        }
                    }
                );
                
                // 총평점 업데이트
                this.ratingvalue = response.data.data;

            } catch (error) {
                console.error("별점 전송 중 오류가 발생했습니다.", error);
            }
        }
    }
}
</script>

<style scoped>

    .header {
      background-color: orange;
      width: 20%;
      position: absolute;
      top: 3%;
      left: 35%;
    }

    .product-detail{
        position: relative;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: top;
    }

    .product-box{
        display: flex;
    }

    .product-image img {
        margin-top: 70px;
        width: 500px;
        max-width: 100%;  /* 최대 너비는 부모 요소의 100%를 넘지 않도록 설정 */
    }


    @media (max-width: 768px) {
        .product-image img {
            width: 60%;  /* 이미지의 너비를 부모 요소의 100%로 설정 */
        }
        .product-box {
            display: block;
        }
    }

    .product-info {

        margin-top: 100px;
    }

    .product-name{
        margin-top: 10px;
    }

    .product-price{
        margin-top: 70px;
    }

    .basket-btn{
        margin-top: 110px;
    }

    .purchase-btn{
        margin-left: 50px;
    }

    .product-moreinfo{
        display: flex;
        margin-top: 80px;
    }

    .product-manufacturer{
        width: 300px;
    }

    .product-rating{
        margin-top: 30px;
    }

    .product-created{
        width: 300px;
    }

    .product-comment{

        margin-top: 80px;
    }

    .comment-input{
        width: 600px;
        height: 100px;
    }

    .product-reviews{
        margin-top: 80px;
    }

    .product-reviews .review {
        border: 1px solid #ccc;
        padding: 10px;
        margin-top: 10px;
    }
</style>
