<script setup>
import { ref, onMounted } from 'vue';
import heart from "../assets/Vector (1).svg";
import fillHeart from "../assets/Fill-heart.svg";


const products = ref([]);

const getProducts = async () => {
  const { data, status, message } = await useAsyncFetch("GET", "/api/v1/products/all/?page=1&limit=12");

  if (status === 'success') {
    products.value = data.products.map(product => ({
      ...product,
      isFavorite: false, 
    }));
  } else {
    console.error("failed to fetch products", message);
  }
};

onMounted(() => {
  getProducts();
});

const toggleFavorite = (product) => {
  product.isFavorite = !product.isFavorite;
};

const addToCart = async (productId, quantity=1) => {
  const { data, status, message } = await useAsyncFetch('POST', '/api/v1/cart', { product:productId, quantity:quantity });

  if (status === 'success') {
    console.log('Item added to cart successfully:', data);
  } else {
    console.error('Failed to add item to cart:', message);
  }
};

</script>

<template>
  <div v-for="(product, index) in products" :key="index" class="flex flex-col w-[350px] pb-5 rounded-xl border-2 gap-4">
    <img :src="product.image" alt="Bouquet" class="rounded-t-xl w-full h-fit object-cover p-5" />
    <p class="text-indigo-950 text-sm pl-5">{{ product.title }}</p>
    <div class="flex flex-row justify-between px-5">
      <p class="text-indigo-950 text-md font-bold">Price : {{ product.price }} LE</p>
      <div class="flex gap-4">
        <button @click="toggleFavorite(product)">
          <img :src="product.isFavorite ? fillHeart : heart" class="w-6 h-6" />
        </button>
        <button @click="addToCart(product._id)">
          <img src="../assets/Vector (3).svg" class="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
</template>