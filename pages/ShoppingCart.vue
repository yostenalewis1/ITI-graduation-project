<script setup>
import img1 from '../assets/flower1.png'
import img2 from '../assets/flower2.png'
</script>


<template>
      <div class="w-full top-28 relative flex flex-col-reverse md:flex-row gap-5 mb-40 px-10 justify-center items-stretch">
        <div class="bg-[url('../assets/about-us-cover.png')] bg-cover bg-center w-full md:w-[75%] border border-indigo-800 rounded-lg ">
            <div class="flex justify-between px-10 items-center mt-3">
                <h1 class="text-indigo-950 text-2xl font-bold">Shopping Cart</h1>
                <p class="text-indigo-950 text-sm ">Price</p>
            </div>
            <hr class="border-t border-indigo-900 w-[90%] mx-auto mt-3 opacity-50" />
            <CartCard  :imgUrl="img1" title="A vibrant and fragrant rose symbolizing love and beauty, perfect for any special occasion" quantity="4" color="Red" price="550"/>
            <hr class="border-t border-indigo-900 w-[90%] mx-auto mt-3 opacity-50" />
            <CartCard  :imgUrl="img2" title="A delicate and elegant bouquet of white and soft pink roses, symbolizing purity and grace. Ideal for weddings, anniversaries, or as a heartfelt gift." quantity="1" color="White" price="550"/>
            <hr class="border-t border-indigo-900 w-[90%] mx-auto mt-3 opacity-50" />
             
            <div class="text-right p-3">
                <p class="text-xl md:text-2xl font-normal font-cairo text-indigo-950">
                    Subtotal (2 item) : <span class="font-bold"> 1100.00 EGP</span>
                </p>
            </div>
        </div>

        <div class="bg-[url('../assets/about-us-cover.png')] bg-cover bg-center h-auto md:h-auto w-full md:w-[25%] rounded-lg text-center pt-5 flex flex-col justify-between gap-5 md:gap-0  ">
        
            <div class="flex flex-col justify-center items-center gap-4">
                <h1 class="text-indigo-950 text-sm  font-cairo">Total amount</h1>
                <p class="text-indigo-900 text-2xl font-bold  font-cairo">1120.00 LE</p>
            </div>
            <hr class="border-t border-indigo-900 w-[90%] mx-auto  opacity-50" />
            
            <h1 class="text-neutral-700 text-sm text-left pl-5  font-cairo">Order summary</h1>

            <div class="flex flex-row justify-between px-5 ">
                <p class=" text-md text-black  font-cairo">Red Roses Bouquet</p>
                <p class=" text-md text-black  font-cairo">550.00 EGP</p>
            </div>

            <div class="flex flex-row justify-between px-5">
                <p class=" text-md text-black  font-cairo">White Roses Bouquet</p>
                <p class=" text-md text-black  font-cairo" >550.00 EGP</p>
            </div>
            <hr class="border-t border-indigo-900 w-[90%] mx-auto opacity-50" />

            <div class="flex flex-row justify-between px-5 ">
                <p class=" text-md text-black  font-cairo">Subtotal</p>
                <p class=" text-md text-black  font-cairo">1100.00 EGP</p>
            </div>
            <hr class="border-t border-indigo-900 w-[90%] mx-auto opacity-50" />

            <div class="flex flex-row justify-between px-5 ">
                <p class=" text-md text-black  font-cairo">Shipping</p>
                <p class=" text-md text-black  font-cairo">20.00 LE</p>
            </div>

            <hr class="border-t border-indigo-900 w-[90%] mx-auto  opacity-50" />
           
            <div class="flex flex-row justify-between px-5 ">
                <p class="text-indigo-900 text-xl font-bold  font-cairo">Total</p>
                <p class="text-indigo-950 text-xl  font-cairo">1120.00 EGP</p>
            </div>
             
            <button class="bg-violet-950 w-[90%] mx-auto h-[50px] rounded-lg text-white font-bold font-cairo  mb-5 items-center text-center ">
                Proceed to buy
            </button>
        </div>

  
     </div>
        
  

 </template>