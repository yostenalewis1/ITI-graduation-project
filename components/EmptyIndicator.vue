<template>
    <div class="empty-indicator">
      <img src="~/assets/empty-box 1.svg" alt="No items" class="empty-image" />
      <p class="empty-message">{{ message }}</p>
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
  .empty-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: rgb(46 16 101);
  }
  
  .empty-image {
    width: 40%;
    height: auto;
  }
  
  .empty-message {
    font-size: 16px;
    font-weight: 500;
  }
  </style>