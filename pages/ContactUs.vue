<template>

<div class="relative w-full min-h-screen bg-[url('../assets/about-us-cover.png')] bg-cover bg-center mb-3 md:mb-10">
      
      
      <div class="absolute inset-0 bg-slate-900 bg-opacity-35 z-0"></div>
       
       <img src="../assets/Rectangle.png" alt="Rectangle" class="hidden md:block absolute inset-0 top-[300px] " />
    <div class="w-full absolute inset-0 top-36 md:top-28 flex flex-col justify-center items-center gap-2">
        <h1 class="text-indigo-950 text-5xl font-semibolde font-cairo"> Contact Us</h1>
        <p class="text-indigo-950 font-normal text-lg font-cairo md:w-[800px] text-center">We love hearing from our customers! If you have any questions, suggestions, or feedback, Please feel free to get in touch.</p>
    
    
        <div class="flex justify-evenly items-center w-full"> 

            <div class="hidden md:flex flex-col gap-5"> 
                <div class="flex flex-row gap-2">
                      <div class=" rounded-full p-3 bg-[#26103D]">
                        <img src="../assets/email.svg" alt="phone" class="w-6 h-6" />
                      </div>
                     
                      <div class="flex flex-col">
                         <h2 class="font-cairo font-bold text-md">Email</h2>
                         <p  class="font-cairo" >Rozato@gmail.com</p>
                      </div>
                    
                  </div>
                  
                  <div class="flex flex-row gap-2">
                      <div class=" rounded-full p-3 bg-[#26103D] items-center">
                        <img src="../assets/phone.svg" alt="phone" class="w-6 h-6" />
                      </div>
                     
                      <div class="flex flex-col">
                         <h2  class="font-cairo font-bold text-md" >Phone</h2>
                         <p  class="font-cairo">+010-151-5114</p>
                      </div>
                    
                  </div>
            </div>


            <div class="bg-zinc-300 w-[95%] md:w-full  p-6 rounded-s-3xl rounded-t-3xl shadow-lg mt-6 max-w-md relative pl-10">
                <h2 class="text-3xl font-semibold text-indigo-950 font-cairo">Get in Touch!</h2>
                   <div class="flex flex-col">
                  
                        <input  type="Full name" placeholder="Full name" class="w-full h-12 bg-transparent border-b-2 border-white text-indigo-950 text-lg font-cairo focus:outline-none" />
                        <input  type="email" placeholder="Email" class="w-full h-12 bg-transparent border-b-2 border-white text-indigo-950 text-lg font-cairo focus:outline-none" />
                        <input  type="phone" placeholder="Phone" class="w-full h-12 bg-transparent border-b-2 border-white text-indigo-950 text-lg font-cairo focus:outline-none" />
                        <textarea 
                            placeholder="Write something" 
                            class="w-full h-32 bg-transparent border-b-2 border-white text-indigo-950 text-lg font-cairo focus:outline-none resize-none"
                        ></textarea>
                        
                        <button class="w-40 mt-5 py-2 bg-[#26103D] rounded-2xl justify-center items-center gap-2">
                            <p class="text-white font-cairo"> Send message </p>
                      </button>
        
                   </div>
             </div>
         </div>
    </div>
</div>
  </template>
  