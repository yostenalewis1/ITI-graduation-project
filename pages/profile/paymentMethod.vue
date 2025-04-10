<script setup>


definePageMeta({
  layout: 'profile' 
}) 

const username = ref('')
const email = ref('')
const phoneNumber = ref('')
const password = ref('')
const address = ref('')
</script>

 
<template>
  <div class="w-[90%] mx-auto md:mt-20 space-y-5">
    <div class="flex items-center gap-4 mt-12">
      <h2 class="text-xl sm:text-2xl font-cairo font-bold text-indigo-950">Choose your Payment Method</h2>
    </div>

    <div class="flex flex-col gap-6">
      
      <div class="flex flex-col sm:flex-row gap-4 w-full">
        <div
          class="transition transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg cursor-pointer border-2 border-indigo-900 p-4 flex gap-3 rounded-md justify-center items-center w-full sm:w-1/3"
        >
          <img src="../../assets/payment method/PayPal.svg" class="w-10 h-10" />
          <p class="text-black font-cairo text-sm sm:text-base">XXXX XXXX XXXX 8908</p>
          <svg fill="black" width="24" height="24" viewBox="0 0 200 200">
            <path
              d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm25-91.5-29,35L76,94c-4.5-3.5-10.5-2.5-14,2s-2.5,10.5,2,14c6,4.5,12.5,9,18.5,13.5,4.5,3,8.5,7.5,14,8,1.5,0,3.5,0,5-1l3-3,22.5-27c4-5,8-9.5,12-14.5,3-4,4-9,.5-13L138,71.5c-3.5-2.5-9.5-2-13,2Z"
            />
          </svg>
        </div>

     
        <div
          class="transition transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg cursor-pointer border-2 border-indigo-900 p-4 flex gap-3 rounded-md justify-center items-center w-full sm:w-1/3"
        >
          <img src="../../assets/payment method/credit-card.svg" class="w-10 h-10" />
          <p class="text-black font-cairo text-sm sm:text-base">XXXX XXXX XXXX 8908</p>
          <svg fill="black" width="24" height="24" viewBox="0 0 200 200">
            <path
              d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm25-91.5-29,35L76,94c-4.5-3.5-10.5-2.5-14,2s-2.5,10.5,2,14c6,4.5,12.5,9,18.5,13.5,4.5,3,8.5,7.5,14,8,1.5,0,3.5,0,5-1l3-3,22.5-27c4-5,8-9.5,12-14.5,3-4,4-9,.5-13L138,71.5c-3.5-2.5-9.5-2-13,2Z"
            />
          </svg>
        </div>

       
        <div
          class="transition transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg cursor-pointer border-2 border-indigo-900 p-4 flex gap-3 rounded-md justify-center items-center w-full sm:w-1/3"
        >
          <img src="../../assets/payment method/Mastercard.svg" class="w-10 h-10" />
          <p class="text-black font-cairo text-sm sm:text-base">XXXX XXXX XXXX 8908</p>
          <svg fill="black" width="24" height="24" viewBox="0 0 200 200">
            <path
              d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm25-91.5-29,35L76,94c-4.5-3.5-10.5-2.5-14,2s-2.5,10.5,2,14c6,4.5,12.5,9,18.5,13.5,4.5,3,8.5,7.5,14,8,1.5,0,3.5,0,5-1l3-3,22.5-27c4-5,8-9.5,12-14.5,3-4,4-9,.5-13L138,71.5c-3.5-2.5-9.5-2-13,2Z"
            />
          </svg>
        </div>
      </div>

   
      <div class="flex flex-col gap-4 p-3">
        <div class="flex flex-col sm:flex-row items-center gap-2">
          <label class="w-full sm:w-[25%] text-base sm:text-xl font-bold text-indigo-950">Name:</label>
          <input
            v-model="email"
            type="text"
            placeholder="Name"
            class="w-full sm:w-[60%] h-10 sm:h-12 bg-transparent border-b-2 border-indigo-800 text-indigo-950 text-base sm:text-lg font-cairo focus:outline-none"
          />
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-2">
          <label class="w-full sm:w-[25%] text-base sm:text-xl font-bold text-indigo-950">Expiration:</label>
          <input
            v-model="email"
            type="text"
            placeholder="MM/YY"
            class="w-full sm:w-[60%] h-10 sm:h-12 bg-transparent border-b-2 border-indigo-800 text-indigo-950 text-base sm:text-lg font-cairo focus:outline-none"
          />
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-2">
          <label class="w-full sm:w-[25%] text-base sm:text-xl font-bold text-indigo-950">Card Number:</label>
          <input
            v-model="email"
            type="text"
            placeholder="XXXX XXXX XXXX 8848"
            class="w-full sm:w-[60%] h-10 sm:h-12 bg-transparent border-b-2 border-indigo-800 text-indigo-950 text-base sm:text-lg font-cairo focus:outline-none"
          />
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-2">
          <label class="w-full sm:w-[25%] text-base sm:text-xl font-bold text-indigo-950">CVV:</label>
          <input
            v-model="email"
            type="password"
            placeholder="***"
            class="w-full sm:w-[60%] h-10 sm:h-12 bg-transparent border-b-2 border-indigo-800 text-indigo-950 text-base sm:text-lg font-cairo focus:outline-none"
          />
        </div>
     
     <div class="pt-8">
        <button
          type="submit"
          class="w-full md:w-[20%] py-3 bg-[#4c1f7a] hover:bg-[#5a2c8c] text-white text-lg font-semibold rounded-xl transition"
        >
          Add Card
        </button>
      </div>
  

      </div>
    </div>
  </div>
</template>
