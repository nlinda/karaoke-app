// axiosInstance.ts
import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://verbit-karaoke-assignment.vercel.app/api/',
  timeout: 5000, // Timeout of 5 seconds
});

export default axiosInstance;
