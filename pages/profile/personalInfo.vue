<script setup>
import { ref, onMounted } from 'vue';
import { useForm, useField, Form } from 'vee-validate';
import * as yup from "yup";

definePageMeta({
  layout: 'profile' 
}) 

const token = useCookie("token");
const config = useRuntimeConfig();
const userName = ref('');
const userEmail = ref('');
const profileImage = ref(null);
const profileImageUrl = ref('https://archive.org/download/placeholder-image/placeholder-image.jpg');
const loading = ref(true);
const error = ref(null);

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  city: yup.string().required('City is required'),
  street: yup.string().required('Street is required'),
  mobileNumber: yup.string().required('Phone number is required'),
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const { value: firstName } = useField('firstName');
const { value: lastName } = useField('lastName');
const { value: email } = useField('email');
const { value: city } = useField('city');
const { value: street } = useField('street');
const { value: mobileNumber } = useField('mobileNumber');

onMounted(async () => {
  const user = await useUser();
  console.log("User data from component:", user);
  firstName.value = user?.firstName || '';
  lastName.value = user?.lastName || '';
  userName.value = user?.userName;
  userEmail.value = user?.email;
  email.value = user?.email || '';
  city.value = user?.city || '';
  street.value = user?.street || '';
  mobileNumber.value = user?.mobileNumber || '';
  profileImageUrl.value = user?.image || 'https://archive.org/download/placeholder-image/placeholder-image.jpg';
  loading.value=false
});

const onSubmit = handleSubmit(async (values) => {
  console.log("Form values:", values);

  const formData = new FormData();
  formData.append('firstName', values.firstName);
  formData.append('lastName', values.lastName);
  formData.append('email', values.email);
  formData.append('city', values.city);
  formData.append('street', values.street);
  formData.append('mobileNumber', values.mobileNumber);

  if (profileImage.value) {
    formData.append('image', profileImage.value);
  }

  // Log FormData contents
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  try {
    const response = await fetch(`${config.public.baseUrl || "https://flower-shop-db.vercel.app"}/api/v1/users/updateData`, {
      method: 'PUT',
      body: formData,
      headers: {
        authorization: `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update user data');
    }

    const data = await response.json();
    console.log('Profile updated successfully:', data);
    useToastify("User data updated successfully", {
      autoClose: 2000,
      position: ToastifyOption.POSITION.BOTTOM_RIGHT,
      type: ToastifyOption.TYPE.SUCCESS,
    });
    // Update local state or store with new user data
  } catch (error) {
    console.error('Error updating profile:', error);
    useToastify("Error updating user data", {
      autoClose: 3000,
      position: ToastifyOption.POSITION.BOTTOM_RIGHT,
      type: ToastifyOption.TYPE.ERROR,
    });
  }
});

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    profileImage.value = file;
    profileImageUrl.value = URL.createObjectURL(file); // Update preview
  }
  console.log("Selected file:", profileImage.value);
};
</script>

<template>
  <div v-if="loading" class=" flex justify-center items-center h-screen">
      <LoadingIndicator />
    </div>
    <div v-else-if="error" class="flex justify-center items-center h-screen">
      <ErrorMessageIndicator :message="error" />
    </div>  
  <div v-else class="max-w-4xl mx-auto md:mt-20 px-4 space-y-5">
    
    <div class="flex flex-col sm:flex-row items-center gap-4 mt-12">
      <label for="fileInput" class="custom-file-label">
      <img
        :src="profileImageUrl"
        alt="Profile"
        class="w-[90px] h-[90px] rounded-full object-cover cursor-pointer"
      />
    </label>
      <div class="text-center sm:text-left">
        <h2 class="text-2xl font-semibold text-indigo-950">{{ userName }}</h2>
        <p class="text-sm text-indigo-950">{{ userEmail }}</p>
      </div>
    </div>
    <Form @submit="onSubmit">
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-x-4">
          <div class="file-input-wrapper">
            <input
            type="file"
            accept="image/*"
            @change="handleImageChange"
            class="hidden"
            id="fileInput"
            />
      
    <span class="file-name">{{ selectedFileName }}</span>
  </div>
        </div>

        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-x-4">
          <label class="text-lg font-bold text-indigo-950 sm:w-60">First Name:</label>
          <input
            v-model="firstName"
            type="text"
            placeholder="First Name"
            :class="[
              'w-full h-12 bg-transparent border-b-2 text-indigo-950 text-lg font-cairo focus:outline-none',
              errors.firstName ? 'border-red-500' : 'border-indigo-800'
            ]"
          />
        </div>

        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-x-4">
          <label class="text-lg font-bold text-indigo-950 sm:w-60">Last Name:</label>
          <input
            v-model="lastName"
            type="text"
            placeholder="Last Name"
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

        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-x-4">
          <label class="text-lg font-bold text-indigo-950 sm:w-60">Phone Number:</label>
          <input
            v-model="mobileNumber"
            type="text"
            placeholder="Phone Number"
            :class="[
              'w-full h-12 bg-transparent border-b-2 text-indigo-950 text-lg font-cairo focus:outline-none',
              errors.mobileNumber ? 'border-red-500' : 'border-indigo-800'
            ]"
          />
        </div>

        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-x-4">
          <label class="text-lg font-bold text-indigo-950 sm:w-60">Address:</label>
          <div class="w-full flex flex-col sm:flex-row gap-2">
            <input
              v-model="city"
              type="text"
              placeholder="City"
              :class="[
                'w-full sm:w-1/2 h-12 bg-transparent border-b-2 text-indigo-950 text-lg font-cairo focus:outline-none',
                errors.city ? 'border-red-500' : 'border-indigo-800'
              ]"
            />
            <input
              v-model="street"
              type="text"
              placeholder="Street"
              :class="[
                'w-full sm:w-1/2 h-12 bg-transparent border-b-2 text-indigo-950 text-lg font-cairo focus:outline-none',
                errors.street ? 'border-red-500' : 'border-indigo-800'
              ]"
            />
          </div>
        </div>
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