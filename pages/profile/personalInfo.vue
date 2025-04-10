<script setup>
import {useForm , useField} from "vee-validate";
import * as yup from "yup";


definePageMeta({
  layout: 'profile' 
}) 


const schema = yup.object({
  username : yup.string().required('username is required'),
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  address: yup.string().required('Address is required'),

  });

const { handleSubmit , errors } = useForm({
  validationSchema: schema,
});

const { value: email } = useField('email');
const { value: password } = useField('password');
const { value: username } = useField('username');
const { value: phoneNumber } = useField('phoneNumber');
const { value: address } = useField('address');
 

const onSubmit = handleSubmit((values) => {
  console.log(values);
  emit('login-success')
});
</script>

 

<template>
  <div class="max-w-4xl mx-auto md:mt-20 px-4 space-y-5">
   
    <div class="flex flex-col sm:flex-row items-center gap-4 mt-12">
      <img
        src="../../assets/profile (3).png"
        alt="Profile"
        class="w-20 h-20 rounded-full object-cover"
      />
      <div class="text-center sm:text-left">
        <h2 class="text-2xl font-semibold text-indigo-950">Profile</h2>
        <p class="text-sm text-indigo-950">name@example.com</p>
      </div>
    </div>

   
    <Form @submit="onSubmit">
      <div class="space-y-6">
     
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-x-4">
          <label class="text-lg font-bold text-indigo-950 sm:w-60">Username:</label>
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            :class="[
              'w-full h-12 bg-transparent border-b-2 text-indigo-950 text-lg font-cairo focus:outline-none',
              errors.username ? 'border-red-500' : 'border-indigo-800'
            ]"
          />
        </div>

  
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-x-4">
          <label class="text-lg font-bold text-indigo-950 sm:w-60">E-mail:</label>
          <input
            v-model="email"
            type="email"
            placeholder="E-mail"
            :class="[
              'w-full h-12 bg-transparent border-b-2 text-indigo-950 text-lg font-cairo focus:outline-none',
              errors.email ? 'border-red-500' : 'border-indigo-800'
            ]"
          />
        </div>

        
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-x-4">
          <label class="text-lg font-bold text-indigo-950 sm:w-60">Phone number:</label>
          <input
            v-model="phoneNumber"
            type="text"
            placeholder="Phone number"
            :class="[
              'w-full h-12 bg-transparent border-b-2 text-indigo-950 text-lg font-cairo focus:outline-none',
              errors.phoneNumber ? 'border-red-500' : 'border-indigo-800'
            ]"
          />
        </div>
 
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-x-4">
          <label class="text-lg font-bold text-indigo-950 sm:w-60">Password:</label>
          <input
            v-model="password"
            type="text"
            placeholder="Password"
            :class="[
              'w-full h-12 bg-transparent border-b-2 text-indigo-950 text-lg font-cairo focus:outline-none',
              errors.password ? 'border-red-500' : 'border-indigo-800'
            ]"
          />
        </div>

        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-x-4">
          <label class="text-lg font-bold text-indigo-950 sm:w-60">Address:</label>
          <input
            v-model="address"
            type="text"
            placeholder="Address"
            :class="[
              'w-full h-12 bg-transparent border-b-2 text-indigo-950 text-lg font-cairo focus:outline-none',
              errors.address ? 'border-red-500' : 'border-indigo-800'
            ]"
          />
        </div>
      </div>

  
      <div class="pt-8">
        <button
          type="submit"
          class="w-full py-3 bg-[#4c1f7a] hover:bg-[#5a2c8c] text-white text-lg font-semibold rounded-xl transition"
        >
          Edit
        </button>
      </div>
    </Form>
  </div>
</template>
