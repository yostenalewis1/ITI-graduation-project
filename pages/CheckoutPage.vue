<template>
  <div
    v-if="loading"
    class="fixed inset-0 flex items-center justify-center z-50 bg-stone-300"
  >
    <LoadingIndicator />
  </div>
  <div class="w-full top-28 relative flex flex-col md:flex-row gap-5 mb-40 px-10 justify-center items-stretch">
    <div class="min-w-[60%] lg:text-left sm:text-center border-2 border-indigo-800 rounded-lg flex flex-col px-10">
      <div class="flex flex-row w-full items-center justify-center gap-2 pt-3">
        <h1 class="text-2xl font-bold font-cairo text-[#3F1A66] leading-9">Complete your order</h1>
        <img src="../assets/cart.svg" alt="cart-icon" class="w-8 h-8" />
      </div>
      <p class="text-lg text-indigo-950">Personal Details</p>

      <form @submit.prevent="completeOrder">
        <div class="w-[90%] mx-auto">
          <div class="flex justify-between">
            <div class="w-[49%]">
              <input v-model="firstName" type="text" placeholder="Enter Your First Name ..." class="w-[100%] h-12 bg-transparent border-b-2 border-[#3F1A66] text-[#3F1A66] text-lg font-cairo focus:outline-none justify-self-center" />
              <br><span v-if="errors.firstName" class="text-red-500">{{ errors.firstName }}</span>
            </div>
            <div class="w-[49%]">
              <input v-model="lastName" type="text" placeholder="Enter Your Last Name ..." class="w-[100%] h-12 bg-transparent border-b-2 border-[#3F1A66] text-[#3F1A66] text-lg font-cairo focus:outline-none justify-self-center" />
              <br><span v-if="errors.lastName" class="text-red-500">{{ errors.lastName }}</span>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="w-[49%]">
              <input v-model="city" type="text" placeholder="Enter Your City ..." class="w-[100%] h-12 bg-transparent border-b-2 border-[#3F1A66] text-[#3F1A66] text-lg font-cairo focus:outline-none justify-self-center" />
              <br><span v-if="errors.city" class="text-red-500">{{ errors.city }}</span>
            </div>
            <div class="w-[49%]">
              <input v-model="mobileNumber" type="text" placeholder="+01" class="w-[100%] h-12 bg-transparent border-b-2 border-[#3F1A66] text-[#3F1A66] text-lg font-cairo focus:outline-none justify-self-center" />
              <br><span v-if="errors.mobileNumber" class="text-red-500">{{ errors.mobileNumber }}</span>
            </div>
          </div>
          <div class="mx-auto">
            <input v-model="details" type="text" placeholder="Details..." class="w-[100%] h-12 bg-transparent border-b-2 border-[#3F1A66] text-[#3F1A66] text-lg font-cairo focus:outline-none justify-self-center" />
            <br><span v-if="errors.details" class="text-red-500">{{ errors.details }}</span>
          </div>
        </div>
        <p class="text-lg text-indigo-950">Payment Method</p>

        <div class="flex flex-col justify-between items-center">
          <div class="w-[90%] flex lg:flex-row sm:flex-col justify-center items-center gap-2 py-4">
            <button type="button" @click="selectPaymentMethod('card')" :class="{'bg-[#ad89d1]': paymentMethod === 'card'}" class="flex items-center justify-center border-2 h-12 lg:w-[50%] border-indigo-800 border-spacing-2 px-6 py-3 rounded transition-all hover:bg-[#ad89d1]">
              <div class="flex gap-2">
                <img src="../assets/creditcard.svg" alt="creditcard" />
                <p class="text-indigo-950 text-sm">Online</p>
              </div>
            </button>

            <button type="button" @click="selectPaymentMethod('cash')" :class="{'bg-[#ad89d1]': paymentMethod === 'cash'}" class="flex items-center justify-center border-2 h-12 w-[50%] border-indigo-800 border-spacing-2 px-6 py-3 rounded transition-all hover:bg-[#ad89d1]">
              <div class="flex flex-row gap-2">
                <img src="../assets/home.svg" alt="creditcard" />
                <p class="text-indigo-950 text-sn">Cash on delivery</p>
              </div>
            </button>
          </div>

          <div class="w-100 flex gap-5 py-2">
            <button><img src="../assets/payment method/credit-card.svg" alt="" /></button>
            <button><img src="../assets/payment method/credit-card (1).svg" alt="" /></button>
            <button><img src="../assets/payment method/PayPal.svg" alt="" /></button>
            <button><img src="../assets/payment method/Mastercard.svg" alt="" /></button>
            <button><img src="../assets/payment method/GooglePay.svg" alt="" /></button>
          </div>
        </div>

        <div class="text-center">
          <button type="submit" class="bg-violet-950 w-[80%] mx-auto h-[50px] rounded-lg text-white font-bold font-cairo mb-5 items-center text-center">
            Complete Shopping
          </button>
        </div>
      </form>
    </div>

    <div class="bg-[url('../assets/about-us-cover.png')] bg-cover bg-center h-auto md:h-auto min-w-[40%] rounded-lg text-center pt-5 flex flex-col justify-between gap-5 md:gap-0">
      <div class="flex flex-col justify-center items-center gap-4">
        <h1 class="text-indigo-950 text-sm font-cairo">Total amount</h1>
        <p class="text-indigo-900 text-2xl font-bold font-cairo">{{ cartData.total }} LE</p>
      </div>
      <hr class="border-t border-indigo-900 w-[90%] mx-auto opacity-50" />

      <h1 class="text-neutral-700 text-sm text-left pl-5 font-cairo">Order summary</h1>

      <div v-for="item in cartItems" :key="item.product._id" class="flex flex-row justify-between px-5">
        <p class="text-md text-black font-cairo">{{ item.product.title }}</p>
        <p class="text-md text-black font-cairo">{{ item.price * item.quantity }} EGP</p>
      </div>
      <hr class="border-t border-indigo-900 w-[90%] mx-auto opacity-50" />

      <div class="flex flex-row justify-between px-5">
        <p class="text-md text-black font-cairo">Subtotal</p>
        <p class="text-md text-black font-cairo">{{ cartData.subTotal }} EGP</p>
      </div>
      <hr class="border-t border-indigo-900 w-[90%] mx-auto opacity-50" />

      <div class="flex flex-row justify-between px-5">
        <p class="text-md text-black font-cairo">Shipping</p>
        <p class="text-md text-black font-cairo">20.00 LE</p>
      </div>

      <hr class="border-t border-indigo-900 w-[90%] mx-auto opacity-50" />
      <div class="flex flex-row justify-between px-5">
        <p class="text-md text-black font-cairo">Discount</p>
        <p class="text-md text-black font-cairo">{{ cartData.discount }} %</p>
      </div>

      <hr class="border-t border-indigo-900 w-[90%] mx-auto opacity-50" />

      <div class="flex flex-row justify-between px-5 mb-5">
        <p class="text-indigo-900 text-xl font-bold font-cairo">Total</p>
        <p class="text-indigo-950 text-xl font-cairo">{{ cartData.total +20}} EGP</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';

import * as yup from 'yup';

const router = useRouter();


const schema = yup.object({
  firstName: yup.string().required('First name is required').matches(/^[a-zA-Z\s]+$/, "First Name must be a string"),
  lastName: yup.string().required('Last name is required').matches(/^[a-zA-Z\s]+$/, "Last Name must be a string"),
  city: yup.string().required('City is required'),
  mobileNumber: yup.string().required('Mobile number is required').matches(/^01[0-2,5]{1}[0-9]{8}$/, 'Invalid mobile number'),
  details: yup.string().required('Details are required'),
  paymentMethod: yup.string().oneOf(['card', 'cash'], 'Invalid payment method').required('Payment method is required'),
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
  
});
const { value: firstName } = useField('firstName');
const { value: lastName } = useField('lastName');
const { value: city } = useField('city');
const { value: mobileNumber } = useField('mobileNumber');
const { value: details } = useField('details');
const { value: paymentMethod, setValue: setPaymentMethod } = useField('paymentMethod');

const {cartData,cartItems,loading,fetchCart}=useCart()


onMounted(() => {
  fetchCart();
});

const selectPaymentMethod = (method) => {
  setPaymentMethod(method) ; // Update the mutable values object
};
const completeOrder = handleSubmit(async(values) => {
  console.log(values);
  const userData = {
    firstName: values.firstName,
    lastName: values.lastName,
  };
  console.log(userData);
  
  const shippingAddress={shippingAddress: {
        details: values.details,
        mobileNumber: values.mobileNumber,
        city: values.city,
      },
      paymentMethod: values.paymentMethod,
    }
  const { data, status ,message} = await useAsyncFetch("POST", "/api/v1/order",shippingAddress);
 
  console.log("Response data:", data);
  console.log("Status:", status);
  if (status === "success") {
      console.log("Order completed successfully, redirecting...");
      console.log(data.session.url);
      
      window.location.href = data.session.url;      
    } else {
      console.error('Error creating order:', data.message);
    }

});

</script>
<!-- // const completeOrder = async (formData) => {
//   console.log("Attempting to complete order with data:", formData);
  
//   try {
//     const { data, status } = await useAsyncFetch("POST", "/api/v1/order", {
//       shippingAddress: {
//         details: formData.details,
//         mobileNumber: formData.mobileNumber,
//         city: formData.city,
//       },
//       paymentMethod: formData.paymentMethod,
//     });

//     if (status === "success") {
//       console.log("Order completed successfully, redirecting...");
//       router.push('/confirmation');
//     } else {
//       console.error('Error creating order:', data.message);
//     }
//   } catch (error) {
//     console.error('Error creating order:', error);
//   }
// }; -->