<script setup>
 import {useForm , useField} from "vee-validate";
 import * as yup from "yup";
 import PasswordReset from "../pages/PasswordReset.vue"
 import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const emit = defineEmits(['close', 'switch-to-login']);
const passwordReset = ref(false); 

const closeModal = () => {
emit('close');
};

const switchToLogin = () => {
    passwordReset.value = false;
    emit('switch-to-login');
};
const schema = yup.object({
  email: yup.string()
        .email()
        .required('Email is required'),
  });

const { handleSubmit , errors} = useForm({
  validationSchema: schema,
});

const { value: email } = useField('email');

const onSubmit = handleSubmit(async (values) => {  
  console.log(values);
  const userData = {
    email:values.email,
  };

  const { data, status, message } = await useAsyncFetch("POST", "/api/v1/auth/forgotPass", userData);

  if (status === 'error') {
    console.error("Error Forget pass:", message);
    useToastify("Invalid email", {
      autoClose: 3000,
      position: ToastifyOption.POSITION.BOTTOM_RIGHT,
      type: ToastifyOption.TYPE.ERROR,
    });
    return;  
  }

  console.log("email sent .... ", data);

  useToastify("We sent a code to you ...", {
    autoClose: 2000,
    position: ToastifyOption.POSITION.BOTTOM_RIGHT,
    type: ToastifyOption.TYPE.SUCCESS,
  });
  localStorage.setItem("email", values.email);

  passwordReset.value = true;
});


 
</script>

<template>
 
 <div class="bg-[#8C6E82] flex flex-row rounded-t-2xl rounded-e-2xl w-[1400px] h-[596px] overflow-hidden relative">
    <button @click="emit('close')" class="absolute top-2 right-5 text-white text-4xl z-10">&times;</button>
  
    <form @submit="onSubmit" class="flex flex-col gap-5 w-full md:w-[60%] items-center md:items-start justify-center md:pl-10">
       <div class="text-white text-5xl font-normal font-cairo ">Forget Password</div> 
        <div class="w-full flex flex-col gap-5 md:w-[70%]">
                <p class="text-center md:text-left font-cairo p-5 md:p-0 text-lg md:text-md">Enter the email associated with your account and we’ll send an email with instructions to reset your password</p>
                 
                <div class="text-center md:w-full">
                    <input
                        v-model="email"
                        type="email"
                        placeholder="Enter your email please..."
                        class="w-[70%] md:w-full h-12 bg-[#8C6E82] border-b-2 border-white text-white text-lg font-cairo focus:outline-none"
                    />
                    <p v-if="errors.email" class="text-[#820a0a] text-sm md:text-left">{{ errors.email }}</p>
                 </div>
                 
               <Button type="submit" buttonName="Send e-mail"/>
                <p class="text-center md:text-left">  back to  <button type="button" @click="emit('switch-to-login')" class="underline">Login</button></p>
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

    <div v-if="passwordReset" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <PasswordReset  @close="closeModal" @switch-to-login="switchToLogin"/>
    </div>
 </div>
</template>


 