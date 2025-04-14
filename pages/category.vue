<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'  
import { useAsyncFetch } from '/composables/useAsyncFetch' 

const categories = ref([])
const selectedFilter = ref('ALL')
const filters = ref(['ALL'])
const loading = ref(true)

 
const router = useRouter()   

 
const fetchCategories = async () => {
  loading.value = true

  
  const { data, status, message } = await useAsyncFetch('GET', '/api/v1/categories/')

  if (status === 'error') {
 
    console.error('Error fetching categories:', message)
    router.push('/error')  
  } else if (data && data.categories && data.categories.length > 0) {
     
    categories.value = data.categories.map(item => ({
      name: item.name,
      type: item.name,
      image: item.image
    }))
    filters.value = ['ALL', ...data.categories.map(item => item.name)]
  } else {
    console.warn('No categories found or invalid response:', data)
    router.push('/error')
  }

  loading.value = false
}


onMounted(fetchCategories)
const filteredCategories = computed(() => {
  return selectedFilter.value === 'ALL'
    ? categories.value
    : categories.value.filter(c => c.type === selectedFilter.value)
})
</script>

<template>
  <div class="mt-24">

    <h1 class="text-center text-4xl font-semibold text-[#26103d] mb-6">CATEGORIES</h1>

    <!-- Category Filters -->
    <div class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-12 mb-10 text-lg text-[#26103d]">
      <button 
        v-for="category in filters" 
        :key="category"
        @click="selectedFilter = category"
        :class="[ 
          'font-bold', 
          selectedFilter === category ? 'underline' : '', 
          'transition-colors duration-300 hover:text-purple-700'
        ]"
      >
        {{ category }}
      </button>
    </div>

    <!-- Loading indicator -->
    <div v-if="loading" class="flex justify-center items-center">
      <span class="text-lg text-[#26103d]">Loading...</span>
    </div>

    <!-- Filtered Category Cards -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center px-8 sm:px-16">
      <div 
        v-for="item in filteredCategories" 
        :key="item.name"
        class="text-center"
      >
        <img :src="item.image" :alt="item.name" class="rounded-md w-64 mx-auto" />
        <p class="mt-2 font-bold text-[#26103d]">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>


