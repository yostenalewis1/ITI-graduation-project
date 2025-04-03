<script setup>
 defineProps({
  buttonName: String
});

</script>

<template>
<button class="w-[80%] md:w-80 py-2 bg-purple-950 rounded-2xl justify-center items-center gap-2 m-auto md:m-0">
    <p class="text-white text-2xl font-cairo">{{ buttonName }} </p>
</button>
</template>