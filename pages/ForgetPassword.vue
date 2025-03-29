<script setup>
 const emit = defineEmits(['close', 'switch-to-login']);

</script>



<template>
 
 <div class="bg-[#8C6E82] flex flex-row rounded-t-2xl rounded-e-2xl w-[1400px] h-[596px] overflow-hidden relative">
    <button @click="emit('close')" class="absolute top-2 right-5 text-white text-4xl z-10">&times;</button>
  
    <div class="flex flex-col gap-5 w-[60%] items-start justify-center pl-10">
       <div class="text-white text-5xl font-normal font-cairo">Forget Password</div> 
        <div class="flex flex-col gap-5 w-[70%]">
                <p class="font-cairo text-md">Enter the email associated with your account and we’ll send an email with instructions to reset your password</p>
                <input type="email" placeholder="Email" class="w-full h-12 bg-[#8C6E82] border-b-2 border-white text-white text-lg font-cairo focus:outline-none" />
                <Button buttonName="Send e-mail" /> 
                <p>  back to  <button @click="emit('switch-to-login')" class="underline">Login</button></p>
        </div>
    </div>  
  
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
 </div>
</template>


