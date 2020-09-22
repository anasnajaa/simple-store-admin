import axios from 'axios';

const httpClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 15000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});

export default httpClient;