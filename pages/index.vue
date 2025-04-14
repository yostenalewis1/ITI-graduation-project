<script setup>

import categoryImg from '../assets/categoryImg(1).png';
import categoryImg2 from '../assets/categoryImg(2).png';
import categoryImg3 from '../assets/categoryImg(3).png';
import categoryImg4 from '../assets/categoryImg(4).png';
import offerCard1 from '../assets/offer-1.png'
import offerCard2 from '../assets/offer-2.png'
import offerCard3 from '../assets/offer-3.png'

const offerData = [
{ 
      title : "Rose Bouquet",
      description : "A delicate arrangement of soft pink roses, perfect for romantic gestures and celebrations.",
      price : 500.00,
      oldPrice : 650.00,
      imgUrl :offerCard1
   } ,
   { 
      title : "Rose Bouquet",
      description : "Elegant Charming peach-toned roses wrapped elegantly, ideal for gifts and decor. ",
      price : 150.00,
      oldPrice : 250.00,
      imgUrl :offerCard2
   } ,
    
   { 
      title : "Luxury Rose Bouquet",
      description : "Elegant and sophisticated orchids to elevate any space.",
      price : 700.00,
      oldPrice : 950.00,
      imgUrl :offerCard3
   } ,
   
]


</script>
<template>
  <!-- Hero Section -->
  <div class="relative min-h-screen bg-[url('../assets/main-background.jpg')] bg-cover bg-center flex items-center">
    
    <div class="top-5 sm:top-2  md:top-12 absolute inset-0 md:px-16 inline-flex flex-col justify-center gap-10 items-center md:items-start">
        <div class="max-w-[614px] text-3xl md:text-5xl md:leading-[80px] text-violet-950 font-bold text-center md:text-left ">
          Fresh Flowers for Any Occasion 
       </div>

        <div class=" text-violet-950 text-[22px] md:text-[28px] text-center md:text-left font-light font-cairo w-[40%]  leading-[40px] md:leading-[50px] ">
          Bringing nature’s beauty to your doorstep with elegant and fresh floral arrangements.
        </div>

        <div class="w-[80%]  md:w-[545px] py-2 md:px-32 md:py-3 bg-violet-950 rounded-2xl inline-flex justify-center items-center gap-2">
            <button class="text-center text-white text-3xl font-cairo">Start Shopping </button>
        </div> 
    </div>
  </div>

  <!-- About Section -->
  <div class="bg-[url('../assets/about-us-cover.png')] bg-cover bg-center h-auto py-16 flex flex-wrap md:flex-nowrap items-center justify-center gap-10 px-6 md:px-12 lg:px-20">

 
 <div class="hidden md:flex mb-10 md:w-1/2 lg:w-[40%] justify-center">
  <img src="../assets/about img.png" alt="about" class="w-full max-w-[300px] lg:max-w-[400px] object-contain" />
</div>
 <div class="flex flex-col gap-6 items-center md:items-start max-w-screen-md md:w-1/2 lg:w-[60%]">
  <p class="text-violet-950 text-2xl font-normal font-cairo text-center md:text-left">About Us</p>

  <h1 class="text-purple-950 font-bold text-3xl md:text-5xl text-center md:text-left font-cairo md:tracking-[4px]">
    The Art of Floral Expression
  </h1>

  <p class="text-purple-950 leading-[35px] md:leading-[40px] font-cairo text-xl md:text-2xl text-center md:text-left px-2 md:px-0 max-w-[850px]">
    Flowers speak the language of love, care, and joy. At Floral Haven, we curate exquisite floral arrangements that bring happiness to every moment. Whether you need a bouquet for a special occasion or just to brighten someone's day, we have the perfect flowers for you.
  </p>

  <Button buttonName="Start Shopping" />
</div>

</div>





  <!-- Featured Categories -->
  <div class="relative bg-[url('../assets/bg-featuresCategory.png')] bg-cover bg-center flex flex-col items-center  ">
    <div class="absolute inset-0 bg-black bg-opacity-35 z-0"></div>
    
    <div class="h-16 text-center text-white text-4xl font-bold font-cairo z-10 pt-[30px]">Featured Categories</div>
    
    
    <div class="mb-[30px] flex flex-row flex-wrap items-center justify-center pt-[50px] gap-6">
      <Cards :imgUrl="categoryImg" title="Orchid Flower" description="Orchids symbolize elegance and sophistication, adding a luxurious touch to any space." buttonName="View Collection" />
      <Cards :imgUrl="categoryImg2" title="Peony Flower" description="Peonies represent romance and prosperity, making them perfect for gifts and special occasions." buttonName="View Collection" />
      <Cards :imgUrl="categoryImg3" title="Tulip Flower " description="Tulips are a symbol of love and hope, available in vibrant colors to suit all tastes." buttonName="View Collection" />
      <Cards :imgUrl="categoryImg4" title="Lily Flower" description="Lilies symbolize purity and beauty, bringing grace and charm to any setting. " buttonName="View Collection" />

    </div>

  </div>


<!-- Deal Of The Day -->

<div class="bg-[url('../assets/about-us-cover.png')] bg-cover bg-center h-auto pb-10 flex flex-col items-center gap-10">
        <div class="h-16 text-center text-purple-950 text-4xl font-bold font-cairo z-10 pt-[38px]">Deal Of The Day</div>
        <p class="text-purple-950 font-cairo text-2xl md:text-3xl  text-center">Limited Offer – Grab Yours Now</p>
       
      <div class="flex flex-row gap-3 w-96 px-3">
          <div class="w-28 p-2 outline outline-[2px] outline-offset-[-2px] outline-stone-500 inline-flex flex-col justify-center items-center gap-2">
                     <div class="self-stretch text-center justify-start"><span class="text-violet-950  text-4xl font-normal font-['Inter']">50<br/></span><span class="text-violet-950 text-3xl font-light font-cairo">Days</span></div>
          </div>

         <div class="w-28 p-2 outline outline-[2px] outline-offset-[-2px] outline-stone-500 inline-flex flex-col justify-center items-center gap-2.5">
             <div class="self-stretch text-center justify-start"><span class="text-violet-950  text-4xl font-normal font-cairo">23<br/></span><span class="text-violet-950 text-3xl font-light font-cairo">Hours</span></div>
        </div>

        <div class="w-28 p-2 outline outline-[2px] outline-offset-[-2px] outline-stone-500 inline-flex flex-col justify-center items-center gap-2.5">
            <div class="self-stretch text-center justify-start"><span class="text-violet-950  text-4xl font-normal font-cairo">95<br/></span><span class="text-violet-950 text-3xl font-light font-cairo">Mins</span></div>
        </div>

        <div class="w-28 p-2 outline outline-[2px] outline-offset-[-2px] outline-stone-500 inline-flex flex-col justify-center items-center gap-2.5">
            <div class="self-stretch text-center justify-start"><span class="text-violet-950  text-4xl font-normal font-cairo">15<br/></span><span class="text-violet-950 text-3xl font-light font-cairo"> Sec</span></div>
        </div>
      </div>
 
    <div class="flex flex-row flex-wrap items-center justify-center gap-4 ">
       <OffersCard 
        v-for="(card , index) in offerData"
        :key="index"
        :imgUrl="card.imgUrl"
        :title="card.title"
        :description="card.description"
        :price="card.price"
        :oldPrice="card.oldPrice"
       />
    </div>
     

</div>



</template>
