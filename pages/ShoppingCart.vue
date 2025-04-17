<script setup>
import { ref, onMounted } from 'vue';
import CartCard from "../components/cartCard.vue";
import { useCart } from '../composables/useCart.js';
import { useAsyncFetch } from '../composables/useAsyncFetch.js'; // Adjust the import path
import { useWishlist } from '../composables/useWishlist.js';

const { loading, error, isEmpty, cartItems, cartData, fetchCart, deleteItem, clearCart ,updateQuantity} = useCart();
const { addToFavorites } = useWishlist();
const couponCode = ref('');

const applyCoupon = async () => {
  try {
    const { data: couponData, status: couponStatus } = await useAsyncFetch('POST', '/api/v1/cart/applyCoupon', { code: couponCode.value });
    if (couponStatus === 'success') {
      couponCode.value = '';
      // Assuming the API returns updated cart data with the discount applied
      // cartData.value = couponData.cart;
    } else {
      throw new Error('Failed to apply coupon');
    }
  } catch (err) {
    alert('Error applying coupon: ' + err.message);
  }
};

onMounted(async () => {
  console.log("Before fetchCart, cartData:", cartData);
  await fetchCart();
  console.log("After fetchCart, cartData:", cartData);});

const saveForLater = (product) => {
  addToFavorites(product);
  deleteItem(product._id);
  console.log(`Save item ${product.id} for later`);
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

  <!-- Error State -->
  <div
    v-if="error"
    class="w-full top-28 relative flex flex-col-reverse md:flex-row gap-5 mb-40 px-10 justify-center items-stretch text-red-500"
  >
    <ErrorMessage />
  </div>

  <!-- Main Content -->
  <div
    v-if="!loading && !error"
    class="w-full top-28 relative flex flex-col-reverse md:flex-row gap-5 mb-40 px-10 justify-center items-start"
  >
    <!-- Cart Items Section -->
    <div
      :class="[
        'bg-[url(\'../assets/about-us-cover.png\')] bg-cover bg-center border-2 border-indigo-800 rounded-lg',
        isEmpty ? 'w-full md:w-[50%]' : 'w-full md:w-[75%]',
      ]"
    >
      <div class="container">
        <div class="flex justify-between container px-10 items-center mt-3">
          <h1 class="text-indigo-950 text-2xl font-bold">Shopping Cart</h1>
        </div>
        <hr class="border-t border-indigo-900 w-[90%] mx-auto mt-3 opacity-50" />

        <div v-if="!isEmpty">
          <CartCard
            v-for="item in cartItems"
            :key="item._id"
            :id="item.product._id"
            :image="item.product.image"
            :title="item.product.title"
            :quantity="item.quantity"
            :price="item.price"
            :stock="item.product.stock"
            :product="item.product"
            @update-quantity="updateQuantity"
            @delete-item="deleteItem"
            @save-for-later="saveForLater"
          />
          <div class="text-right p-3">
            <p class="text-xl md:text-2xl font-normal font-cairo text-indigo-950">
              Subtotal ({{ cartItems.length }} item{{ cartItems.length > 1 ? "s" : "" }}) :
              <span class="font-bold">
                {{
        cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ) 
      }} EGP
              </span>
            </p>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="container px-3 mx-auto my-2 w-[90%] text-center">
          <img src="~/assets/empty-cart.svg" alt="No items" class="empty-image mx-auto" />
          <p class="text-indigo-950 text-2xl">Your cart is empty.</p>
          <NuxtLink to="/product">
            <button class="bg-violet-950 mx-auto py-2 px-6 rounded-lg text-white font-bold font-cairo my-5 items-center text-center">
              Order now
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Order Summary Section -->
    <div
      v-if="!isEmpty"
      class="bg-[url('../assets/about-us-cover.png')] bg-cover bg-center h-auto md:h-auto w-full md:w-[25%] rounded-lg text-center pt-5 flex flex-col justify-around gap-5"
    >
      <div class="flex flex-col justify-center items-center gap-4">
        <h1 class="text-indigo-950 text-lg font-cairo">Order Summary</h1>
        
        <!-- Coupon Code Section -->
        <div class="lg:relative md:static flex flex-col  lg:flex-row  w-[90%] mx-auto justify-center items-center gap-2">
          <input type="text" v-model="couponCode" placeholder="Enter coupon code" class="pl-1 pr-7 w-[100%] h-10 border-2 border-indigo-900 rounded px-2   focus:outline-none text-indigo-950 bg-white">
          <button @click="applyCoupon" class="lg:absolute md:static right-0 w-40 h-10 bg-violet-950 text-white rounded hover:bg-[#361857]">Apply</button>
        </div>
      </div>
      <hr class="border-t border-indigo-900 w-[90%] mx-auto opacity-50" />

      <h1 class="text-neutral-700 text-sm text-left pl-5 font-cairo">
        Items
      </h1>

      <div
        v-for="item in cartItems"
        :key="item._id"
        class="flex flex-row justify-between px-5"
      >
        <p class="text-md text-black font-cairo">{{ item.product.title }}</p>
        <p class="text-md text-black font-cairo">
          {{ item.price * item.quantity }} EGP
        </p>
      </div>
      <hr class="border-t border-indigo-900 w-[90%] mx-auto opacity-50" />

      <div class="flex flex-row justify-between px-5">
        <p class="text-md text-black font-cairo">Subtotal</p>
        <p class="text-md text-black font-cairo">
          {{
            cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            ) 
          }} EGP
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
        ((
          cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ) 
        ) * (1 - (cartData.discount || 0) / 100) )+20
      }} EGP
        </p>
      </div>

      <div>
        <NuxtLink to="/CheckoutPage">
          <button
            class="bg-violet-950 w-[90%] mx-auto h-[50px] rounded-lg text-white font-bold font-cairo mb-2 items-center text-center"
          >
            Proceed to buy
          </button>
        </NuxtLink>
        <button 
          v-if="!isEmpty"
          @click="clearCart"
          class="bg-red-500 hover:bg-red-600 w-[80%] mx-auto h-[30px] rounded-lg text-white font-bold font-cairo mb-5 items-center text-center"
        >
          Clear Cart
        </button>
      </div>
    </div>
  </div>
</template>