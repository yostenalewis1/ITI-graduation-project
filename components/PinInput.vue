<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'

const length = 4
const pin = ref(Array(length).fill(''))
const inputs = ref<HTMLInputElement[]>([])


watch(pin, (newValue) => {
  console.log('Current PIN:', newValue.join('')) 
}, { deep: true })  


const handleInput = (index: number) => {
  if (pin.value[index] && index < length - 1) {
    inputs.value[index + 1]?.focus()
  }
}


const handleBackspace = (event: KeyboardEvent, index: number) => {
  if (event.key === 'Backspace' && !pin.value[index] && index > 0) {
    inputs.value[index - 1]?.focus()
  }
}

onMounted(() => {
  nextTick(() => {
    if (inputs.value.length) {
      inputs.value[0]?.focus()
    }
  })
})
</script>

<template>
  <div class="flex gap-4">
    <input
      v-for="(digit, index) in pin"
      :key="index"
      v-model="pin[index]"
      type="text"
      maxlength="1"
      ref="inputs"
      class="border border-gray-300 text-black text-xl font-semibold w-12 h-12 text-center rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      @input="handleInput(index)"
      @keydown="handleBackspace($event, index)"
    />
  </div>
</template>
