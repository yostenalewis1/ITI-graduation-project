<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import signup from '~/pages/Signup.vue';
import login from '~/pages/Login.vue';

const router = useRouter();
const route = useRoute();

const showSignUp = ref(false);
const showLogin = ref(false);

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

watch([showSignUp, showLogin], ([signup, login]) => {
  document.body.style.overflow = (signup || login) ? 'hidden' : 'auto';
});
 
</script>
  

<template>
<header 
    class="absolute w-full bg-transparent text-white px-10 py-4 z-50">    
  
  <div class="container mx-auto flex justify-between items-center text-indigo-950"    :class="{ 'text-white': route.path === '/' }" >
      <div to="/" class="text-2xl font-bold text-white">
        <img src="~/assets/Logo.png" alt="logo" />
      </div>
      <nav class="flex gap-[20px]">
        <nuxt-link to="/" class="text-xl font-bold text-center font-cairo ">Home</nuxt-link>
        <nuxt-link to="/" class="w-28 text-center text-xl font-normal font-cairo ">Product</nuxt-link>
        <nuxt-link to="/" class="w-28 text-center text-xl font-normal font-cairo ">Category</nuxt-link>
        <nuxt-link to="/" class="w-28 text-center text-xl font-normal font-cairo ">About</nuxt-link>
        <nuxt-link to="/ContactUs" class="w-40 text-center text-xl font-normal font-cairo ">Contact-Us</nuxt-link>
      </nav>



      <!-- <div class="w-40 inline-flex justify-between items-end">
                <nuxt-link class="w-6 h-6 "><img src="~/assets/Vector.svg"></nuxt-link>
                <nuxt-link class="w-6 h-6 "><img src="~/assets/Vector (1).svg"></nuxt-link>
                <nuxt-link class="w-6 h-6 "><img src="~/assets/Vector (3).svg"></nuxt-link>
                <nuxt-link to="/login" class="w-6 h-6 "><img src="~/assets/Vector (4).svg"></nuxt-link>
             </div> -->


      <div class="w-auto flex justify-between items-center">
        <button @click="switchToSignup" class="border rounded-xl p-2 px-3 ml-2 bg-white text-indigo-950">Signup</button>
        <button @click="switchToLogin" class="border rounded-xl p-2 ml-2 px-3 ">Login</button>
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