<template>
    <header class="absolute  w-full bg-transparent text-white px-10 py-4 z-50">
        <div class="container mx-auto flex justify-between items-center">
            <div to="/" class="text-2xl font-bold text-white">
                <img src="~/assets/Logo.png" alt="logo"  />
            </div>
            <nav class="flex gap-[20px]">
                <nuxt-link to="/" class="text-xl font-bold text-center font-cairo">Home</nuxt-link>
                <nuxt-link to="/" class="w-28 text-center text-xl font-normal font-cairo">Product</nuxt-link>
                <nuxt-link to="/" class="w-28 text-center text-xl font-normal font-cairo">Category</nuxt-link>
                <nuxt-link to="/" class="w-28 text-center text-xl font-normal font-cairo">About</nuxt-link>
                <nuxt-link to="/" class="w-40 text-center text-xl font-normal font-cairo">Contact-Us</nuxt-link>
            </nav>

            <div class="w-40 inline-flex justify-between items-end">
               <nuxt-link class="w-6 h-6 "><img src="~/assets/Vector.svg"></nuxt-link>
               <nuxt-link class="w-6 h-6 "><img src="~/assets/Vector (1).svg"></nuxt-link>
               <nuxt-link class="w-6 h-6 "><img src="~/assets/Vector (3).svg"></nuxt-link>
               <nuxt-link to="/login" class="w-6 h-6 "><img src="~/assets/Vector (4).svg"></nuxt-link>
            </div>
        </div>
    </header>
</template>
