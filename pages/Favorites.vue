<script setup>
import { ref, onMounted } from 'vue';
import fillHeart from "../assets/Fill-heart.svg";

const { favoriteProducts, loading, error, fetchFavorites, removeFromFavorites } = useWishlist();
const {  loadproduct,addToCart} = useCart();
const router=useRouter()

onMounted(() => {
  fetchFavorites();
});
const navigateToProductDetail = (productId) => {
  console.log('Navigating to product:', productId); 
  router.push({
    path: `/product-detail/${productId}`
  });
}
</script>

<template>
  <!-- loading -->
  <div v-if="loading" class="flex justify-center items-center min-h-screen">
    <LoadingIndicator />
  </div>

  <div class="w-full top-36 relative flex flex-col gap-10 px-10 mb-56">
    <p class="text-2xl font-cairo font-bold text-indigo-950 w-full text-left">MY FAVORITES:</p>
    
    <div v-if="error" class="">
      <ErrorMessageIndicator :message="error" />
    </div>

    <!-- Empty -->
    <div v-else-if="favoriteProducts.length === 0">
      <EmptyIndicator />
    </div>
    <div class=" md:flex-row  items-center  px-10 flex flex-row flex-wrap gap-3 justify-center my-4 pb-5">
      <!-- Error -->
    <div
        v-for="(product, index) in favoriteProducts"
        :key="index"
        class="flex flex-col w-[350px] p-5 rounded-xl border-2 gap-4 hover:shadow-md hover:scale-[102%]"
        @click="navigateToProductDetail(product._id)"
        
      >
        <img
          :src="product.image || 'https://via.placeholder.com/200x200?text=No+Image'"
          alt="Bouquet"
          class="rounded-3xl w-full h-fit object-cover"
        />
        <p class="text-indigo-950 font-bold text-sm pl-5">{{ product.title }}</p>
        <div class="flex flex-row justify-between px-5">
          <div class="flex gap-1 items-end me-4">
            <p class="text-xl font-bold text-indigo-950">
              {{ product.priceAfterDiscount }} LE
            </p>
            <p
              v-if="product.priceAfterDiscount !== product.price"
              class="text-red-500 text-sm line-through"
            >
              {{ product.price }} LE
            </p>
          </div>
          <div class="flex gap-4">
            <button @click="removeFromFavorites(product._id)">
              <img
                :src="fillHeart" class="w-6 h-6 hover:scale-[103%]"
              />
            </button>
            <div v-if="loadproduct">
              <Loading/>
            </div>

            <button v-else @click.stop="addToCart(product._id);removeFromFavorites(product._id)">
              <img
                src="../assets/Vector (3).svg"
                class="w-6 h-6 hover:scale-[103%]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    
</template>