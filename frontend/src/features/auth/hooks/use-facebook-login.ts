export function useFacebookLogin() {
    const login = (role: string) => {
        // Here you would typically call your authentication service
        // For example, redirecting to a Facebook OAuth URL or calling an API
        console.log(`Logging in as ${role} with Facebook`);
        // Redirect or handle login logic here
    };

    return { login };
}