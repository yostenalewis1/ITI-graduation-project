<script setup >
import PinInput from '~/components/PinInput.vue';
import SetNewPassword from '../pages/SetNewPassword.vue';
import {useRouter , useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const emit = defineEmits(['close']);
const value = ref([]) 
const setNewPassword = ref(false)
 

function onSubmit(event) { 
   event.preventDefault();
   
   setNewPassword.value = true;
//    router.replace({ query: { auth: "setNewPassword" } });
}

const closeModal = () => {
emit('close');
};

const switchToLogin = () => {
    setNewPassword.value = false;
    
};
</script>



<template>
 
 <div class="bg-[#8C6E82] flex flex-row rounded-t-2xl rounded-e-2xl w-[1400px] h-[596px] overflow-hidden relative">
    <button @click="emit('close')" class="absolute top-2 right-5 text-white text-4xl z-10">&times;</button>
  
    <form  @submit="onSubmit" class="flex flex-col gap-5 w-[60%] items-start justify-center pl-10">
       <div class="text-white text-5xl font-normal font-cairo">Password reset</div> 
        <div class="flex flex-col gap-5 w-[70%]">
                <p class="font-cairo text-md">We sent code to your email</p>
               <PinInput v-model="value" />
               <Button type="submit" buttonName="Send e-mail"/>
                <p>  Didn’t receive the email?<button type="button" class="underline">Click to resend</button></p>
        </div>
    </form>  
  
    <div class="relative w-[40%] overflow-hidden">
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