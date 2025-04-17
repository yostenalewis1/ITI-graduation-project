<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import LoadingIndicator from '~/components/LoadingIndicator.vue';
import ErrorMessageIndicator from '~/components/ErrorMessageIndicator.vue';
import { useAsyncFetch } from '~/composables/useAsyncFetch.js'; 

const route = useRoute();
const productId = route.params.id;
const product = ref({});
const quantity = ref(1);
const loading = ref(true);
const error = ref(null);
const reviews = ref([]);
const newReviewContent = ref('');
const newReviewRating = ref(1); 
const load=ref(false)
const {loadproduct,addToCart}=useCart()

onMounted(async () => {
  try {
    loading.value = true;
    error.value = null;

    const { data: productData, status: productStatus } = await useAsyncFetch('GET', `/api/v1/products/${productId}`);
    if (productStatus === 'success' && productData.product) {
      product.value = productData.product;
      reviews.value = productData.product.reviews || [];
      console.log(productData);
    } else {
      throw new Error('Product data structure is invalid');
    }
  } catch (err) {
    error.value = 'Product not available. Please try another product.';
  } finally {
    loading.value = false;
  }
});

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0;
  const totalRating = reviews.value.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.value.length).toFixed(1); // Format to one decimal place
});

const addReview = async () => {
  load.value=true
  try {
    const { data, status: reviewStatus } = await useAsyncFetch('POST', '/api/v1/reviews', {
      product: productId,
      content: newReviewContent.value,
      rating: newReviewRating.value,
    });

    if (reviewStatus === 'success') {
      reviews.value.push(data.review); // Assuming the response contains the new review
      newReviewContent.value = '';
      newReviewRating.value = 1; 
    } else {
      throw new Error('Failed to add review');
    }
  } catch (err) {
    alert('Error adding review: ' + err.message);
  }
  load.value=false
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <LoadingIndicator />
    </div>

    <div v-else-if="error" class="flex justify-center items-center h-screen">
      <ErrorMessageIndicator :message="error" />
    </div>

    <div v-else>
      <div class="px-8 pt-6 mt-20">
        <NuxtLink to="/product">
          <p class="text-2xl font-cairo font-bold text-indigo-950 w-full text-left">&larr; PRODUCT DETAIL</p>
        </NuxtLink>
      </div>

      <div class="shadow-md rounded-lg w-[80%] mx-auto my-8">
        <div class="flex justify-end px-4 items-center mb-2 text-indigo-950 text-lg ">
            <div class="flex text-yellow-500">
              <span v-for="n in Math.floor(averageRating)" :key="n">★</span>
              <span v-for="n in 5 - Math.floor(averageRating)" :key="n">☆</span>
            </div>
            <p class="ml-2">({{ averageRating }} / 5)</p>
          </div>
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-center">
          <div class="lg:w-1/3 p-10">
            <img :src="product.image || '../assets/Productdetails.png'" :alt="product.title" class="w-fit h-[400px] object-cover rounded-full mx-auto" />
          </div>

          <div class="lg:w-2/3 p-6">
            <div class="flex justify-between">
              <h1 class="text-3xl font-bold text-indigo-900">{{ product.title }}</h1>
              <div class="flex gap-1 items-end me-4">
                <p class="text-xl font-bold text-indigo-950">{{ product.priceAfterDiscount }} LE</p>
                <p v-if="product.priceAfterDiscount !== product.price" class="text-red-500 text-sm line-through">{{ product.price }} LE</p>
              </div>
            </div>
            <div class="mt-6">
              <h2 class="text-xl font-bold text-indigo-950 mb-2">Description</h2>
              <p class="text-gray-700">{{ product.description }}</p>
            </div>

            <div class="mb-4">
              <div class="flex gap-4">
                <label class="block text-indigo-950 font-semibold mb-2">Quantity</label>
                <p class="text-sm text-gray-500 mt-1">{{ product.stock }} item available in stock</p>
              </div>
              <input 
                type="number" 
                v-model="quantity" 
                min="1" 
                :max="product.stock"
                class="w-20 text-center border focus:border-indigo-300 focus:outline-none rounded-md p-2 text-indigo-950 bg-white"
              />
            </div>

            <div class="mb-4">
              <p class="text-lg font-semibold text-indigo-950">Total: {{ (quantity * product.priceAfterDiscount).toFixed(2) }} LE</p>
            </div>

            <button @click="addToCart(product._id,quantity)" class="bg-[#26103D] text-white px-6 py-3 mt-4 rounded-md w-full transition hover:bg-[#361857]">
              <span v-if="loadproduct">
                <Loading/>
              </span>
              <span v-else>Add to cart</span>
            </button>
          </div>
        </div>

        <!-- Reviews Section -->
        <div class="max-w-100% me-auto p-4 text-indigo-950">
          <h2 class="text-2xl font-bold mb-4">Product Reviews</h2>
          
          <div v-if="reviews.length === 0" class="text-gray-500 mb-3">
            <p>No reviews available.</p>
          </div>
          <div v-else>
            <div v-for="review in reviews" :key="review._id" class="bg-white shadow-md rounded-lg p-4 mb-4">
              <h3 class="text-lg font-semibold">{{ review.user.userName }}</h3>
              <p class="text-sm text-gray-600">Email: {{ review.user.email }}</p>
              <p class="text-yellow-500">Rating: {{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</p>
              <p class="mt-2">{{ review.content }}</p>
              <p class="text-xs text-gray-400 mt-2">Reviewed on: {{ new Date(review.createdAt).toLocaleDateString() }}</p>
            </div>
          </div>
          <textarea 
            v-model="newReviewContent" 
            placeholder="Write a review"
            class=" border focus:border-indigo-300 focus:outline-none rounded-md p-2 mb-2 w-full bg-white text-indigo-950"
          ></textarea>
          <div class="mb-2 ">
            <label for="rating" class="block text-indigo-950 font-semibold mb-1">Rating: </label>
            <select v-model="newReviewRating" class="border focus:border-indigo-300 focus:outline-none rounded-md p-2 w-full sm:w-[30%] bg-white text-indigo-950">
              <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>
          
          <button @click="addReview" class="bg-[#26103D]  text-white px-6 py-3 rounded-md  transition hover:bg-[#361857]">
            <span v-if="load">
                <Loading/>
              </span>
            <span v-else>Add Review</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

.custom-number-input {
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  padding: 0.25rem;
}

.custom-number-input:focus {
  border-color: #26103d;
  box-shadow: 0 0 0 1px #26103d;
}
</style>

