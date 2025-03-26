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
  <div class="relative h-screen bg-[url('../assets/Hero-img.png')] bg-cover bg-center">
    <div class="absolute inset-0 bg-[#52022b] bg-opacity-50"></div>
     <div class="relative w-[1151px] h-[620px] px-20 inline-flex flex-col justify-center gap-12 mt-20 ">
        <div class="w-[614px] text-teal-50 text-5xl font-bold font-cairo leading-[80px]">Fresh Flowers for Any Occasion  </div>
        <div class=" text-teal-50 text-3xl font-normal font-cairo leading-[60px]">Bringing nature’s beauty to your doorstep with elegant and fresh floral arrangements.</div>
        <div class="w-[645px] px-32 py-2 bg-white rounded-2xl inline-flex justify-center items-center gap-2">
            <button class="text-center text-[#962360] text-3xl font-cairo">Start Shopping </button>
        </div> 
    </div>
  </div>

  <!-- About Section -->
  <div class="bg-[url('../assets/about-us-cover.png')] bg-cover bg-center h-[620px] flex items-center justify-center">
    <div class="flex justify-center gap-40 items-center">
     <div class="flex ml-10">
      <div class="w-[340px] h-[400px] rounded-2xl border-2 border-dashed border-gray-400" />
        <div class="absolute px-24 py-14">
          <img src="~/assets/about-us-img.png" alt="about" width="80%">
        </div>
     </div>

      <div class="flex flex-col gap-6">
          <p class="text-violet-950 text-2xl font-normal font-cairo">About Us</p>
          <h1 class="text-purple-950 font-bold text-5xl font-cairo tracking-[4px]">The Art of Floral Expression</h1>
          <p class="text-purple-950 w-[850px] leading-[40px] font-cairo text-2xl">
                                        Flowers speak the language of love, care, and joy. At Floral Haven, we curate exquisite floral arrangements that bring happiness to every
                                        moment. Whether you need a bouquet for a special occasion or just to brighten someone's day, we have the perfect flowers for you           
          </p>
        <Button buttonName="Start Shopping" />
      </div>
    </div>
  </div>

  <!-- Featured Categories -->
<div class="relative bg-[url('../assets/bg-featuresCategory.png')] bg-cover bg-center flex flex-col items-center  ">
  <div class="absolute inset-0 bg-black bg-opacity-35 z-0"></div>
   
  <div class="w-[715px] h-16 text-center text-white text-4xl font-bold font-cairo z-10 pt-[30px]">Featured Categories</div>
  
  
  <div class="mb-[30px] flex flex-row flex-wrap items-center justify-center pt-[50px] gap-6">
    <Cards :imgUrl="categoryImg" title="Orchid Flower" description="Orchids symbolize elegance and sophistication, adding a luxurious touch to any space." buttonName="View Collection" />
    <Cards :imgUrl="categoryImg2" title="Peony Flower" description="Peonies represent romance and prosperity, making them perfect for gifts and special occasions." buttonName="View Collection" />
    <Cards :imgUrl="categoryImg3" title="Tulip Flower " description="Tulips are a symbol of love and hope, available in vibrant colors to suit all tastes." buttonName="View Collection" />
    <Cards :imgUrl="categoryImg4" title="Lily Flower" description="Lilies symbolize purity and beauty, bringing grace and charm to any setting. " buttonName="View Collection" />

  </div>

</div>


<!-- Deal Of The Day -->

<div class="bg-[url('../assets/about-us-cover.png')] bg-cover bg-center h-auto pb-10 flex flex-col items-center gap-10">
        <div class="w-[715px] h-16 text-center text-purple-950 text-4xl font-bold font-cairo z-10 pt-[30px]">Deal Of The Day</div>
        <p class="text-purple-950 font-cairo text-3xl">Limited Offer – Grab Yours Now</p>
       
      <div class="flex flex-row gap-3 w-96">
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
