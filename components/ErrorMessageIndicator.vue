<template>
    <div class="error-indicator">
      <img src="~/assets/errorMessage.svg" alt="No items" class="error-image" />
      <p class="error-message">{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    message: {
      type: String,
      default: 'No items available.'
    }
  })
  </script>
  
  <style scoped>
  .error-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: rgb(46 16 101);
  }
  
  .error-image {
    width: 40%;
    height: auto;
  }
  
  .error-message {
    font-size: 16px;
    font-weight: 500;
  }
  </style>