<script setup>

defineProps({
    title : String,
})

</script>

<template>
 
    <div class="relative w-[40%]">
      <img src="../assets/bg-signup.png" alt="bg-signup" class="w-full h-full object-cover rounded-s-2xl" />
      <div class="absolute inset-0 bg-gray-600 bg-opacity-60 flex flex-col justify-center items-center gap-6">
        <p class="text-center text-white text-5xl font-normal font-cairo">Welcome <br />to</p>
        <div class="flex flex-col justify-center items-center">
          <img src="../assets/Group.png" alt="logo" />
          <img src="../assets/flower.png" alt="logo" class="-mt-20 w-36" />
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-5 w-[60%] items-center justify-center">
      <div class="text-white text-5xl font-normal font-cairo">{{title}}</div>
      <slot />
    </div> 
</template>