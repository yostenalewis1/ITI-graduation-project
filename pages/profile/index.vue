<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'profile',
});
 
 

const userName = ref('');
if (typeof window !== 'undefined') {
  userName.value = localStorage.getItem("userName");
}

// onMounted(async () => {
//     try {
  
//       const { data, status, message } = await useAsyncFetch('GET', '/api/v1/users/user');
//       console.log("User data fetched successfully:", data);
//        console.log("Status:", status); 
//        console.log("username:", data.user.firstName);
//        userName.value = data.user.firstName;
//       // if (status !== 'error' && data?.firstName) {
//       //   userName.value = data.firstName;   
//       //   localStorage.setItem("user", data.firstName);   
//       // } else {
//       //   console.log("Error:", message);
//       // }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   }
// );
</script>
 


<template>    
 <div class="max-w-3xl mx-auto p-6 mt-20 space-y-10">
 
  <div class="flex items-center gap-4 mt-12">
    <img
      src="../../assets/profile (3).png"
      alt="Profile"
      class="w-20 h-20 rounded-full object-cover"
    />
    <div>
      <h2 class="text-2xl font-semibold text-indigo-950"> Hello {{userName}} , welcome back !  </h2>
      <p class="text-sm text-indigo-950"> </p>
    </div>
  </div>

  
</div>

        
    
    
      </template>
      
    