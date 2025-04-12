<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'profile',
});
 
 

const userName = ref('');
const email = ref('')
const address = ref('')


onMounted(async()=> {
  const user = await useUser();
  console.log("user from combosables : ",user );
  userName.value = user?.userName
  email.value = user?.email
  address.value = user?.address
})


</script>
 


<template>    
 <div class="max-w-3xl mx-auto p-6 space-y-10">
 
  <div class="flex items-center gap-4 mt-12">
    <img
      src="../../assets/profile (3).png"
      alt="Profile"
      class="w-20 h-20 rounded-full object-cover"
    />
    <div>
      <h2 class="text-2xl font-semibold text-indigo-950"> Hello {{userName}} , welcome back !  </h2>
      <p class="text-sm text-indigo-950"> your email is : {{ email }} </p>
      <p class="text-sm text-indigo-950"> your address is : {{ address }} </p>
      
    </div>
  </div>

  
</div>

        
    
    
      </template>
      
    