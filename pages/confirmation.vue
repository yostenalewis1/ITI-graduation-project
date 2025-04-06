<script setup>
  definePageMeta({
  layout: 'second' 
})
</script>


<template>
    <div class="w-full top-24 relative flex flex-col md:flex-row gap-10 px-10 justify-evenly items-center">
      <div class="flex flex-col items-center justify-center gap-4">
        <h1 class="text-3xl font-semibold font-cairo text-indigo-950">Order successfully placed</h1>
        <p class="text-[#4C1F7A] text-center font-cairo">Your order is on its way!</p>
        <p class="text-[#4C1F7A] text-center font-cairo">Expected delivery: <span class="font-bold"> March 12, 2025, at 3:00 PM</span></p>
  
        <NuxtLink to="/" class="mt-4 px-36 py-3 bg-[#4C1F7A] text-white rounded-lg ">
          Back to Home
        </NuxtLink>  
      </div>
  
      <img src="../assets/confirmation.png" alt="Confirmation" class="w-[35%] h-[35%]" />
    </div>
  </template>
  