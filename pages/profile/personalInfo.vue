<script setup>
import { useForm, useField, Form } from 'vee-validate';
import * as yup from "yup";

definePageMeta({
  layout: 'profile' 
}) 

const userName = ref('')
const userEmail = ref('')

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().required('Email is required'),
  // phoneNumber: yup.string().required('Phone number is required'),
  // address: yup
  // .string()
  // .required('Address is required')
  // .test('is-valid-address', 'Address must be in the correct format', (value) => {
  //   return value && value.split(',').length > 0; // تأكد من أن العنوان يحتوي على قيمة واحدة على الأقل
  // })
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const { value: firstName } = useField('firstName');
const { value: lastName } = useField('lastName');
const { value: email } = useField('email');
// const { value: phoneNumber } = useField('phoneNumber');
// const { value: address } = useField('address');

onMounted(async()=>{
  const user = await useUser();
  console.log("user from compo : " , user);
  firstName.value = user?.firstName || '';
  lastName.value = user?.lastName || '';
  userName.value = user?.userName 
  userEmail.value = user?.email 
  email.value = user?.email || '';
  // phoneNumber.value = user?.phoneNumber || '';  
  // address.value = Array.isArray(user?.address) ? user.address.join(', ') : '';
})

const onSubmit = handleSubmit(async(values) => {
  console.log("Form values:", values);

  // const addressArray = values.address.split(',').map((el) => el.trim()).filter(Boolean);

  const userData = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    // phoneNumber: values.phoneNumber,
    // address: addressArray 
  
  }
  const {data,status, message} =await useAsyncFetch('PUT','/api/v1/users/updateData',userData)
   
  if(status == 'error') {
    console.error("Error updating user data:", message);
    useToastify("Error updating user data", {
      autoClose: 3000,
      position: ToastifyOption.POSITION.BOTTOM_RIGHT,
      type: ToastifyOption.TYPE.ERROR,
    });
    return;
  }
  console.log("User data updated successfully:", data);
  useToastify("User data updated successfully", {
    autoClose: 2000,
    position: ToastifyOption.POSITION.BOTTOM_RIGHT,
    type: ToastifyOption.TYPE.SUCCESS,
  });

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
        <h2 class="text-2xl font-semibold text-indigo-950">{{ userName }}</h2>
        <p class="text-sm text-indigo-950">{{ userEmail }}</p>
      </div>
    </div>

   
    <Form @submit="onSubmit">
      <div class="space-y-6">
     
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-x-4">
          <label class="text-lg font-bold text-indigo-950 sm:w-60">firstName:</label>
          <input
            v-model="firstName"
            type="text"
            placeholder="Username"
            :class="[
              'w-full h-12 bg-transparent border-b-2 text-indigo-950 text-lg font-cairo focus:outline-none',
              errors.firstName ? 'border-red-500' : 'border-indigo-800'
            ]"
          />
        </div>

        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-x-4">
          <label class="text-lg font-bold text-indigo-950 sm:w-60">lastName:</label>
          <input
            v-model="lastName"
            type="text"
            placeholder="Username"
            :class="[
              'w-full h-12 bg-transparent border-b-2 text-indigo-950 text-lg font-cairo focus:outline-none',
              errors.lastName ? 'border-red-500' : 'border-indigo-800'
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

        
        <!-- <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-x-4">
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
  -->
<!-- 
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
        </div> -->

      </div>

     <div class="p-6">
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
