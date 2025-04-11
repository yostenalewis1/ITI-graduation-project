export const useAsyncFetch = async (method, endpoint, body = null) => {
    const token = useCookie("token");
    const config = useRuntimeConfig();

    try {
 
        const options = {
            method: method,
            headers: {
                authorization: `Bearer ${token.value}`,
            },
            baseURL: config.public.baseUrl,
        };

       
        if (method !== 'GET' && body) {
            options.body = body;   
        }

        const response = await $fetch(endpoint, options);

        if (!response || response.error) {
            throw new Error(response.error || 'Unknown error');
        }

        return { data: response, status: 'success' };
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return { data: null, status: 'error', message: error.message };
    }
};
