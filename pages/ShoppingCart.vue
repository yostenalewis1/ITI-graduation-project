<script setup>
import CartCard from "../components/cartCard.vue";

const cartItems = ref([]);
const loading = ref(false);
const error = ref(null);
const isEmpty = ref(false);

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
    error.value = "Error updating quantity";
    console.error("Error fetching cart data:", err);
  }
  loading.value = false;
};

onMounted(() => {
  fetchCart();
});

const updateQuantity = async (id, newQuantity) => {
  if (newQuantity < 1) {
    await deleteItem(id);
    return;
  }
  const item = cartItems.value.find((item) => item.product._id === id);
  if (item) {
    item.quantity = newQuantity;
  }
  try {
    const { status } = await useAsyncFetch("PUT", `/api/v1/cart/${id}`, {
      quantity: newQuantity,
    });
    if (status === "success") {
      cartItems.value;
      const item = cartItems.value.find((item) => item._id === id);
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
  try {
    const { status } = await useAsyncFetch("DELETE", `/api/v1/cart/${id}`);
    if (status === "success") {
      cartItems.value = cartItems.value.filter((item) => item._id !== id);
    }
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

const saveForLater = (id) => {
  console.log(`Save item ${id} for later`);
};
</script>

<template>
  <!-- Loading State -->
  <div class="flex items-center">
    <div
      v-if="loading"
      class="fixed inset-0 flex items-center justify-center z-50 bg-stone-300"
    >
      <div
        class="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-b-indigo-950-500"
      ></div>
    </div>

    <!-- Error State -->
    <div
      v-if="error"
      class="fixed inset-0 flex items-center justify-center z-50 bg-cyan-50 text-red-500"
    >
      <p>{{ error }}</p>
    </div>
    <!-- Empty State -->
    <div
      v-if="isEmpty && !loading && !error"
      class="fixed inset-0 flex items-center justify-center z-50 bg-cyan-50"
    >
      <p>Your cart is empty.</p>
    </div>
  </div>

  <div
    v-if="!loading && !error && !isEmpty"
    class="w-full top-28 relative flex flex-col-reverse md:flex-row gap-5 mb-40 px-10 justify-center items-stretch"
  >
    <div
      class="bg-[url('../assets/about-us-cover.png')] bg-cover bg-center w-full md:w-[75%] border-2 border-indigo-800 rounded-lg"
    >
      <div class="container">
        <div class="flex justify-between container px-10 items-center mt-3">
          <h1 class="text-indigo-950 text-2xl font-bold">Shopping Cart</h1>
          <div></div>
        </div>
        <hr
          class="border-t border-indigo-900 w-[90%] mx-auto mt-3 opacity-50"
        />
        <CartCard
          v-for="item in cartItems"
          :key="item.product._id"
          :id="item.product._id"
          :image="item.product.image"
          :title="item.product.title"
          :quantity="item.quantity"
          :price="item.price"
          :stock="item.product.stock"
          @update-quantity="updateQuantity"
          @delete-item="deleteItem"
          @save-for-later="saveForLater"
        />
        <div class="text-right p-3">
          <p class="text-xl md:text-2xl font-normal font-cairo text-indigo-950">
            Subtotal ({{ cartItems?.length }} item{{
              cartItems?.length > 1 ? "s" : ""
            }}) :
            <span class="font-bold"
              >{{
                cartItems?.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )
              }}
              EGP</span
            >
          </p>
        </div>
      </div>
    </div>

    <div
      class="bg-[url('../assets/about-us-cover.png')] bg-cover bg-center h-auto md:h-auto w-full md:w-[25%] rounded-lg text-center pt-5 flex flex-col justify-between gap-5 md:gap-0"
    >
      <div class="flex flex-col justify-center items-center gap-4">
        <h1 class="text-indigo-950 text-sm font-cairo">Total amount</h1>
        <p class="text-indigo-900 text-2xl font-bold font-cairo">
          {{
            cartItems?.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            ) + 20
          }}
          LE
        </p>
      </div>
      <hr class="border-t border-indigo-900 w-[90%] mx-auto opacity-50" />

      <h1 class="text-neutral-700 text-sm text-left pl-5 font-cairo">
        Order summary
      </h1>

      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex flex-row justify-between px-5"
      >
        <p class="text-md text-black font-cairo">{{ item.title }}</p>
        <p class="text-md text-black font-cairo">
          {{ item.price * item.quantity }} EGP
        </p>
      </div>
      <hr class="border-t border-indigo-900 w-[90%] mx-auto opacity-50" />

      <div class="flex flex-row justify-between px-5">
        <p class="text-md text-black font-cairo">Subtotal</p>
        <p class="text-md text-black font-cairo">
          {{
            cartItems?.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )
          }}
          EGP
        </p>
      </div>
      <hr class="border-t border-indigo-900 w-[90%] mx-auto opacity-50" />

      <div class="flex flex-row justify-between px-5">
        <p class="text-md text-black font-cairo">Shipping</p>
        <p class="text-md text-black font-cairo">20.00 LE</p>
      </div>

      <hr class="border-t border-indigo-900 w-[90%] mx-auto opacity-50" />

      <div class="flex flex-row justify-between px-5">
        <p class="text-indigo-900 text-xl font-bold font-cairo">Total</p>
        <p class="text-indigo-950 text-xl font-cairo">
          {{
            cartItems?.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            ) + 20
          }}
          EGP
        </p>
      </div>

      <NuxtLink to="/CheckoutPage">
        <button
          class="bg-violet-950 w-[90%] mx-auto h-[50px] rounded-lg text-white font-bold font-cairo mb-5 items-center text-center"
        >
          Proceed to buy
        </button>
      </NuxtLink>
    </div>
  </div>
</template>
