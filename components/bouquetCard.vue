<script setup>
import heart from "../assets/Vector (1).svg";
import fillHeart from "../assets/Fill-heart.svg"
     
const heartIcon = ref(heart);     
const toggleIcon =()=>{
    if (heartIcon.value === heart) {
        heartIcon.value = fillHeart;
    } else {
        heartIcon.value = heart;
    } 
}  
</script>




<template>
    <div class="flex flex-col w-[350px] pb-5 rounded-xl border-2 gap-4">
        <img src="../assets/flower1.png" alt="Bouquet" class="rounded-t-xl w-full h-64 object-cover p-5" />
        
        <p class="text-indigo-950 text-sm pl-5">Purple White Bouquet</p>
        
        
        <div class="flex flex-row justify-between px-5">
          <p class="text-indigo-950 text-md font-bold">Price : 420 LE</p>
          <div class=" flex gap-4">
          <button @click="toggleIcon"> <img :src="heartIcon" class="w-6 h-6"  /></button>
          <button> <img src="../assets/Vector (3).svg" class="w-6 h-6" /></button>
          </div>
         
        </div>
    </div>
</template>