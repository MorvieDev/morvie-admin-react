import {api} from './client';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const http = {
    get: <T>(endpoint: string, params?: Record<string, any>) => {
        return api<T>(`${BASE_URL}${endpoint}`, { method: 'GET', params });
    },

    post: <T>(endpoint: string, body?: any) => {
        return api<T>(`${BASE_URL}${endpoint}`, { method: 'POST', body });
    },

    put: <T>(endpoint: string, body?: any) => {
        return api<T>(`${BASE_URL}${endpoint}`, { method: 'PUT', body });
    },

    delete: <T>(endpoint: string) => {
        return api<T>(`${BASE_URL}${endpoint}`, { method: 'DELETE' });
    }
}