export function useGoogleLogin() {
    const login = (role: string) => {
        // Here you would typically call your authentication service
        // For example, redirecting to a Google OAuth URL or calling an API
        console.log(`Logging in as ${role} with Google`);
        // Redirect or handle login logic here
    };

    return { login };
}