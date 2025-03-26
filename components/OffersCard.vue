<script setup>
   defineProps({
         imgUrl: String,
         title: String,
         description: String,
         price : Number,
         oldPrice : Number
   })

</script>



<template>
   <div class="w-[460px] h-[220px] outline outline-1 outline-offset-[-1px] outline-black inline-flex gap-5">
        <div class="flex flex-col gap-3 justify-center items-start p-2 w-1/2">
            <h1 class="text-neutral-700 font-cairo text-3xl font-semibold text-center">{{title}}</h1>
            <p class="text-neutral-700 font-cairo text-lg font-medium">{{ description }}</p>
        
            <div class="flex flex-row gap-1">
                <p class="text-neutral-800 font-bold font-cairo">{{price}} LE</p>
                <p class="line-through text-neutral-400 text-[10px] font-cairo font-light mt-2">{{oldPrice}} LE</p>
            </div>
        </div>
        <img :src="imgUrl" alt="offer" class="w-1/2 h-full object-cover">
   </div>
</template>