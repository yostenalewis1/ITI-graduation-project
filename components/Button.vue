<script setup>
 defineProps({
  buttonName: String
});

</script>

<template>
<button class="w-80 py-3 bg-purple-950 rounded-2xl justify-center items-center gap-2">
    <p class="text-white text-2xl font-normal font-cairo">{{ buttonName }} </p>
</button>
</template>