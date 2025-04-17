export default defineNuxtRouteMiddleware((to, from) => {
    let isLoggedIn = false;
    
    if (typeof window !== 'undefined') {
      isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    }
  
   
    if (!isLoggedIn && to.path !== '/login') {
      return navigateTo({ path: '/', query: { auth: 'login' } });
    }
  });
   
