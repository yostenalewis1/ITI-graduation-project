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
   <div class="w-[350px] md:w-[460px] md:h-[220px] outline outline-1 outline-offset-[-1px] outline-black flex-col md:flex-row-reverse inline-flex  gap-5  ">
    <img :src="imgUrl" alt="offer" class="w-full md:w-1/2 h-[320px] md:h-full object-cover ">    
    <div class="flex flex-col gap-3 justify-center items-center md:items-start p-2 md:w-1/2">
            <h1 class="text-neutral-700 font-cairo text-3xl font-semibold text-center">{{title}}</h1>
            <p class="text-neutral-700 font-cairo text-lg font-medium text-center md:text-left">{{ description }}</p>
        
            <div class="flex flex-row gap-1">
                <p class="text-neutral-800 text-xl md:text-lg font-bold font-cairo">{{price}} LE</p>
                <p class="line-through text-neutral-800 text-[13px] font-cairo font-light mt-2">{{oldPrice}} LE</p>
            </div>
    </div>
   </div>
</template> 