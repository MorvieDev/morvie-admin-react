export function useEmailLogin() {
    const login = (role: string) => {
        // Here you would typically call your authentication service
        // For example, calling an API
        console.log(`Logging in as ${role} with Email`);
        // Redirect or handle login logic here
    };

    return { login };
}