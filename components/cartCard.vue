<script setup>
defineProps({
  imgUrl: String,
  title: String,
  quantity: String,
  color: String,
  price: String
});

</script>


<template>
    <div class="flex flex-col md:flex-row gap-2">
      <p class="block md:hidden text-indigo-950 text-sm w-full text-right pr-5 pt-3">{{ price }} LE</p>

        <img :src="imgUrl" alt="flower-img" class="w-96 h-64 object-cover rounded-t-2xl p-3 md:p-6 " />
       
        <div class="h-1/2 flex flex-col justify-between   gap-6 p-3 md:py-4 md:px-0">

          <h1 class="text-xl md:text-2xl font-bold text-violet-950 font-cairo">{{ title }}</h1>
          <p class="text-indigo-950 text-sm">Only {{ quantity }} left in stock - order soon.</p>
          <p class="text-indigo-950 text-sm" >Color : {{ color }}</p>
            
            <div class="flex flex-row gap-2 md:gap-6">
                <div class="flex flex-row bg-gray-200 rounded-2xl justify-center items-center px-1 md:px-2 gap-2 md:gap-3">
                    <button>
                        <img src="../assets/minus.svg" alt="minus" class="" />
                    </button>
                    <p class="text-indigo-950 text-xl">1</p>
                    <button>
                        <img src="../assets/plus.svg" alt="plus" class="" />
                    </button>
                </div>

                <div className="w-0 h-9 outline outline-1 outline-indigo-900"></div>          
                  <button class="text-indigo-950 ">Delete</button>
                <div className="w-0 h-9 outline outline-1 outline-indigo-900"></div>          
                <button class="text-indigo-950 ">Save For Later</button>
                <div className="w-0 h-9 outline outline-1 outline-indigo-900"></div>          
                <button class="text-indigo-950 ">Share</button>
                 
            </div>
        </div>
        <p class="hidden md:block text-indigo-950 text-sm w-[20%] items-end text-center pt-2 pr-1">{{ price }} LE</p>

    </div>
    
    
    </template>