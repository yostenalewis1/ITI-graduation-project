<script setup>
 defineProps({
    showSignUp: Boolean
 })

 const emit = defineEmits(['close'])

</script>


<template>
      <div class="bg-[#8C6E82] rounded-s-2xl flex flex-row rounded-b-2xl w-[1400px] h-[596px] overflow-hidden relative">
        <button @click="emit('close') " class="absolute top-2 right-5 text-white text-4xl">&times;</button>
             
        <div class="relative w-[40%]">
            <img src="../assets/bg-signup.png" alt="bg-signup" class="w-full h-full object-cover rounded-s-2xl" />
            <div class="absolute inset-0 bg-gray-600 bg-opacity-60 flex flex-col justify-center items-center gap-6">
            <p class=" text-center justify-start text-white text-5xl font-normal font-cairo">Welcome <br/>to</p>
                <div class="flex flex-col justify-center items-center" >
                    <img src="../assets/Group.png" alt="logo" />
                    <img src="../assets/flower.png" alt="logo" class="-mt-20 w-36"  />
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-5 w-[60%] items-center mt-14">
            <div className="text-indigo-950 text-5xl font-normal font-cairo">Sign Up</div>
            
            <div class="flex flex-col gap-5 w-[70%] items-center">
                <div class="flex flex-row w-full gap-2">
                    <input type="text" placeholder="First Name" class="w-[350px] h-12 bg-white p-2 text-indigo-950 text-lg font-cairo focus:outline-none rounded-lg" /> 
                    <input type="text" placeholder="Last Name" class="w-[350px] h-12 bg-white p-2 text-indigo-950 text-lg font-cairo focus:outline-none rounded-lg" /> 

                </div>
                <input type="text" placeholder="Email" class="w-full h-12 bg-white p-2 text-indigo-950 text-lg font-cairo focus:outline-none rounded-lg" /> 
                <input type="text" placeholder="Password" class="w-full h-12 bg-white p-2 text-indigo-950 text-lg font-cairo focus:outline-none rounded-lg" /> 
                <input type="text" placeholder="Confirm password" class="w-full h-12 bg-white p-2 text-indigo-950 text-lg font-cairo focus:outline-none rounded-lg" /> 



                <button class="w-full h-12 bg-indigo-950 text-white text-lg font-cairo rounded-2xl">SIGN UP</button>
                <p>already have an account ? <router-link to="/login" class="underline">Login</router-link ></p>
            </div>
        </div>
      </div>
</template>