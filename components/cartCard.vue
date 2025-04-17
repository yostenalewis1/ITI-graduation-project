<script setup>

const props=defineProps({
  image: String,
  title: String,
  quantity: Number,
  color: String,
  price: Number,
  id: String,
  stock:Number,
  product:Object
});

const emit = defineEmits(['update-quantity', 'delete-item', 'save-for-later']);

const incrementQuantity = () => {  
  
  emit('update-quantity', props.id, props.quantity + 1);
};

const decrementQuantity = () => {
    emit('update-quantity', props.id, props.quantity - 1);
};

const deleteItem = () => {
  emit('delete-item', props.id);
};

const saveForLater = () => {
  emit('save-for-later', props.product);
};
</script>


<template>
  <div class=" mx-8 flex flex-col justify-srart items-center md:flex-row gap-4">
    
    <img :src="image" alt="flower-img" class="w-1/12 h-fit object-cover rounded-3xl m-3 md:m-6" />
    
    <div class="w-10/12 flex flex-col justify-center gap-3 p-3 md:py-4 md:px-0">
      <div class="flex justify-between">
        <h1 class="text-xl md:text-2xl font-bold text-violet-950 font-cairo">{{ title }}</h1>
        <p class="w-1/4 text-indigo-950 text-lg  text-right pr-5">{{ price }} LE</p>
      </div>
      <p class="text-indigo-950 text-sm">Only {{ stock }} left in stock - order soon.</p>

      <div class="flex flex-row gap-2 md:gap-6">
        <div class="flex flex-row bg-gray-200 rounded-2xl justify-center items-center px-1 md:px-2 gap-2 md:gap-3">
          <button @click="decrementQuantity">
            <img src="../assets/minus.svg" alt="minus" />
          </button>
          <p class="text-indigo-950 text-xl">{{ quantity }}</p>
          <button @click="incrementQuantity">
            <img src="../assets/plus.svg" alt="plus" />
          </button>
        </div>

        <div class="w-0 h-9 outline outline-1 outline-indigo-900"></div>
        <button @click="deleteItem" class="text-indigo-950">Delete</button>
        <div class="w-0 h-9 outline outline-1 outline-indigo-900"></div>
        <button @click="saveForLater" class="text-indigo-950">Save For Later</button>
      </div>
    </div>
    <!-- <p class="hidden md:block text-indigo-950 text-lg w-[20%] items-end text-right pt-2 pr-1 mt-3">{{ price }} LE</p> -->
  </div>
  <hr
          class="border-t border-indigo-900 w-[90%] mx-auto  opacity-50"
    />
</template>