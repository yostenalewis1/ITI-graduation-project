<script setup>

import {useForm , useField} from "vee-validate";
import * as yup from "yup";

import ForgetPassword from './ForgetPassword.vue';
const showForgetPassword = ref(false);
const emit = defineEmits(['close', 'switch-to-signup','login-success']);
const isLoading = ref(false);

const closeModal = () => {
emit('close');
};

const switchToLogin = () => {
  showForgetPassword.value = false;
};

const schema = yup.object({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
  });

const { handleSubmit , errors } = useForm({
  validationSchema: schema,
});

const { value: email } = useField('email');
const { value: password } = useField('password');


 

const onSubmit = handleSubmit(async(values) => {
  console.log(values);
  if (isLoading.value) return;
  isLoading.value = true;

  const userData = {
    email: values.email,
    password: values.password,
  };
 
  const { data, status, message } = await useAsyncFetch("POST", "/api/v1/auth/signIn", userData);

  isLoading.value = false;
  if (status === 'error') {
  console.error("Error during login:", message);
  console.log("Full response:", { data, status, message });  
  useToastify("Invalid email or password", {
    autoClose: 3000,
    position: ToastifyOption.POSITION.BOTTOM_RIGHT,
    type: ToastifyOption.TYPE.ERROR,
  });
  return;
}


  console.log("login success:", data);
  localStorage.setItem("user",  values.email);
  localStorage.setItem("token", data.token);


  useToastify("Login successfully", {
    autoClose: 2000,
    position: ToastifyOption.POSITION.BOTTOM_RIGHT,
    type: ToastifyOption.TYPE.SUCCESS,
  });

  emit('login-success');
});


</script>

<template>
  <div class="bg-[#8C6E82] rounded-s-2xl flex flex-row rounded-b-2xl w-[1400px] h-[596px] overflow-hidden relative">
    <button @click="emit('close')" class="absolute top-2 right-5 text-white text-4xl">&times;</button>
    <AuthLayout title="Login">
      <Form @submit="onSubmit" class="flex flex-col gap-5 w-[70%] items-center">
        <div class="w-full">
          <input v-model="email" type="email" placeholder="Email" class="w-full h-12 bg-[#8C6E82] border-b-2 border-white text-white text-lg font-cairo focus:outline-none" />
          <p v-if="errors.email" class="text-[#820a0a] text-sm">{{ errors.email }}</p>
        </div>

        <div class="w-full">
          <input v-model="password" type="password" placeholder="Password" class="w-full h-12 bg-[#8C6E82] border-b-2 border-white text-white text-lg font-cairo focus:outline-none" />
          <p v-if="errors.password" class="text-[#820a0a] text-sm">{{ errors.password }}</p>
        </div>

 
        <div class="w-full text-right mb-3">
           <button type="button" @click="showForgetPassword = true" class="font-cairo">Forget password ?</button>
        </div>
       
        <Button type="submit" buttonName="Login" class="w-full" />

        <p>Don't have an account? <button @click="emit('switch-to-signup')" class="underline">Sign Up</button></p>
      </Form>
    </AuthLayout>

     <div v-if="showForgetPassword" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <ForgetPassword @close="closeModal" @switch-to-login="switchToLogin" />
     </div>
  </div>
</template>
