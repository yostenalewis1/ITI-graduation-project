<script setup>
defineProps({
  imgUrl: String,
  title: String,
  description: String,
  buttonName: String
});

</script>


<template>

<div class="w-64 h-[560px] bg-white flex flex-col z-10 rounded-2xl shadow-lg overflow-hidden">
    <img :src="imgUrl" alt="flower-img" class="w-full h-[60%] object-cover rounded-t-2xl" />
   
    <div class="h-1/2 flex flex-col justify-between p-4">
      <h1 class="text-2xl font-bold text-violet-950 font-cairo">{{ title }}</h1>
      <p class="text-gray-600">{{ description }}</p>
      <button class="border border-violet-950 text-violet-950 py-2 px-4 rounded-lg hover:bg-violet-950 transition-all hover:text-white">
           {{ buttonName }}
      </button>

    </div>
</div>


</template>