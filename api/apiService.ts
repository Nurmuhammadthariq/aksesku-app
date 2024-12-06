import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = `${process.env.EXPO_PUBLIC_SERVER_URL}:8000`;

interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
}


export const apiRequest = async <T = any>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data: any = null,
    customHeaders: Record<string, string> = {}
): Promise<ApiResponse<T>> => {
    try {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...customHeaders,
        };

        const options: RequestInit = {
            method,
            headers,
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, options);

        // Parse the JSON response
        const jsonResponse = await response.json();

        if (!response.ok) {
            // Throw an error for non-2xx HTTP statuses
            throw new Error(jsonResponse.message || `HTTP Error: ${response.status}`);
        }

        return {
            success: true,
            data: jsonResponse,
            message: 'data berhasil sync'
        };
    } catch (error: any) {
        console.error('API Error:', error.message);
        throw error; // Re-throw the error to handle in the calling code
    }
};