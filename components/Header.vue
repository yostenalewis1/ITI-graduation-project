<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import signup from '~/pages/Signup.vue';
import login from '~/pages/Login.vue';
import whiteLogo from '@/assets/logo-w-white.svg';
import coloredLogo from '@/assets/logo-w.svg';

const router = useRouter();
const route = useRoute();

const { isLoggedIn } = useAuth();

const showSignUp = ref(false);
const showLogin = ref(false);
const showForgetPassword=ref(false)
const showMenu = ref(false);

//login state
// const isLoggedIn = ref(false); 

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

//login
const onLoginSuccess = () => {
  isLoggedIn.value = true;
  showLogin.value = false;
};

const logout = () => {
  isLoggedIn.value = false;
  if (typeof window !== 'undefined') {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  }
   const token = useCookie('token');
   token.value = null; 

  showLogin.value = false;
  showSignUp.value = false;
  router.push('/');
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token");
    if (token) {
      isLoggedIn.value = true;
    }
  }
});

watchEffect(() => {
  if (isLoggedIn.value) {
    closeModel();
  } else if (route.query.auth === 'login') {
    showLogin.value = true;
    showSignUp.value = false;
  } else if (route.query.auth === 'signup') {
    showSignUp.value = true;
    showLogin.value = false;
  } else if (route.query.auth === 'forgetPassword') {
    showForgetPassword.value = true;
  }
});

watch([showSignUp, showLogin, showForgetPassword], ([signup, login, forgetPassword]) => {
  document.body.style.overflow = (signup || login || forgetPassword) ? 'hidden' : 'auto';
});
</script>


<template>
  <header class="absolute w-full bg-transparent text-white px-5 lg:px-10 z-50">
    <div class="container mx-auto flex justify-between items-center text-indigo-950">
      <div class="text-2xl font-bold text-white">
        <img :src="coloredLogo" alt="logo" class="w-[85px] h-[85px]" />
      </div>

      <button class="md:hidden focus:outline-none" @click="toggleMenu">
        <img src="../assets/burger-bar.png" alt="burger-bar" class="w-8 h-8" />
      </button>

      <!-- Mobile View -->
      <div v-if="showMenu" class="absolute top-16 left-0 w-full bg-indigo-950 text-white p-5 flex flex-col items-center gap-4 md:hidden z-90">
        <nuxt-link @click="toggleMenu" to="/" class="text-xl  text-center font-cairo" exact-active-class="active-link">Home</nuxt-link>
        <nuxt-link @click="toggleMenu" to="/product" class="w-28 text-center text-xl font-normal font-cairo" exact-active-class="active-link">Product</nuxt-link>
        <nuxt-link @click="toggleMenu" to="/category" class="w-28 text-center text-xl font-normal font-cairo" exact-active-class="active-link">Category</nuxt-link>
        <nuxt-link @click="toggleMenu" to="/About" class="w-28 text-center text-xl font-normal font-cairo" exact-active-class="active-link">About</nuxt-link>
        <nuxt-link @click="toggleMenu" to="/ContactUs" class="w-40 text-center text-xl font-normal font-cairo" exact-active-class="active-link">Contact-Us</nuxt-link>
        <template v-if="!isLoggedIn">
          <button @click="switchToSignup(); toggleMenu()" class=" rounded-xl p-2 px-3 ml-2 text-white bg-indigo-950">Signup</button>
          <button @click="switchToLogin(); toggleMenu()" class="border border-indigo-950 rounded-xl p-2 ml-2 px-3">Login</button>
        </template>
        <template v-else>
          <div class="w-40 inline-flex justify-evenly items-end">
            <nuxt-link to="/Favorites" class=" " exact-active-class="aactive-icon">
              <svg class="text-white" width="26" height="26" viewBox="0 0 31 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M15.5 31.9116L13.2525 29.7154C10.6433 27.1532 8.48625 24.943 6.78125 23.0846C5.07625 21.2263 3.72 19.5578 2.7125 18.079C1.705 16.6003 1.0013 15.242 0.6014 14.0043C0.2015 12.7665 0.00103333 11.4995 0 10.2032C0 7.55649 0.81375 5.34623 2.44125 3.57238C4.06875 1.79854 6.09667 0.911621 8.525 0.911621C9.86833 0.911621 11.1471 1.22134 12.3612 1.84078C13.5754 2.46021 14.6217 3.33306 15.5 4.4593C16.3783 3.33306 17.4246 2.46021 18.6387 1.84078C19.8529 1.22134 21.1317 0.911621 22.475 0.911621C24.9033 0.911621 26.9312 1.79854 28.5587 3.57238C30.1862 5.34623 31 7.55649 31 10.2032C31 11.4984 30.8001 12.7654 30.4002 14.0043C30.0002 15.2431 29.296 16.6014 28.2875 18.079C27.279 19.5567 25.9227 21.2252 24.2188 23.0846C22.5148 24.9441 20.3577 27.1543 17.7475 29.7154L15.5 31.9116ZM15.5 27.3503C17.98 24.9289 20.0208 22.8526 21.6225 21.1216C23.2242 19.3905 24.49 17.8842 25.42 16.6025C26.35 15.3208 26.9958 14.18 27.3575 13.1798C27.7192 12.1797 27.9 11.1875 27.9 10.2032C27.9 8.5138 27.3833 7.10599 26.35 5.97974C25.3167 4.85349 24.025 4.29037 22.475 4.29037C21.2608 4.29037 20.1371 4.66316 19.1037 5.40873C18.0704 6.15431 17.36 7.10486 16.9725 8.26039H14.0275C13.64 7.10599 12.9296 6.156 11.8962 5.41042C10.8629 4.66485 9.73917 4.29149 8.525 4.29037C6.975 4.29037 5.68333 4.85349 4.65 5.97974C3.61667 7.10599 3.1 8.5138 3.1 10.2032C3.1 11.1886 3.28083 12.1814 3.6425 13.1815C4.00417 14.1816 4.65 15.322 5.58 16.6025C6.51 17.8831 7.77583 19.3894 9.3775 21.1216C10.9792 22.8538 13.02 24.93 15.5 27.3503Z" />
              </svg>
            </nuxt-link>

            <nuxt-link to="/ShoppingCart" class=" " exact-active-class="aactive-icon">
              <svg class="text-white" width="26" height="26" viewBox="0 0 31 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M24.8 25.7116C25.6222 25.7116 26.4107 26.0382 26.992 26.6196C27.5734 27.201 27.9 27.9894 27.9 28.8116C27.9 29.6338 27.5734 30.4223 26.992 31.0037C26.4107 31.585 25.6222 31.9116 24.8 31.9116C23.9778 31.9116 23.1893 31.585 22.608 31.0037C22.0266 30.4223 21.7 29.6338 21.7 28.8116C21.7 27.0911 23.0795 25.7116 24.8 25.7116ZM0 0.911621H5.0685L6.5255 4.01162H29.45C29.8611 4.01162 30.2553 4.17492 30.546 4.46561C30.8367 4.75629 31 5.15054 31 5.56162C31 5.82512 30.9225 6.08862 30.814 6.33662L25.265 16.3651C24.738 17.3106 23.715 17.9616 22.5525 17.9616H11.005L9.61 20.4881L9.5635 20.6741C9.5635 20.7769 9.60433 20.8755 9.677 20.9481C9.74967 21.0208 9.84823 21.0616 9.951 21.0616H27.9V24.1616H9.3C8.47783 24.1616 7.68933 23.835 7.10797 23.2537C6.52661 22.6723 6.2 21.8838 6.2 21.0616C6.2 20.5191 6.3395 20.0076 6.572 19.5736L8.68 15.7761L3.1 4.01162H0V0.911621ZM9.3 25.7116C10.1222 25.7116 10.9107 26.0382 11.492 26.6196C12.0734 27.201 12.4 27.9894 12.4 28.8116C12.4 29.6338 12.0734 30.4223 11.492 31.0037C10.9107 31.585 10.1222 31.9116 9.3 31.9116C8.47783 31.9116 7.68933 31.585 7.10797 31.0037C6.52661 30.4223 6.2 29.6338 6.2 28.8116C6.2 27.0911 7.5795 25.7116 9.3 25.7116ZM23.25 14.8616L27.559 7.11162H7.967L11.625 14.8616H23.25Z" />
              </svg>
            </nuxt-link>

            <nuxt-link to="/profile" exact-active-class="aactive-icon">
              <svg class="text-white" width="28" height="26" viewBox="0 0 31 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M15.5 16.4116C13.3687 16.4116 11.5443 15.6528 10.0266 14.1351C8.50885 12.6173 7.75 10.7929 7.75 8.66162C7.75 6.53037 8.50885 4.70589 10.0266 3.18818C11.5443 1.67048 13.3687 0.911621 15.5 0.911621C17.6313 0.911621 19.4557 1.67048 20.9734 3.18818C22.4911 4.70589 23.25 6.53037 23.25 8.66162C23.25 10.7929 22.4911 12.6173 20.9734 14.1351C19.4557 15.6528 17.6313 16.4116 15.5 16.4116ZM0 31.9116V26.4866C0 25.3887 0.282875 24.3799 0.848625 23.4602C1.41438 22.5406 2.16483 21.8379 3.1 21.3522C5.10208 20.3512 7.13646 19.6007 9.20312 19.1009C11.2698 18.601 13.3687 18.3504 15.5 18.3491C17.6313 18.3478 19.7302 18.5984 21.7969 19.1009C23.8635 19.6033 25.8979 20.3538 27.9 21.3522C28.8365 21.8366 29.5876 22.5393 30.1533 23.4602C30.7191 24.3812 31.0013 25.39 31 26.4866V31.9116H0ZM3.875 28.0366H27.125V26.4866C27.125 26.1314 27.0365 25.8085 26.8596 25.5179C26.6826 25.2272 26.4482 25.0012 26.1562 24.8397C24.4125 23.9679 22.6526 23.3143 20.8766 22.879C19.1005 22.4437 17.3083 22.2254 15.5 22.2241C13.6917 22.2228 11.8995 22.4411 10.1234 22.879C8.3474 23.3169 6.5875 23.9705 4.84375 24.8397C4.55312 25.0012 4.31869 25.2272 4.14044 25.5179C3.96219 25.8085 3.87371 26.1314 3.875 26.4866V28.0366ZM15.5 12.5366C16.5656 12.5366 17.4782 12.1575 18.2377 11.3993C18.9972 10.6411 19.3763 9.72854 19.375 8.66162C19.3737 7.5947 18.9946 6.68279 18.2377 5.92587C17.4808 5.16895 16.5682 4.7892 15.5 4.78662C14.4318 4.78404 13.5199 5.16379 12.7643 5.92587C12.0086 6.68795 11.6289 7.59987 11.625 8.66162C11.6211 9.72337 12.0009 10.6359 12.7643 11.3993C13.5276 12.1627 14.4395 12.5418 15.5 12.5366Z"/>
              </svg>
            </nuxt-link>
          </div>
          <button @click="logout(); toggleMenu()" class="border rounded-xl p-2 ml-2 px-3 bg-red-500 text-white">Logout</button>
        </template>
      </div>

      <nav class="hidden md:flex gap-[20px]">
        <nuxt-link to="/" class="text-xl w-28 text-center font-cairo" exact-active-class="active-link">Home</nuxt-link>
        <nuxt-link to="/product" class="w-28 text-center text-xl font-normal font-cairo" exact-active-class="active-link">Product</nuxt-link>
        <nuxt-link to="/category" class="w-28 text-center text-xl font-normal font-cairo" exact-active-class="active-link">Category</nuxt-link>
        <nuxt-link to="/About" class="w-28 text-center text-xl font-normal font-cairo" exact-active-class="active-link">About</nuxt-link>
        <nuxt-link to="/ContactUs" class="w-40 text-center text-xl font-normal font-cairo" exact-active-class="active-link">Contact-Us</nuxt-link>
      </nav>

      <div class="w-auto hidden md:flex justify-between items-center">
        <template v-if="!isLoggedIn">
          <button @click="switchToSignup" class=" rounded-xl p-2 px-3 ml-2 text-white bg-indigo-950">Signup</button>
          <button @click="switchToLogin" class="border rounded-xl p-2 ml-2 px-3 text-indigo-950 border-indigo-950">Login</button>
        </template>

        <!-- After Login -->
        <template v-else @click="toggleMenu()">
          <div class="w-40 inline-flex justify-evenly items-end">
            <!-- <nuxt-link to="/" class=" " exact-active-class="aactive-icon">
              <svg class="text-indigo-950" width="26" height="26" viewBox="0 0 31 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M11.4651 23.8419C8.26079 23.8419 5.54913 22.7319 3.33019 20.5117C1.11124 18.2916 0.00117685 15.58 9.33264e-07 12.3768C-0.00117498 9.17358 1.10889 6.46193 3.33019 4.24181C5.55148 2.02168 8.26314 0.911621 11.4651 0.911621C14.6672 0.911621 17.3794 2.02168 19.6019 4.24181C21.8244 6.46193 22.9338 9.17358 22.9303 12.3768C22.9303 13.6703 22.7245 14.8903 22.3129 16.0368C21.9014 17.1833 21.3428 18.1975 20.6373 19.0795L30.5149 28.9571C30.8383 29.2805 31 29.6921 31 30.1918C31 30.6916 30.8383 31.1032 30.5149 31.4266C30.1916 31.7499 29.78 31.9116 29.2802 31.9116C28.7805 31.9116 28.3689 31.7499 28.0455 31.4266L18.1679 21.5489C17.2859 22.2544 16.2717 22.813 15.1252 23.2246C13.9787 23.6361 12.7587 23.8419 11.4651 23.8419ZM11.4651 20.3142C13.67 20.3142 15.5444 19.5428 17.0884 18C18.6323 16.4572 19.4037 14.5828 19.4026 12.3768C19.4014 10.1708 18.63 8.29694 17.0884 6.75532C15.5467 5.2137 13.6723 4.44171 11.4651 4.43936C9.25796 4.43701 7.38414 5.20899 5.8437 6.75532C4.30325 8.30164 3.53127 10.1755 3.52774 12.3768C3.52421 14.5781 4.2962 16.4525 5.8437 18C7.3912 19.5475 9.26502 20.3189 11.4651 20.3142Z" />
              </svg>
            </nuxt-link> -->

            <nuxt-link to="/Favorites" class=" " exact-active-class="aactive-icon">
              <svg class="text-indigo-950" width="26" height="26" viewBox="0 0 31 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M15.5 31.9116L13.2525 29.7154C10.6433 27.1532 8.48625 24.943 6.78125 23.0846C5.07625 21.2263 3.72 19.5578 2.7125 18.079C1.705 16.6003 1.0013 15.242 0.6014 14.0043C0.2015 12.7665 0.00103333 11.4995 0 10.2032C0 7.55649 0.81375 5.34623 2.44125 3.57238C4.06875 1.79854 6.09667 0.911621 8.525 0.911621C9.86833 0.911621 11.1471 1.22134 12.3612 1.84078C13.5754 2.46021 14.6217 3.33306 15.5 4.4593C16.3783 3.33306 17.4246 2.46021 18.6387 1.84078C19.8529 1.22134 21.1317 0.911621 22.475 0.911621C24.9033 0.911621 26.9312 1.79854 28.5587 3.57238C30.1862 5.34623 31 7.55649 31 10.2032C31 11.4984 30.8001 12.7654 30.4002 14.0043C30.0002 15.2431 29.296 16.6014 28.2875 18.079C27.279 19.5567 25.9227 21.2252 24.2188 23.0846C22.5148 24.9441 20.3577 27.1543 17.7475 29.7154L15.5 31.9116ZM15.5 27.3503C17.98 24.9289 20.0208 22.8526 21.6225 21.1216C23.2242 19.3905 24.49 17.8842 25.42 16.6025C26.35 15.3208 26.9958 14.18 27.3575 13.1798C27.7192 12.1797 27.9 11.1875 27.9 10.2032C27.9 8.5138 27.3833 7.10599 26.35 5.97974C25.3167 4.85349 24.025 4.29037 22.475 4.29037C21.2608 4.29037 20.1371 4.66316 19.1037 5.40873C18.0704 6.15431 17.36 7.10486 16.9725 8.26039H14.0275C13.64 7.10599 12.9296 6.156 11.8962 5.41042C10.8629 4.66485 9.73917 4.29149 8.525 4.29037C6.975 4.29037 5.68333 4.85349 4.65 5.97974C3.61667 7.10599 3.1 8.5138 3.1 10.2032C3.1 11.1886 3.28083 12.1814 3.6425 13.1815C4.00417 14.1816 4.65 15.322 5.58 16.6025C6.51 17.8831 7.77583 19.3894 9.3775 21.1216C10.9792 22.8538 13.02 24.93 15.5 27.3503Z" />
              </svg>
            </nuxt-link>

            <nuxt-link to="/ShoppingCart" class=" " exact-active-class="aactive-icon">
              <svg class="text-indigo-950" width="26" height="26" viewBox="0 0 31 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M24.8 25.7116C25.6222 25.7116 26.4107 26.0382 26.992 26.6196C27.5734 27.201 27.9 27.9894 27.9 28.8116C27.9 29.6338 27.5734 30.4223 26.992 31.0037C26.4107 31.585 25.6222 31.9116 24.8 31.9116C23.9778 31.9116 23.1893 31.585 22.608 31.0037C22.0266 30.4223 21.7 29.6338 21.7 28.8116C21.7 27.0911 23.0795 25.7116 24.8 25.7116ZM0 0.911621H5.0685L6.5255 4.01162H29.45C29.8611 4.01162 30.2553 4.17492 30.546 4.46561C30.8367 4.75629 31 5.15054 31 5.56162C31 5.82512 30.9225 6.08862 30.814 6.33662L25.265 16.3651C24.738 17.3106 23.715 17.9616 22.5525 17.9616H11.005L9.61 20.4881L9.5635 20.6741C9.5635 20.7769 9.60433 20.8755 9.677 20.9481C9.74967 21.0208 9.84823 21.0616 9.951 21.0616H27.9V24.1616H9.3C8.47783 24.1616 7.68933 23.835 7.10797 23.2537C6.52661 22.6723 6.2 21.8838 6.2 21.0616C6.2 20.5191 6.3395 20.0076 6.572 19.5736L8.68 15.7761L3.1 4.01162H0V0.911621ZM9.3 25.7116C10.1222 25.7116 10.9107 26.0382 11.492 26.6196C12.0734 27.201 12.4 27.9894 12.4 28.8116C12.4 29.6338 12.0734 30.4223 11.492 31.0037C10.9107 31.585 10.1222 31.9116 9.3 31.9116C8.47783 31.9116 7.68933 31.585 7.10797 31.0037C6.52661 30.4223 6.2 29.6338 6.2 28.8116C6.2 27.0911 7.5795 25.7116 9.3 25.7116ZM23.25 14.8616L27.559 7.11162H7.967L11.625 14.8616H23.25Z" />
              </svg>
            </nuxt-link>

            <nuxt-link to="/profile" exact-active-class="aactive-icon">
              <svg class="text-indigo-950" width="28" height="26" viewBox="0 0 31 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M15.5 16.4116C13.3687 16.4116 11.5443 15.6528 10.0266 14.1351C8.50885 12.6173 7.75 10.7929 7.75 8.66162C7.75 6.53037 8.50885 4.70589 10.0266 3.18818C11.5443 1.67048 13.3687 0.911621 15.5 0.911621C17.6313 0.911621 19.4557 1.67048 20.9734 3.18818C22.4911 4.70589 23.25 6.53037 23.25 8.66162C23.25 10.7929 22.4911 12.6173 20.9734 14.1351C19.4557 15.6528 17.6313 16.4116 15.5 16.4116ZM0 31.9116V26.4866C0 25.3887 0.282875 24.3799 0.848625 23.4602C1.41438 22.5406 2.16483 21.8379 3.1 21.3522C5.10208 20.3512 7.13646 19.6007 9.20312 19.1009C11.2698 18.601 13.3687 18.3504 15.5 18.3491C17.6313 18.3478 19.7302 18.5984 21.7969 19.1009C23.8635 19.6033 25.8979 20.3538 27.9 21.3522C28.8365 21.8366 29.5876 22.5393 30.1533 23.4602C30.7191 24.3812 31.0013 25.39 31 26.4866V31.9116H0ZM3.875 28.0366H27.125V26.4866C27.125 26.1314 27.0365 25.8085 26.8596 25.5179C26.6826 25.2272 26.4482 25.0012 26.1562 24.8397C24.4125 23.9679 22.6526 23.3143 20.8766 22.879C19.1005 22.4437 17.3083 22.2254 15.5 22.2241C13.6917 22.2228 11.8995 22.4411 10.1234 22.879C8.3474 23.3169 6.5875 23.9705 4.84375 24.8397C4.55312 25.0012 4.31869 25.2272 4.14044 25.5179C3.96219 25.8085 3.87371 26.1314 3.875 26.4866V28.0366ZM15.5 12.5366C16.5656 12.5366 17.4782 12.1575 18.2377 11.3993C18.9972 10.6411 19.3763 9.72854 19.375 8.66162C19.3737 7.5947 18.9946 6.68279 18.2377 5.92587C17.4808 5.16895 16.5682 4.7892 15.5 4.78662C14.4318 4.78404 13.5199 5.16379 12.7643 5.92587C12.0086 6.68795 11.6289 7.59987 11.625 8.66162C11.6211 9.72337 12.0009 10.6359 12.7643 11.3993C13.5276 12.1627 14.4395 12.5418 15.5 12.5366Z"/>
              </svg>
            </nuxt-link>
          </div>
        </template>
      </div>
    </div>

    <div v-if="showSignUp" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <signup @close="closeModel" @switch-to-login="switchToLogin" />
    </div>

    <div v-if="showLogin" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <login @close="closeModel" @switch-to-signup="switchToSignup" @login-success="onLoginSuccess" />
    </div>
  </header>
</template>

<style scoped>
.active-link {
  font-weight: bold;
  transition: all 0.3s ease-in-out;
}

.aactive-icon {
  color: #4F46E5;
  font-weight: bolder;
  transition: all 0.3s ease-in-out;
  border: 2px solid #4F46E5; 
  border-radius: 50%; 
  padding: 5px;
}
</style>