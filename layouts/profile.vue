<!-- <script setup> 
</script>

<template>
     <div class="flex flex-col min-h-screen"> 
     <Header />
    <div class=" grow  flex flex-row ">
        <Sidebar />
      <slot />
    
    </div>

    <Footer class=""/>

     
  </div>
 </template> -->



 <!-- <template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <div class="flex flex-col items-center justify-center md:flex-row flex-grow gap-16 w-full">
     
      <div class="w-full md:w-[20%] absolute top-32 md:top-56 ">
        <Sidebar />
      </div>

   
       <div class="flex-grow p-6 w-full">
        <slot />
      </div>
    </div>

  </div>
</template> -->

<template>

<div class="flex flex-col min-h-screen">
  <Header />

  <div class="flex flex-col items-center justify-center md:flex-row flex-grow   w-full">
  
    <div class="w-full md:w-[20%] mt-32 md:mt-0">
      <Sidebar />
      <hr class="border-t border-indigo-900 w-[90%] mx-auto opacity-50 mt-4 block md:hidden" />
    </div>
 
    <div class="flex-grow p-6 w-full md:w-[80%]">
      <slot />
    </div>
  </div>

  <!-- <Footer /> -->
</div>

</template>
