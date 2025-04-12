<template>
    <div class="flex items-start pl-10 ">
      <div class="flex flex-col items-start space-y-4">
        <NuxtLink to="/profile/personalInfo">
             <div class="flex gap-2 items-center justify-center">
                 <p class="text-indigo-950 text-xl font-cairo font-bold ">Personal information</p>
                 <img src="../assets/arrow.svg" alt="Arrow"  />
              </div>  
        </NuxtLink>
        
        <NuxtLink to="/profile/changePass">
             <div class="flex gap-2 items-center justify-center">
                 <p class="text-indigo-950 text-xl font-cairo font-bold ">Change password</p>
                 <img src="../assets/arrow.svg" alt="Arrow"  />
             </div>
        </NuxtLink>
        

        <NuxtLink>
             <div class="flex gap-2 items-center justify-center">
                 <p class="text-indigo-950 text-xl font-cairo font-bold ">All orders</p>
                 <img src="../assets/arrow.svg" alt="Arrow"  />
             </div>
        </NuxtLink>


        
      </div>
    </div>
  </template>