<script setup >
import {useForm , useField} from "vee-validate";
import * as yup from "yup";
import ConfirmResetPassword from '../pages/ConfirmResetPassword.vue';

const emit = defineEmits(['close','switch-to-login']);
const confirmPage = ref(false);
const closeModal = () => {
emit('close');
};

const schema = yup.object({
  newPassword: yup.string()
           .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must be at least 1 uppercase, 1 lowercase, 1 number and 1 special character')
           .required('Password is required'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm Password is required'),
  });
  
const { handleSubmit , errors} = useForm({
  validationSchema: schema,
});
 
const { value: newPassword } = useField('newPassword');
const { value: confirmPassword } = useField('confirmPassword');

const onSubmit = handleSubmit(async(values) => {
  console.log(values);

    const userData = {
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    };

    const { data, status, message } = await useAsyncFetch("PUT", "/api/v1/auth/resetPassword", userData);


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

  confirmPage.value = true; 
});

const switchToLogin = () => {
  confirmPage.value = false;
  emit('switch-to-login');
};
</script>
 
<template>
 <div class="bg-[#8C6E82] flex flex-row rounded-t-2xl rounded-e-2xl w-[1400px] h-[596px] overflow-hidden relative">
    <button @click="emit('close')" class="absolute top-2 right-5 text-white text-4xl z-10">&times;</button>
  
    <form  @submit="onSubmit" class="flex flex-col gap-5 w-full md:w-[60%] items-center md:items-start justify-center md:pl-10 text-center md:text-left">
       <div class="text-white text-4xl md:text-5xl font-normal font-cairo">Set New Password</div> 

        <div class="flex flex-col gap-5 w-[70%]">
                <p class="font-cairo text-md">must be at least 8 character</p>
              
                <form @submit="onSubmit" class="flex flex-col gap-5 w-full md:w-[70%] items-center">
 
                    <div class="w-full">
                    <input v-model="newPassword" type="password" placeholder="New Password" class="w-full h-12 bg-[#8C6E82] border-b-2 border-white text-white text-lg font-cairo focus:outline-none" />
                    <p v-if="errors.newPassword" class="text-[#820a0a] text-sm">{{ errors.newPassword }}</p>
                    </div>

                    <div class="w-full">
                    <input v-model="confirmPassword" type="password" placeholder="Confirm Password" class="w-full h-12 bg-[#8C6E82] border-b-2 border-white text-white text-lg font-cairo focus:outline-none" />
                    <p v-if="errors.confirmPassword" class="text-[#820a0a] text-sm">{{ errors.confirmPassword }}</p>
                    </div>
            
                     <Button type="submit" buttonName="Reset Password"/>
                     <p>back to<button type="button" @click="emit('switch-to-login')" class="underline">Login</button></p>
                  </form> 
        </div>
    </form>  
  
    <div class="hidden md:block relative w-[40%] overflow-hidden">
        <img src="../assets/bg-signup.png" alt="bg-signup" class="w-full h-full object-cover " />
        <div class="rounded-e-2xl absolute inset-0 bg-gray-600 bg-opacity-60 flex flex-col justify-center items-center gap-6">
            <p class="text-center text-white text-5xl font-normal font-cairo">Welcome <br />to</p>
            <div class="flex flex-col justify-center items-center">
            <img src="../assets/Group.png" alt="logo" class="rounded-e-2xl" />
            <img src="../assets/flower.png" alt="logo" class="-mt-20 w-36" />
            </div>
        </div>
    </div>

    <div v-if="confirmPage" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <ConfirmResetPassword @close="closeModal" @switch-to-login="switchToLogin"/>
    </div>
 </div>
</template>