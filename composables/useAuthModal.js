import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useAuthModal() {
  const route = useRoute();
  const router = useRouter();

  const showSignUp = ref(false);
  const showLogin = ref(false);
  const showForgetPassword = ref(false);
  const passwordReset = ref(false);
  const setNewPassword = ref(false)


//   watch(
//     () => route.query.auth,
//     (newAuth) => {
//       console.log("🔄 New auth query:", newAuth);
  
//       showSignUp.value = newAuth === "signup";
//       showLogin.value = newAuth === "login";
//       showForgetPassword.value = newAuth === "forgetPassword";

//       passwordReset.value = newAuth === "passwordReset";
//       setNewPassword.value = newAuth === "setNewPassword";
//     //   console.log("📌 showForgetPassword:", showForgetPassword.value);
//     },
//   );


  const closeModal = () => {
    showSignUp.value = false;
    showLogin.value = false;
    passwordReset.value = false;
    showForgetPassword.value = false;
    router.push({ query: {} });
  };
  

  const switchToSignup = () => {
    router.push({ query: { auth: "signup" } });
    showSignUp.value = true;
  };

  const switchToLogin = () => {
    router.push({ query: { auth: "login" } });
    showLogin.value = true;
  };

const switchToForgetPassword = () => {
    router.push({ query: { auth: "forgetPassword" } });
    showForgetPassword.value = true;
};
const switchToPasswordReset = () => {
    router.push({ query: { auth: "passwordReset" } });
    passwordReset.value = true;
}
const openSetNewPassword = () => {
    router.push({ query: { auth: "setNewPassword" } });
    setNewPassword.value = true;
}


  return {
    showSignUp,
    showLogin,
    showForgetPassword,
    passwordReset,
    switchToSignup,
    switchToLogin,
    switchToForgetPassword,
    switchToPasswordReset,
    // openForgetPassword,
    closeModal,
    // openPasswordReset,
    openSetNewPassword,
    
  };
}
