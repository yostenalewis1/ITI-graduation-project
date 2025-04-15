import { ref } from 'vue';
import { useAsyncFetch } from '../composables/useAsyncFetch';

export function useWishlist() {
  const favoriteProducts = ref([]);
  const favoriteIds = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchFavorites = async () => {
    loading.value = true;
    error.value = null;

    try {
      const { data, status } = await useAsyncFetch("GET", "/api/v1/wishList");
        
      if (status === "success" ) {
        favoriteProducts.value = data.wishList;
        console.log(data.wishList);
        if(favoriteProducts.value.length!==0){

            favoriteIds.value = data.wishList.map(item => item.id);
        }
      } else {
        throw new Error(data?.message || "Failed to fetch favorites.");
      }
    } catch (err) {
      error.value = err.message || "An error occurred while fetching favorites.";
      console.error("Failed to fetch favorite IDs:", err);
    } finally {
      loading.value = false;
    }
    
  };

  const removeFromFavorites = async (productId) => {
    try {
      const { status, message } = await useAsyncFetch("DELETE", `/api/v1/wishlist/${productId}`);

      if (status === "success") {
        favoriteProducts.value = favoriteProducts.value.filter(product => product._id !== productId);
        favoriteIds.value = favoriteIds.value.filter(id => id !== productId);
        useToastify.success("Product removed from favorites", {
          autoClose: 1000,
          position: ToastifyOption.POSITION.BOTTOM_RIGHT,
          type: ToastifyOption.TYPE.SUCCESS,
        });
      } else {
        throw new Error(message || "Failed to remove product from favorites.");
      }
    } catch (err) {
      useToastify.error(err.message, {
        autoClose: 3000,
        position: ToastifyOption.POSITION.BOTTOM_RIGHT,
        type: ToastifyOption.TYPE.ERROR,
      });
      console.error("Failed to remove item from wishlist:", err.message);
    }
  };

  const addToFavorites = async (product) => {
    
    try {
      const { status, message } = await useAsyncFetch(
        "POST",
        `/api/v1/wishList`,
        { productId: product._id }
      );

      if (status === "success") {
        
        favoriteProducts.value.push(product);
        favoriteIds.value.push(product._id);
        console.log(favoriteIds);
        
        
        
        useToastify.success("Product successfully added to wishlist", {
          autoClose: 1000,
          position: ToastifyOption.POSITION.BOTTOM_RIGHT,
          type: ToastifyOption.TYPE.SUCCESS,
        });
      } else {
        throw new Error(message || "Failed to add product to wishlist.");
      }
    } catch (err) {
      useToastify.error(err.message, {
        autoClose: 3000,
        position: ToastifyOption.POSITION.BOTTOM_RIGHT,
        type: ToastifyOption.TYPE.ERROR,
      });
      console.error("Failed to add item to wishlist:", err.message);
    }
  };

  return {
    favoriteProducts,
    loading,
    error,
    favoriteIds,
    addToFavorites,
    fetchFavorites,
    removeFromFavorites
  };
}