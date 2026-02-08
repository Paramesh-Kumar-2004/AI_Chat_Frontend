import axios from "axios";



const baseURL = import.meta.env.DEV
    ? "http://localhost:2004/api/v1"
    : "https://final-project-task-management-backend-1.onrender.com/api/v1";


export const API = axios.create({
    baseURL,
    // "http://localhost:2004/api/v1",
    // baseURL: "https://final-project-task-management-backend-1.onrender.com/api/v1",
    withCredentials: true
});


API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
