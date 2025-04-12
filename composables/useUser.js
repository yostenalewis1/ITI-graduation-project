export const useUser = async () => {
    try {
      const { data, status, message } = await useAsyncFetch('GET', '/api/v1/users/user');
      
      console.log("User data fetched successfully:", data);
      console.log("Status:", status); 
      console.log("username:", data.user.firstName);
  
      if (status === 'success' && data?.user?.firstName) {
        localStorage.setItem("userName", data.user.firstName);
      } else {
        console.log("Error fetching user data:", message);
      }
  
      return data.user; 
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }
  