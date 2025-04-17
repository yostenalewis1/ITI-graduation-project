<script setup>
import { useRouter } from "vue-router";
import LoadingIndicator from "/components/LoadingIndicator.vue";
import ErrorMessageIndicator from "/components/ErrorMessageIndicator.vue";
import EmptyIndicator from "/components/EmptyIndicator.vue";
import { useAsyncFetch } from "/composables/useAsyncFetch";
import heart from "../assets/Vector (1).svg";
import fillHeart from "../assets/Fill-heart.svg";
import { useCart } from '../composables/useCart'; 
import { useWishlist } from '../composables/useWishlist'; 

const categories = ref([]);
const selectedFilter = ref("ALL");
const filters = ref(["ALL"]);
const products = ref([]);
const isEmpty = ref(false);

const { favoriteIds, loading, error, fetchFavorites,addToFavorites, removeFromFavorites } = useWishlist();
const {  loadproduct,addToCart} = useCart();

const router = useRouter();

const fetchCategories = async () => {
  loading.value = true;
  error.value = null;
  isEmpty.value = false;

  try {
    const { data, status, message } = await useAsyncFetch(
      "GET",
      "/api/v1/categories/"
    );

    if (status === "success" && data.categories.length > 0) {
      console.log(data);

      categories.value = data.categories.map((item) => ({
        id: item._id,
        name: item.name,
        type: item.name,
        image: item.image,
      }));

      filters.value = ["ALL", ...data.categories.map((item) => item.name)];
      isEmpty.value = false;
    } else {
      isEmpty.value = true;
    }
  } catch (err) {
    error.value = err.message || "Failed to fetch categories.";
  } finally {
    loading.value = false;
  }
};

const fetchProducts = async (categoryId) => {
  loading.value = true;
  error.value = null;
  isEmpty.value = false;

  try {
    const { data, status, message } = await useAsyncFetch(
      "GET",
      `/api/v1/categories/${categoryId}/products`
    );

    if (status === "success" && data.products.length > 0) {
      products.value = data.products.map((product) => {
        // Calculate the average rating for each product
        const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = product.reviews.length ? (totalRating / product.reviews.length).toFixed(1) : 0;

        return {
          ...product,
          isFavorite: favoriteIds.value.includes(product._id),
          averageRating
        };
      });

      isEmpty.value = false;
    } else {
      isEmpty.value = true;
    }
  } catch (err) {
    error.value = err.message || "Failed to fetch products.";
  } finally {
    loading.value = false;
  }
};
onMounted(async () => {
  await fetchFavorites();
  fetchCategories();
});

const navigateToProductDetail = (productId) => {
  console.log('Navigating to product:', productId); 
  router.push({
    path: `/product-detail/${productId}`
  });
} 

const filteredCategories = computed(() => {
  return selectedFilter.value === "ALL"
    ? categories.value
    : categories.value.filter((c) => c.type === selectedFilter.value);
});
const toggleFavorite = async (product) => {
  if (product.isFavorite) {
    await removeFromFavorites(product._id);
    product.isFavorite = false;
  } else {
    await addToFavorites(product);
    product.isFavorite = true;
  }
};
const handleFilterClick = (category) => {
  console.log(category);

  selectedFilter.value = category;
  if (category !== "ALL") {
    const selectedCategory = categories.value.find((c) => c.name === category);
    console.log(selectedCategory);

    if (selectedCategory) {
      fetchProducts(selectedCategory.id);
    }
  } else {
    products.value = [];
  }
};

</script>

<template>
  <!-- Show only the loader when loading -->
  <div v-if="loading" class="flex justify-center items-center min-h-screen">
    <LoadingIndicator />
  </div>

  <!-- Main content -->
  <div v-else class="mt-24">
    <!-- Heading -->
    <h1 class="text-center text-4xl font-semibold text-[#26103d] mb-6">
      CATEGORIES
    </h1>

    <!-- Filters -->
    <div
      class="flex flex-wrap  justify-center items-center gap-4 sm:gap-12 mb-10 text-lg text-[#26103d]"
    >
      <button
        v-for="category in filters"
        :key="category.id"
        @click="handleFilterClick(category)"
        :class="[
          'font-bold',
          selectedFilter === category ? 'underline' : '',
          'transition-colors duration-300 hover:text-purple-700',
        ]"
      >
        {{ category }}
      </button>
    </div>

    <!-- Error -->
    <div v-if="error">
      <ErrorMessageIndicator :message="error" />
    </div>

    <!-- Empty -->
    <div v-else-if="isEmpty">
      <EmptyIndicator />
    </div>

    <!-- Category Cards -->
    <div v-else class="flex flex-col sm:flex-row flex-wrap px-10 gap-5 justify-center items-center pb-5">
      <div
        v-if="selectedFilter === 'ALL'"
        v-for="item in filteredCategories"
        :key="item.name"
        class="flex flex-col sm:w-[20%] w-[80%] text-center cursor-pointer  hover:scale-[102%]"
      >
        <div
          @click="handleFilterClick(item.name)"
          class="p-3 rounded-full border-2"
        >
          <img
            :src="item.image"
            alt="category image"
            class="rounded-full w-[100%] h-fit object-cover mx-auto"
          />
        </div>
        <p class="mt-2 text-lg font-bold text-indigo-950">{{ item.name }}</p>
      </div>
    </div>

    <!-- Product Cards -->

    <div v-if="products.length > 0" class="flex flex-row flex-wrap gap-3 justify-center my-4 pb-5 ">
      <div
        v-for="(product, index) in products"
        :key="product._id"
        class="flex flex-col w-[350px] pb-5 rounded-xl border-2 gap-4 hover:shadow-md hover:scale-[102%]"
        @click="navigateToProductDetail(product._id)"
      >
        <img
          :src="product.image"
          alt="Bouquet"
          class="rounded-t-xl w-full h-fit object-cover p-5"
        />
        <div class="flex flex-row sn:flex-col justify-between items-center  px-5">
          <p class="text-indigo-950 font-bold text-sm">{{ product.title }}</p>
        <div class="flex justify-end items-center text-indigo-950 text-lg ">
          <div class="flex text-yellow-500">
            <span v-for="n in Math.floor(product.averageRating)" :key="n">★</span>
            <span v-for="n in 5 - Math.floor(product.averageRating)" :key="n">☆</span>
          </div>
        </div>
        </div>
        <div class="flex flex-row justify-between px-5">
          <p class="text-indigo-950 text-md font-bold">
            Price : {{ product.price }} LE
          </p>
          <div class="flex gap-4">
            <button @click="toggleFavorite(product)">
              <img
                :src="product.isFavorite ? fillHeart : heart"
                class="w-6 h-6"
              />
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
