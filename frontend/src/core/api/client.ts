import {headers} from "next/headers";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "";

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
interface RequestOptions extends RequestInit{
    method?: RequestMethod;
    params?: Record<string, any>;
    body?: any;
    auth?: boolean;
}

export async function api<T = unknown>(
    endpoint: string,
    {method = 'GET', params = {}, body, auth = true, ...customConfig }: RequestOptions = {}
): Promise<T> {
    let url = `${BASE_API_URL}${endpoint}`;

    if(params) {
        const query = new URLSearchParams(params).toString();
        url += `?${query}`;
    }

    const config: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        ...customConfig,
    }

    if (auth){
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
            (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
        }
    }

    if (body){
        config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);

    if (!response.ok){
        if (response.status === 401) {
            // Handle unauthorized access, e.g., redirect to login
            throw new Error("Unauthorized access. Please log in.");
        }

        const errorData = await response.json().catch(() => {});
        throw {
            status: response.status,
            message: errorData?.message || "Unknown error",
            data: errorData
        }
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
        return await response.json() as Promise<T>;
    }

    return {} as T;
}