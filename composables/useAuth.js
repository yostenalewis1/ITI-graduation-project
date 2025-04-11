import { ref, onMounted } from 'vue';

export default function useAuth() {
  const isLoggedIn = ref(false);

  onMounted(() => {
    const token = localStorage.getItem("token");
    if (token) {
      isLoggedIn.value = true;  
    }
  });

  return {
    isLoggedIn,
  };
}
