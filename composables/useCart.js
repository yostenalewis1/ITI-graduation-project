export function useCart() {
  const cartItems = ref([]);
  const isEmpty = ref(true);
  const loading = ref(false);
  const error = ref(null);
  const loadproduct = ref(false);

  const fetchCart = async () => {
    loading.value = true;
    try {
      const { data, status } = await useAsyncFetch("GET", "/api/v1/cart");
      if (status === "success") {
        cartItems.value = data.cart.products;
        isEmpty.value = cartItems.value.length === 0;
      } else {
        error.value = "Failed to fetch cart data";
      }
    } catch (err) {
      error.value = "Error fetching cart data";
      console.error("Error fetching cart data:", err);
    }
    loading.value = false;
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) {
      await deleteItem(id);
      return;
    }
    try {
      const { status } = await useAsyncFetch("PUT", `/api/v1/cart/${id}`, {
        quantity: newQuantity,
      });
      if (status === "success") {
        const item = cartItems.value.find((item) => item.product._id === id);
        if (item) {
          item.quantity = newQuantity;
        }
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const deleteItem = async (id) => {
    cartItems.value = cartItems.value.filter((item) => item.product._id !== id);
    isEmpty.value = cartItems.value.length === 0;

    try {
      const { status } = await useAsyncFetch("DELETE", `/api/v1/cart/${id}`);
      if (status !== "success") {
        error.value = "Failed to delete item";
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const clearCart = async () => {
    try {
      const { status } = await useAsyncFetch("DELETE", "/api/v1/cart");
      if (status === "success") {
        cartItems.value = [];
        isEmpty.value = true;
      } else {
        error.value = "Failed to clear the cart";
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      error.value = "Error clearing cart";
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    loadproduct.value = true;

    try {
      const { data, status, message } = await useAsyncFetch(
        "POST",
        "/api/v1/cart",
        { product: productId, quantity: quantity }
      );

      if (status === "success") {
        useToastify.success("Product successfully added to cart", {
          autoClose: 1000,
          position: ToastifyOption.POSITION.BOTTOM_RIGHT,
          type: ToastifyOption.TYPE.SUCCESS,
        });
        console.log("Item added to cart successfully:", data);
      } else {
        throw new Error(message || "Failed to add product to cart.");
      }
    } catch (err) {
      useToastify.error(err.message, {
        autoClose: 3000,
        position: ToastifyOption.POSITION.BOTTOM_RIGHT,
        type: ToastifyOption.TYPE.ERROR,
      });
      console.error("Failed to add item to cart:", err.message);
    }
    loadproduct.value = false;
  };

  return {
    cartItems,
    isEmpty,
    loading,
    error,
    loadproduct,
    fetchCart,
    updateQuantity,
    deleteItem,
    clearCart,
    addToCart
  };
}