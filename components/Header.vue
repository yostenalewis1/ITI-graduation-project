<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import signup from '~/pages/Signup.vue';
import login from '~/pages/Login.vue';

const router = useRouter();
const route = useRoute();

const showSignUp = ref(false);
const showLogin = ref(false);
const showMenu = ref(false); 

const closeModel = () => {
  showSignUp.value = false;
  showLogin.value = false;
  router.replace({ query: {} });  
};

const switchToLogin = () => {
  showSignUp.value = false;
  showLogin.value = true;
  router.push({ query: { auth: 'login' } }); 
};

const switchToSignup = () => {
  showLogin.value = false;
  showSignUp.value = true;
  router.push({ query: { auth: 'signup' } });  
};

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

watch([showSignUp, showLogin], ([signup, login]) => {
  document.body.style.overflow = (signup || login) ? 'hidden' : 'auto';
});
</script>

<template>
  <header class="absolute w-full bg-transparent text-white px-10 py-4 z-50">
    <div class="container mx-auto flex justify-between items-center text-indigo-950"
         :class="{ 'text-white': route.path === '/' }">
      <div to="/" class="text-2xl font-bold text-white">
        <img src="~/assets/Logo.png" alt="logo" />
      </div>

      
      <button class="sm:hidden focus:outline-none" @click="toggleMenu">
        <img src="../assets/burger-bar.png" alt="burger-bar" class="w-8 h-8 invert" />
      </button>

      <div v-if="showMenu" class="absolute top-16 left-0 w-full bg-white text-indigo-950 p-5 flex flex-col items-center gap-4 md:hidden">
        <nuxt-link @click="toggleMenu" to="/" class="text-xl font-bold text-center font-cairo">Home</nuxt-link>
        <nuxt-link  @click="toggleMenu" to="/" class="w-28 text-center text-xl font-normal font-cairo">Product</nuxt-link>
        <nuxt-link @click="toggleMenu" to="/" class="w-28 text-center text-xl font-normal font-cairo">Category</nuxt-link>
        <nuxt-link @click="toggleMenu" to="/" class="w-28 text-center text-xl font-normal font-cairo">About</nuxt-link>
        <nuxt-link  @click="toggleMenu" to="/ContactUs" class="w-40 text-center text-xl font-normal font-cairo">Contact-Us</nuxt-link>
        <button @click="switchToSignup(); toggleMenu()" class="border rounded-xl p-2 px-3 ml-2 bg-white text-indigo-950">Signup</button>
        <button @click="switchToLogin(); toggleMenu()" class="border rounded-xl p-2 ml-2 px-3">Login</button>
      </div>

      <nav class="hidden md:flex gap-[20px]">
        <nuxt-link to="/" class="text-xl font-bold text-center font-cairo">Home</nuxt-link>
        <nuxt-link to="/" class="w-28 text-center text-xl font-normal font-cairo">Product</nuxt-link>
        <nuxt-link to="/" class="w-28 text-center text-xl font-normal font-cairo">Category</nuxt-link>
        <nuxt-link to="/" class="w-28 text-center text-xl font-normal font-cairo">About</nuxt-link>
        <nuxt-link to="/ContactUs" class="w-40 text-center text-xl font-normal font-cairo">Contact-Us</nuxt-link>
      </nav>

      <div class="w-auto hidden md:flex justify-between items-center">
        <button @click="switchToSignup" class="border rounded-xl p-2 px-3 ml-2 bg-white text-indigo-950">Signup</button>
        <button @click="switchToLogin" class="border rounded-xl p-2 ml-2 px-3">Login</button>
      </div>
    </div>

    <div v-if="showSignUp" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <signup @close="closeModel" @switch-to-login="switchToLogin" />
    </div>

    <div v-if="showLogin" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <login @close="closeModel" @switch-to-signup="switchToSignup" />
    </div>
  </header>
</template>
