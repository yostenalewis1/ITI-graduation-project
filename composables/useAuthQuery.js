 
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export function useAuthQuery() {
  const showLogin = ref(false);
  const showSignUp = ref(false);

  const route = useRoute();
  const router = useRouter();

  const closeModal = () => {
    showLogin.value = false;
    showSignUp.value = false;
    router.replace({ query: {} });
  };

  watchEffect(() => {
    if (route.query.auth === 'login') {
      showLogin.value = true;
      showSignUp.value = false;
    } else if (route.query.auth === 'signup') {
      showSignUp.value = true;
      showLogin.value = false;
    } else {
      closeModal();
    }
  });

  return {
    showLogin,
    showSignUp,
    closeModal,
  };
}
