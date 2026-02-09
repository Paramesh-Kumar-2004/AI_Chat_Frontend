import axios from "axios";



const baseURL = import.meta.env.DEV
    ? "http://localhost:2004/api/v1"
    : "https://ai-chat-backend-rouge.vercel.app/";


const API = axios.create({
    // baseURL,
    // "http://localhost:2004/api/v1",
    baseURL: "https://ai-chat-backend-rouge.vercel.app/api/v1",
    withCredentials: true
});


API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');

            const base = window.location.pathname;

            window.location.href = `${base}#/login`;
        }
        return Promise.reject(error);
    }
);

export { API }