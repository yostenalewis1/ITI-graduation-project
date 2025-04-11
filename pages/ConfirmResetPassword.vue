<script setup >
  const emit = defineEmits(['close', 'switch-to-login']);
</script>

<template>
 <div class="bg-[#8C6E82] flex flex-row rounded-t-2xl rounded-e-2xl w-[1400px] h-[596px] overflow-hidden relative">
    <button @click="emit('close')" class="absolute top-2 right-5 text-white text-4xl z-10">&times;</button>
  
    <div class="flex flex-col gap-5 w-full md:w-[60%] items-center justify-center -mt-10 md:mt-0 md:pl-10 text-center md:text-start">
        <img src="../assets//done icon.svg" alt="done icon" class="w-16" />
       <div class="text-white text-5xl font-normal font-cairo">All done !</div> 
  
                <p class="font-cairo text-lg md:text-md">Your password has been reset , Please go back to home page to login</p>
                <p>back to<button type="button" @click="emit('switch-to-login')" class="underline pl-1">Login</button></p> 
    </div>
  
  
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

     
 </div> 
</template>