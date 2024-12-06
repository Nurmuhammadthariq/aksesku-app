import axios from 'axios'


const API = axios.create({ baseURL: 'http://192.168.250.49:8000' });

export const logIn= (formData: any)=> API.post('/auth/login',formData);

export const signUp = (formData: any) => API.post('/auth/register', formData);

export const syncUser = (formData: any) => API.post('/auth/sync-user-aksesku/aksesku', formData);