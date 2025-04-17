<script setup>
import { ref, onMounted } from 'vue';
import { useAsyncFetch } from '~/composables/useAsyncFetch.js'; 

definePageMeta({
  layout: 'profile'
});

const orders = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchUserOrders = async () => {
  try {
    const { data, status } = await useAsyncFetch('GET', 'api/v1/order/user');
    console.log(data);
    
    if (status === 'success') {
      orders.value = data.orders      ;
      console.log(orders.value);
      
    } else {
      error.value = 'Failed to fetch orders.';
    }
  } catch (err) {
    error.value = err.message || 'An error occurred while fetching orders.';
  } finally {
    loading.value = false;
  }
};

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

onMounted(() => {
  fetchUserOrders();
});
</script>

<template>
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <LoadingIndicator />
    </div>

    <div v-else-if="error" class="flex justify-center items-center h-screen">
      <ErrorMessageIndicator :message="error" />
    </div>
    
    <div v-else class="w-full max-w-7xl mx-auto md:mt-20 space-y-5">
      <div class="flex items-center gap-4 mt-12">
        <h2 class="text-xl sm:text-2xl font-cairo font-bold text-indigo-950">All Orders</h2>
      </div>

        <div >
          <div class="overflow-x-auto">
            <table class="min-w-[80%] mx-auto shadow bg-stone-200 border-collapse border">
              <thead class="text-indigo-900">
                <tr>
                  <th class="border shadow p-2">Product</th>
                  <th class="border shadow p-2">Details</th>
                  <th class="border shadow p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in orders" :key="order._id">
                  <td class="border shadow p-2 w-[40%]">
                    <ul>
                      <li v-for="product in order.products" :key="product._id">
                        <div class="flex gap-3 items-center shadow text-xs mb-1">
                          <img
                            :src="product.product.image"
                            alt="Bouquet"
                            class="rounded-3xl w-10 h-fit object-cover"
                          />
                          <div>
                            <p class="text-indigo-950">{{ product.product ? product.product.title : 'Unknown Product' }}</p>
                            <div class="text-gray-500">
                              <p>Quantity: {{ product.quantity }}</p>
                              <p>Price: {{ product.price }}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </td>
                  <td class="border shadow p-2 text-xs w-[40%]">
                    <p class="text-indigo-950">Total Price: {{ order.total }}</p>
                    <p class="text-indigo-950">Payment Method: {{ order.paymentMethod }}</p>
                    <p class="text-indigo-950">Created At: {{ formatDate(order.createdAt) }}</p>
                  </td>
                  <td class="border shadow p-2 text-center w-[20%]">
                    <span v-if="order.status === 'pending'" class="text-yellow-500">Pending</span>
                    <span v-else-if="order.status === 'accepted'" class="text-green-500">Accepted</span>
                    <span v-else-if="order.status === 'rejected'" class="text-red-500">Rejected</span>
                    <span v-else>{{ new Date(order.createdAt).toLocaleDateString() }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  </template>
