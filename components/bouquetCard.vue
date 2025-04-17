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
const searchTerm = ref('');
const sortOption = ref('all');
const searchLoading=ref(false)

const {
  isEmpty,
  loading,
  error,
  addToCart
} = useCart();

const { addToFavorites, favoriteIds, fetchFavorites, removeFromFavorites } = useWishlist();

const previousSearchTerm = ref('');

const getProducts = async () => {
  const isSearchOperation = searchTerm.value !== previousSearchTerm.value;
  const isSortOperation = sortOption.value !== 'all' && !isSearchOperation;

  if (isSearchOperation) {
    searchLoading.value = true; 
  } else if (isSortOperation) {
    searchLoading.value = true; 
  } else {
    loading.value = true; 
  }

  error.value = null;
  isEmpty.value = false;

  try {
    const queryParams = new URLSearchParams({
      page: page.value,
      limit: limit.value,
      sort: sortOption.value !== 'all' ? sortOption.value : '',
      search: searchTerm.value || ""
    });

    const { data, status, message, resError } = await useAsyncFetch(
      "GET",
      `/api/v1/products/all/?${queryParams.toString()}`
    );

    if (status === "success") {
      products.value = data.products.map((product) => {
        const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = product.reviews.length !== 0 ? (totalRating / product.reviews.length).toFixed(1) : product.rateAvrage;

        return {
          ...product,
          isFavorite: favoriteIds.value.includes(product._id),
          averageRating
        };
      });

      totalPages.value = Math.ceil(data.total / limit.value);
      isEmpty.value = products.value.length === 0;
    } else {
      console.log(resError);
      error.value = message || "Failed to fetch products.";
    }
  } catch (err) {
    console.log(err.message || "An error occurred while fetching products.");
  } finally {
    if (isSearchOperation) {
      searchLoading.value = false; 
    } else if(isSortOperation) {
      searchLoading.value = false; 
    }else{
      loading.value=false
    }
    previousSearchTerm.value = searchTerm.value; 
  }
};

onMounted(async () => {
  loading.value = true;
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
watch([page, searchTerm, sortOption], () => {
  loading.value=false
  getProducts();
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
    <div v-if="error && !isEmpty && !loading">
      <ErrorMessageIndicator :message="error" />
    </div>

    <div v-if="isEmpty && !loading">
      <EmptyIndicator />
    </div>

    <div v-else>
      <div class="w-[70%] mx-auto my-6 flex gap-3 flex-col sm:flex-row">
        <select
          v-model="sortOption"
          class="sm:w-1/2 pl-1 pr-7 h-10 border-2 border-indigo-900 rounded px-2 focus:outline-none text-indigo-950 bg-white"
        >
          <option value="all">All</option>
          <option value="title">Name</option>
          <option value="price">Price</option>
        </select>
        <div class="relative sm:w-1/2">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="search"
            
            v-model="searchTerm"
            placeholder="Search By Name"
            class="w-full ps-10 pr-7 h-10 border-2 border-indigo-900 rounded px-2 focus:outline-none text-indigo-950 bg-white"
        
          />
        </div>
      </div>
      <div v-if="searchLoading" class="flex justify-center items-center  h-80">
        <LoadingIndicator/>
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
          <div class="flex flex-row sn:flex-col justify-between items-center">
            <p class="text-indigo-950 font-bold text-sm pl-5">{{ product.title }}</p>
            <div class="flex justify-end items-center text-indigo-950 text-lg">
              <div class="flex text-yellow-500">
                <span v-for="n in Math.floor(product.rateAvrage)" :key="n">★</span>
                <span v-for="n in 5 - Math.floor(product.rateAvrage)" :key="n">☆</span>
              </div>
            </div>
          </div>
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
              <div>
                <button @click.stop="addToCart(product._id)">
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