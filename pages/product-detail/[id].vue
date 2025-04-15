<script setup>
import { ref, onMounted, watch} from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const productId = route.params.id
const product = ref({})
const quantity = ref(1)
const loading = ref(true)
const error = ref(null)



onMounted(async () => {
try {
  loading.value = true;
  error.value = null;
  
  console.log("Attempting to fetch product with ID:", productId);
  
  const response = await fetch(`https://flower-shop-db.vercel.app/api/v1/products/${productId}`);
  
  console.log("API response status:", response.status);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch product. Status: ${response.status}`);
  }
  
  const data = await response.json();
  console.log("API response data:", data);
  
  if (data && data.product) {
    product.value = data.product;
    console.log("Product loaded successfully:", product.value);
  } else {
    throw new Error('Product data structure is invalid');
  }
} catch (err) {
  console.error('Error details:', err);
  error.value = 'Product not available. Please try another product.';
} finally {
  loading.value = false;
}
});

watch([product, quantity], () => {
  if (quantity.value < 1) quantity.value = 1
  if (product.value.stock && quantity.value > product.value.stock) {
    quantity.value = product.value.stock
  }
})
</script>

<template>
    <div class="min-h-screen flex flex-col">
      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center h-screen">
        <p class="text-xl text-[#26103d]">Loading product details...</p>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="flex justify-center items-center h-screen">
        <p class="text-xl text-red-600">{{ error }}</p>
      </div>
      
      <div v-else>

        <div class="px-8 pt-6 mt-20">
          <!-- <router-link to="/product" class="text-[#26103d] font-semibold">&larr; PRODUCT DETAIL:</router-link> -->
          <router-link class="text-2xl font-cairo font-bold text-indigo-950 w-full text-left"> &larr; PRODUCT DETAIL</router-link>

          <!-- <br>
          <hr class="border-t border-[#26103d]"> -->
        </div>
        <div class="shadow-md rounded-lg w-[80%] mx-auto my-8">
    <div class="flex flex-col lg:flex-row lg:items-center  lg:justify-center">
          <div class="lg:w-1/3 p-10">
            <img :src="product.image || '../assets/Productdetails.png'" :alt="product.title" class="w-fit h-[400px] object-cover rounded-full mx-auto" />
          </div>

          <div class="lg:w-2/3 p-6">
            <div class="flex justify-between">
              <h1 class="text-3xl font-bold text-indigo-900">{{ product.title }}</h1>
            <div class="flex gap-1 items-end me-4">
              <p class="text-xl font-bold text-indigo-950 ">{{ product.priceAfterDiscount }} LE</p>
            <p v-if="product.priceAfterDiscount !== product.price" class="text-red-500 text-sm line-through ">{{ product.price }} LE</p>
            </div>
            </div>
            <div class="mt-6">
              <h2 class="text-xl font-bold text-indigo-950 mb-2">Description</h2>
              <p class="text-gray-700">{{ product.description }}</p>
            </div>

            <div class="mb-4">
              <div class="flex gap-4">
                <label class="block text-indigo-950 font-semibold mb-2">Quantity</label>
              <p class="text-sm text-gray-500 mt-1">{{ product.stock }} item avalible in stock</p>
              </div>
              <input 
                type="number" 
                v-model="quantity" 
                min="1" 
                :max="product.stock"
                class="w-20 text-center border border-indigo-300 rounded-md p-2"
              />
            </div>

            <div class="mb-4">
              <p class="text-lg font-semibold text-indigo-950">Total: {{ (quantity * product.priceAfterDiscount).toFixed(2) }} LE</p>
            </div>

            

            <button class="bg-indigo-950 text-white px-6 py-3 rounded-md w-full transition hover:bg-indigo-700">
              Add to cart
            </button>

          </div>
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