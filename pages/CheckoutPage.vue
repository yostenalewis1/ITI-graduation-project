<template>
    <div class="w-full top-28 relative flex flex-col-reverse md:flex-row gap-5 mb-40 px-10 justify-center items-stretch">
    <div class="w-[60%] border-2 border-indigo-800 rounded-lg flex flex-col ">
        <div class="flex flex-row w-full items-center justify-center gap-2 pt-3">
          <h1 class="text-2xl font-bold font-cairo text-[#3F1A66] leading-9">Complete your order</h1>
          <img src="../assets/cart.svg" alt="cart-icon" class="w-8 h-8" />
        </div>
        <p class="text-lg pl-2 text-indigo-950">Personal Details</p>
  
        <div class="grid grid-cols-2 grid-rows-2 place-items-center gap-y-3 py-4">
          <input type="text" placeholder="Enter Your First Name ..." class="w-[80%] h-12 bg-transparent border-b-2 border-[#3F1A66] text-[#3F1A66] text-lg font-cairo focus:outline-none justify-self-center" />
          <input type="text" placeholder="Enter Your Last Name ..." class="w-[80%] h-12 bg-transparent border-b-2 border-[#3F1A66] text-[#3F1A66] text-lg font-cairo focus:outline-none justify-self-center" />
          <input type="text" placeholder="Enter Your Address ..." class="w-[80%] h-12 bg-transparent border-b-2 border-[#3F1A66] text-[#3F1A66] text-lg font-cairo focus:outline-none justify-self-center" />
          <input type="text" placeholder="+01" class="w-[80%] h-12 bg-transparent border-b-2 border-[#3F1A66] text-[#3F1A66] text-lg font-cairo focus:outline-none justify-self-center" />
        </div>
        <p class="text-lg pl-2 text-indigo-950">Payment Method</p>
  
        <div class="flex flex-col justify-center items-center">
          <div class="flex flex-row justify-center items-center gap-5 py-4">
            <button class="flex items-center justify-center border-2 h-12 w-80 border-indigo-800 border-spacing-2 px-6 py-3 rounded transition-all hover:bg-[#ad89d1]">
              <div class="flex flex-row gap-2">
                <img src="../assets/creditcard.svg" alt="creditcard" />
                <p class="text-indigo-950 text-lg">Online</p>
              </div>
            </button>
  
            <button class="flex items-center justify-center border-2 h-12 w-80 border-indigo-800 border-spacing-2 px-6 py-3 rounded transition-all hover:bg-[#ad89d1]">
              <div class="flex flex-row gap-2">
                <img src="../assets/home.svg" alt="creditcard" />
                <p class="text-indigo-950 text-lg">Cash on delivery</p>
              </div>
            </button>
          </div>
  
          <div class="flex flex-row gap-5 py-2">
            <button><img src="../assets/payment method/credit-card.svg" alt="" /></button>
            <button><img src="../assets/payment method/credit-card (1).svg" alt="" /></button>
            <button><img src="../assets/payment method/PayPal.svg" alt="" /></button>
            <button><img src="../assets/payment method/Mastercard.svg" alt="" /></button>
            <button><img src="../assets/payment method/GooglePay.svg" alt="" /></button>
          </div>
        </div>
        <p class="text-lg pl-2 text-indigo-950">Delivery Date</p>
  
        <NuxtLink to="/confirmation" class="mx-auto w-[80%]">
          <button class="bg-violet-950 w-[80%] h-[50px] rounded-lg text-white font-bold font-cairo mb-5 items-center text-center">
            Complete Shopping
          </button>
        </NuxtLink>
      </div>
  
      <div class="bg-[url('../assets/about-us-cover.png')] bg-cover bg-center h-auto md:h-auto w-[40%] rounded-lg text-center pt-5 flex flex-col justify-between gap-5 md:gap-0">
        <div class="flex flex-col justify-center items-center gap-4">
          <h1 class="text-indigo-950 text-sm font-cairo">Total amount</h1>
          <p class="text-indigo-900 text-2xl font-bold font-cairo">1120.00 LE</p>
        </div>
        <hr class="border-t border-indigo-900 w-[90%] mx-auto opacity-50" />
  
        <h1 class="text-neutral-700 text-sm text-left pl-5 font-cairo">Order summary</h1>
  
        <div class="flex flex-row justify-between px-5">
          <p class="text-md text-black font-cairo">Red Roses Bouquet</p>
          <p class="text-md text-black font-cairo">550.00 EGP</p>
        </div>
  
        <div class="flex flex-row justify-between px-5">
          <p class="text-md text-black font-cairo">White Roses Bouquet</p>
          <p class="text-md text-black font-cairo">550.00 EGP</p>
        </div>
        <hr class="border-t border-indigo-900 w-[90%] mx-auto opacity-50" />
  
        <div class="flex flex-row justify-between px-5">
          <p class="text-md text-black font-cairo">Subtotal</p>
          <p class="text-md text-black font-cairo">1100.00 EGP</p>
        </div>
        <hr class="border-t border-indigo-900 w-[90%] mx-auto opacity-50" />
  
        <div class="flex flex-row justify-between px-5">
          <p class="text-md text-black font-cairo">Shipping</p>
          <p class="text-md text-black font-cairo">20.00 LE</p>
        </div>
  
        <hr class="border-t border-indigo-900 w-[90%] mx-auto opacity-50" />
  
        <div class="flex flex-row justify-between px-5 mb-5">
          <p class="text-indigo-900 text-xl font-bold font-cairo">Total</p>
          <p class="text-indigo-950 text-xl font-cairo">1120.00 EGP</p>
        </div>
      </div>
    </div>
  </template>
  