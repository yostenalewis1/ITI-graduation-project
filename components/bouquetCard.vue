<script setup>
import { ref, onMounted } from 'vue';
import heart from "../assets/Vector (1).svg";
import fillHeart from "../assets/Fill-heart.svg";

const products = ref([]);
const loading = ref(false);
const error = ref(null);
const isEmpty = ref(false);

const getProducts = async () => {
  loading.value = true;
  error.value = null;
  isEmpty.value = false;

  try {
    const { data, status, message } = await useAsyncFetch("GET", "/api/v1/products/all/?page=1&limit=12");

    if (status === 'success') {
      products.value = data.products.map(product => ({
        ...product,
        isFavorite: false, 
      }));
      isEmpty.value = products.value.length === 0;
    } else {
      error.value = message || "Failed to fetch products.";
    }
  } catch (err) {
    error.value = err.message || "An error occurred while fetching products.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getProducts();
});

const toggleFavorite = (product) => {
  product.isFavorite = !product.isFavorite;
};

const addToCart = async (productId, quantity=1) => {
  try {
    const { data, status, message } = await useAsyncFetch('POST', '/api/v1/cart', { product: productId, quantity: quantity });

    if (status === 'success') {
      useToastify.success("Product successfully added to cart", {
        autoClose: 1000,
        position: ToastifyOption.POSITION.BOTTOM_RIGHT,
        type: ToastifyOption.TYPE.SUCCESS,
      });
      console.log('Item added to cart successfully:', data);
    } else {
      throw new Error(message || "Failed to add product to cart.");
    }
  } catch (err) {
    useToastify.error(err.message, {
      autoClose: 3000,
      position: ToastifyOption.POSITION.BOTTOM_RIGHT,
      type: ToastifyOption.TYPE.ERROR,
    });
    console.error('Failed to add item to cart:', err.message);
  }
};
</script>

<template>
  <div>
    <!-- Loading State -->
  <div
    v-if="loading"
    class="fixed inset-0 flex items-center justify-center z-50 bg-stone-300"
  >
    <LoadingIndicator />

  </div>
  <div v-if="error">
  <ErrorMessageIndicator :message="error "/>
  </div>
    <div v-if="isEmpty && !loading" >
      <EmptyIndicator/>
    </div>

    <div v-else class="flex flex-row flex-wrap gap-3">
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
    </div>
  </div>
</template>