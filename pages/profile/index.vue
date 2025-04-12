<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';  
const router = useRouter();

definePageMeta({
  layout: 'profile',
});

 

const userName = ref('');
const email = ref('')
const address = ref('')
const mobileNumber = ref('')


onMounted(async()=> {
  const user = await useUser();
  console.log("user from combosables : ",user );
  userName.value = user?.userName
  email.value = user?.email
  address.value = user?.address
  mobileNumber.value = user?.mobileNumber
})

const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  }
   const token = useCookie('token');
   token.value = null; 
   router.push('/');
};

</script>
 


<template>    
 <div class="max-w-3xl mx-auto p-6 space-y-10">
 
  <div class="flex items-center gap-4 mt-12">
    <img
      src="../../assets/cartoon girl.jpg"
      alt="Profile"
      class="w-[90px] h-[90px] rounded-full object-cover"
    />
    <div>
      <h2 class="text-2xl font-semibold text-indigo-950"> Hello {{userName}} , welcome back !  </h2>
      <p class="text-sm text-indigo-950"> your email is : {{ email }} </p>
      <p class="text-sm text-indigo-950"> your address is : {{ address }} </p>
      <p class="text-sm text-indigo-950"> your Phone Number is : {{ mobileNumber }} </p>
      
    </div>
  </div>
  
  <p  class="text-sm text-indigo-950"> Please go to Personal information to complete your informations</p>
  <button @click="logout();" class="border rounded-xl p-2 ml-2 px-3 bg-indigo-950 text-white">Logout</button>
  
</div>

        
    
    
      </template>
      
    