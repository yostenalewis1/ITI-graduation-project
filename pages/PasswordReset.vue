<script setup>
import { ref } from 'vue';
import SetNewPassword from '../pages/SetNewPassword.vue';

const emit = defineEmits(['close', 'switch-to-login']);
const setNewPassword = ref(false);
let userCode = ref('');

 

async function onSubmit(event) { 
   event.preventDefault();  
   console.log('Submitting code:', userCode.value);  
   const code = {
      code: userCode.value,
   };
   const { data, status, message } = await useAsyncFetch("POST", "/api/v1/auth/verifyResetCode", code);

   if (status === 'error') {
     console.error("Error during code verification:", message);
     useToastify("Invalid code, please try again", {
       autoClose: 3000,
       position: ToastifyOption.POSITION.BOTTOM_RIGHT,
       type: ToastifyOption.TYPE.ERROR,
     });
     return;
   }

   console.log("Code verified successfully:", data);
   useToastify('Code verified successfully:', {
     autoClose: 2000,
     position: ToastifyOption.POSITION.BOTTOM_RIGHT,
     type: ToastifyOption.TYPE.SUCCESS,
   });
   setNewPassword.value = true;
}

async function resendCode() {
  const email = localStorage.getItem("email");
  const userData = { email }; 
  const { data, status, message } = await useAsyncFetch("POST", "/api/v1/auth/forgotPass", userData);

  if (status === 'error') {
    console.error("Error Forget pass:", message);
    useToastify("Invalid email", {
      autoClose: 3000,
      position: ToastifyOption.POSITION.BOTTOM_RIGHT,
      type: ToastifyOption.TYPE.ERROR,
    });
    return;  
  } 

  console.log("email sent .... ", data);

  useToastify("We sent a code again to you ...", {
    autoClose: 2000,
    position: ToastifyOption.POSITION.BOTTOM_RIGHT,
    type: ToastifyOption.TYPE.SUCCESS,
  });
}

const closeModal = () => {
  emit('close');
};

const switchToLogin = () => {
  setNewPassword.value = false;
  emit('switch-to-login');
};
</script>



<template>
 
 <div class="bg-[#8C6E82] flex flex-row rounded-t-2xl rounded-e-2xl w-[1400px] h-[596px] overflow-hidden relative">
    <button @click="emit('close')" class="absolute top-2 right-5 text-white text-4xl z-10">&times;</button>
  
    <form  @submit="onSubmit" class="flex flex-col gap-5 w-full md:w-[60%] items-center md:items-start justify-center -mt-10 md:mt-0 md:pl-10 text-center md:text-left">
       <div class="text-white text-5xl font-normal font-cairo">Password reset</div> 
        <div class="flex flex-col gap-5 w-[70%]">
                <p class="font-cairo text-lg md:text-md">We sent code to your email</p>
              
                <input
                  v-model="userCode"   
                  type="text"
                  maxlength="4" 
                  class="border border-gray-300 text-black text-xl font-semibold w-28 h-12 text-center rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />



               <Button type="submit" buttonName="Send e-mail"/>
                <p class="">  Didn’t receive the email?<button type="button" @click="resendCode" class="underline">Click to resend</button></p>
        </div>
    </form>  
  
    <div class="hidden md:block relative w-[40%] overflow-hidden">
        <img src="../assets/bg-signup.png" alt="bg-signup" class="w-full h-full object-cover " />
        <div class="rounded-e-2xl absolute inset-0 bg-gray-600 bg-opacity-60 flex flex-col justify-center items-center gap-6">
            <p class="text-center text-white text-5xl font-normal font-cairo">Welcome <br />to</p>
            <div class="flex flex-col justify-center items-center">
            <img src="../assets/Group.png" alt="logo" class="rounded-e-2xl" />
            <img src="../assets/flower.png" alt="logo" class="-mt-20 w-36" />
            </div>
        </div>
    </div>

     
    <div v-if="setNewPassword" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <SetNewPassword @close="closeModal" @switch-to-login="switchToLogin"/>
    </div>
 </div>
</template>