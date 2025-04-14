// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@vee-validate/nuxt",
    "nuxt-toastify",
    ],

  runtimeConfig: {
    public: {
     baseUrl : process.env.NUXT_PUBLIC_BASE_URL ,
    }
  }
  ,
  toastify: {
    autoClose: 2000,
    position: 'bottom-right',
    theme: "auto",
  },
  css: ['~/assets/tailwind.css'],
  
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;700;900&display=swap'
        }
      ]
    }
  },
 
})