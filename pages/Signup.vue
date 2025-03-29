<script setup>
 import {useForm , useField} from "vee-validate";
 import * as yup from "yup";


const emit = defineEmits(['close', 'switch-to-login']);

const schema = yup.object({
  fullName: yup.string()
      .required('Full Name is required')
      .strict()
      .matches(/^[a-zA-Z\s]+$/, "Full Name must contain only letters"),

  email: yup.string()
        .email()
        .required('Email is required'),

  password: yup.string()
           .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must be at least 1 uppercase, 1 lowercase, 1 number and 1 special character')
           .required('Password is required'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  });

const { handleSubmit , errors , resetForm } = useForm({
  validationSchema: schema,
});

const { value: fullName } = useField('fullName');
const { value: email } = useField('email');
const { value: password } = useField('password');
const { value: confirmPassword } = useField('confirmPassword');

function testToastify() {
 
  useToastify("Your account has been submitted successfully", {
    autoClose: 2000,
    position: ToastifyOption.POSITION.BOTTOM_RIGHT,
    type: ToastifyOption.TYPE.SUCCESS,
  }); 
}
 

const onSubmit = handleSubmit((values) => {
  console.log(values);
  testToastify();
  resetForm()
  setTimeout(() => {
    emit('switch-to-login');
  }, 2000)
});

</script>

<template>
  <div class="bg-[#8C6E82] rounded-s-2xl flex flex-row rounded-b-2xl w-[1400px] h-[596px] overflow-hidden relative">
  
    <button @click="emit('close')" class="absolute top-2 right-5 text-white text-4xl">&times;</button>

    <AuthLayout title="Sign Up">
      <form @submit="onSubmit" class="flex flex-col gap-5 w-[70%] items-center">
        <div class="w-full">
          <input v-model="fullName" type="text" placeholder="Full Name" class="w-full h-12 bg-[#8C6E82] border-b-2 border-white text-white text-lg font-cairo focus:outline-none" />
          <p v-if="errors.fullName" class="text-[#820a0a] text-sm">{{ errors.fullName }}</p>
        </div>

        <div class="w-full">
          <input v-model="email" type="email" placeholder="Email" class="w-full h-12 bg-[#8C6E82] border-b-2 border-white text-white text-lg font-cairo focus:outline-none" />
          <p v-if="errors.email" class="text-[#820a0a] text-sm">{{ errors.email }}</p>
        </div>

        <div class="w-full">
          <input v-model="password" type="password" placeholder="Password" class="w-full h-12 bg-[#8C6E82] border-b-2 border-white text-white text-lg font-cairo focus:outline-none" />
          <p v-if="errors.password" class="text-[#820a0a] text-sm">{{ errors.password }}</p>
        </div>

        <div class="w-full">
          <input v-model="confirmPassword" type="password" placeholder="Confirm Password" class="w-full h-12 bg-[#8C6E82] border-b-2 border-white text-white text-lg font-cairo focus:outline-none" />
          <p v-if="errors.confirmPassword" class="text-[#820a0a] text-sm">{{ errors.confirmPassword }}</p>
        </div>

        <Button type="submit" buttonName="SIGN UP" class="w-full" />
        <p>Already have an account? <button @click="emit('switch-to-login')" class="underline">Login</button></p>
     

      </form>
    </AuthLayout>
  </div>
</template>