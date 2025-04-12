<script setup>
import { useForm, useField, Form } from 'vee-validate';
import * as yup from 'yup';

definePageMeta({
  layout: 'profile'
});


const schema = yup.object({
  currentPassword: yup.string().required('Password is required'),
  newPassword: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const { value: currentPassword } = useField('currentPassword');
const { value: newPassword } = useField('newPassword');
const { value: confirmPassword } = useField('confirmPassword');

const onSubmit = handleSubmit(async (values) => {
  console.log(values);

  const userData = {
    currentPassword: values.currentPassword,
    newPassword: values.newPassword,
    confirmPassword: values.confirmPassword,
  };

  const { data, status, message } = await useAsyncFetch("PUT", "/api/v1/users/updatePassword", userData);
 

  if (status === 'error') {
    console.error("Error updating password:", message);
    useToastify("Error updating password , please check on your password again .", {
      autoClose: 3000,
      position: ToastifyOption.POSITION.BOTTOM_RIGHT,
      type: ToastifyOption.TYPE.ERROR,
    });
    return;
  }

  console.log('Password updated successfully:', data);
  useToastify('Password updated successfully', {
    autoClose: 2000,
    position: ToastifyOption.POSITION.BOTTOM_RIGHT,
    type: ToastifyOption.TYPE.SUCCESS,
  });
});
</script>

<template>
   <div class="w-[90%] mx-auto md:mt-20 space-y-5">
   
   <div class="flex items-center gap-4 mt-12">
     <h2 class="text-xl sm:text-2xl font-cairo font-bold text-indigo-950">Change your password</h2>
   </div>


  <Form @submit="onSubmit">
    <div class="flex flex-col sm:flex-row items-center gap-2">
      <label class="w-full sm:w-[25%] text-base sm:text-xl text-indigo-950">Current password:</label>
      <input v-model="currentPassword" type="password" placeholder="current Password"
        class="w-full sm:w-[60%] h-10 sm:h-12 bg-transparent border-b-2 border-indigo-800 text-indigo-950 text-base sm:text-lg font-cairo focus:outline-none" />
       <p v-if="errors.currentPassword" class="text-[#820a0a] text-sm">{{ errors.currentPassword }}</p>
    </div>

    <div class="flex flex-col sm:flex-row items-center gap-2">
      <label class="w-full sm:w-[25%] text-base sm:text-xl text-indigo-950">New password:</label>
      <input v-model="newPassword" type="password" placeholder="new Password"
        class="w-full sm:w-[60%] h-10 sm:h-12 bg-transparent border-b-2 border-indigo-800 text-indigo-950 text-base sm:text-lg font-cairo focus:outline-none" />
      <p v-if="errors.newPassword" class="text-[#820a0a] text-sm">{{ errors.newPassword }}</p>
    </div>

    <div class="flex flex-col sm:flex-row items-center gap-2">
      <label class="w-full sm:w-[25%] text-base sm:text-xl text-indigo-950">Confirm New password:</label>
      <input v-model="confirmPassword" type="password" placeholder="confirm Password"
        class="w-full sm:w-[60%] h-10 sm:h-12 bg-transparent border-b-2 border-indigo-800 text-indigo-950 text-base sm:text-lg font-cairo focus:outline-none" />
      <p v-if="errors.confirmPassword" class="text-[#820a0a] text-sm">{{ errors.confirmPassword }}</p>
    </div>

    <div class="pt-8">
    <Button type="submit" buttonName="Change password" />
    </div>
  
  </Form>


 </div>
</template>

