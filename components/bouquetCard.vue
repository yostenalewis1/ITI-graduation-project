<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import heart from "../assets/Vector (1).svg";
import fillHeart from "../assets/Fill-heart.svg";
import { useCart } from '../composables/useCart'; 
import { useWishlist } from '../composables/useWishlist'; 

const router = useRouter();
const products = ref([]);
const page = ref(1);
const limit = ref(8);
const totalPages = ref(0);

const {
  isEmpty,
  loadproduct,
  loading,
  error,
  addToCart
} = useCart();

const { addToFavorites,favoriteIds,fetchFavorites, removeFromFavorites } = useWishlist();


const getProducts = async () => {
  loading.value = true;
  error.value = null;
  isEmpty.value = false;

  try {
    const { data, status, message } = await useAsyncFetch(
      "GET",
      `/api/v1/products/all/?page=${page.value}&limit=${limit.value}`
    );

    if (status === "success") {
      console.log(favoriteIds);
      
      products.value = data.products.map((product) => ({
        ...product,
        isFavorite: favoriteIds.value.includes(product._id),
      }));
      totalPages.value = Math.ceil(data.total / limit.value);
      isEmpty.value = products.value.length === 0;
    } else {
      error.value = message || "Failed to fetch products.";
    }
  } catch (err) {
    error.value = err.message || "An error occurred while fetching products.";
  }
  loading.value = false;
};


onMounted(async () => {
  loading.value=true
  await fetchFavorites();
  getProducts();
});

const navigateToProductDetail = (productId) => {
  console.log('Navigating to product:', productId); 
  router.push({
    path: `/product-detail/${productId}`
  });
}

const toggleFavorite = async (product) => {
  if (product.isFavorite) {
    await removeFromFavorites(product);
    product.isFavorite = false;
  } else {
    await addToFavorites(product);
    product.isFavorite = true;
  }
};

watch(page, () => {
  getProducts();
   fetchFavorites();

});

const goToPage = (pageNumber) => {
  if (pageNumber >= 1 && pageNumber <= totalPages.value) {
    page.value = pageNumber;
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
  }
};
</script>

<template>
  <!-- Loading State -->
  <div
    v-if="loading"
    class="fixed inset-0 flex items-center justify-center z-50 bg-stone-300"
  >
    <LoadingIndicator />
  </div>
  <div>

    <div v-if="error &&!isEmpty && !loading">
      <ErrorMessageIndicator :message="error" />
    </div>

    <div v-if="isEmpty && !loading">
      <EmptyIndicator />
    </div>

    <div v-else class="flex flex-row flex-wrap gap-3 justify-center items-center">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="flex flex-col w-[350px] p-5 rounded-xl border-2 gap-4 hover:shadow-md hover:scale-[102%]"
        @click="navigateToProductDetail(product._id)"
      >
        <img
          :src="product.image"
          alt="Bouquet"
          class="rounded-3xl w-full h-fit object-cover"
        />
        <p class="text-indigo-950 text-sm pl-5">{{ product.title }}</p>
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
            <button @click.stop="toggleFavorite(product)">
              <img
                :src="product.isFavorite ? fillHeart : heart"
                class="w-6 h-6 hover:scale-[102%]"
              />
            </button>
            <div v-if="loadproduct">
              <Loading/>
            </div>

            <button v-else @click.stop="addToCart(product._id)">
              <img
                src="../assets/Vector (3).svg"
                class="w-6 h-6 hover:scale-[103%]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="flex justify-center mt-5">
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="px-4 py-2 bg-violet-950 text-white rounded-s hover:bg-violet-800 disabled:opacity-50"
      >
        &lt;
      </button>
      <button
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        @click="goToPage(pageNumber)"
        :class="[
          'px-4 py-2 ',
          pageNumber === page
            ? 'bg-violet-950 text-white'
            : 'bg-violet-900 text-white hover:bg-violet-800',
        ]"
      >
        {{ pageNumber }}
      </button>
      <button
        @click="nextPage"
        :disabled="page === totalPages"
        class="px-4 py-2 bg-violet-950 text-white rounded-e hover:bg-violet-800 disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  </div>
</template>