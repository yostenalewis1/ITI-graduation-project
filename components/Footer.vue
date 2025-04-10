<template>

<div class="flex flex-col z-10 md:rounded-none rounded-t-[40px] overflow-hidden ">


   <div class=" md:flex flex-row w-full items-center bg-[url('../assets/bg-featuresCategory.png')] bg-cover bg-center justify-between gap-10 px-16 py-7">    
    
      <div class="flex flex-col md:flex-row gap-4 md:gap-10 items-center justify-center "> 
         <img src="../assets/footer-logo.svg" alt="footer-logo" class="hidden md:block w-16 h-16">
         <img src="../assets/logo-w.svg" alt="logo" class="block md:hidden w-28 h-20" />

         
         <div class="flex flex-col gap-2">
              <h1 class="hidden md:block text-indigo-950 text-2xl font-semibold font-cairo">Rozato</h1>
              <p class="hidden md:block text-indigo-950 ">Your trusted flower boutique</p>
              
             
              
              <div class="flex flex-row gap-2">
                <p class="block md:hidden text-[#26103D] text-xl font-cairo font-bold">Follow Us on :</p>

                  <button><img src="../assets/instagram.svg"></button>
                  <button><img src="../assets/facebook.svg"></button>
                  <button><img src="../assets/twitter.svg"></button>
              </div>
            </div>
        </div>

        <div class="hidden md:flex flex-col gap-2">
              <h1 class="text-indigo-950 text-2xl font-semibold font-cairo">Contact Us</h1>
              <p class="text-indigo-950 ">+010-151-5114</p>
              <p class="text-indigo-950 ">Rozato@gmail.com</p>
        </div>

        <div class="hidden md:flex flex-col gap-2">
              <h1 class="text-indigo-950 text-2xl font-semibold font-cairo">Company</h1>
              <button class="text-indigo-950 ">Home</button>
              <button class="text-indigo-950 ">About-Us</button>
        </div> 
            
        <div class="hidden md:flex flex-col gap-4">
              <h1 class="text-indigo-950 text-2xl font-semibold font-cairo">Get The Latest Information About Us</h1>
              
              <div class="relative flex flex-row">

              <input type="email" placeholder="Enter Your Email" class=" pl-5 pr-7 w-[280px] h-10 border-2 border-indigo-900 rounded-s-2xl px-2 focus:outline-none text-indigo-950 bg-white">
              <button class="absolute right-0 w-40 h-10 bg-[#26103D] text-white rounded-e-2xl  ">Send</button>
              </div>
         </div>

   </div>

      <div class="h-10 w-full py-4 bg-[#26103D] inline-flex justify-center items-center gap-2">
        <p class="hidden md:block text-white font-cairo">Rozato copyright 2025</p>
        <p class="block md:hidden text-white font-cairo">© 2022 - 2025 ROZATO® Global Inc.</p>
      </div>
</div>
</template>