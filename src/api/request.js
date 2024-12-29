// src/request.js
import axios from 'axios';

// 创建一个 axios 实例，配置基础 URL 和其他设置
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8888',  // 后端接口的基础 URL
    timeout: 5000, // 设置请求超时，单位是毫秒
    headers: {
        'Content-Type': 'application/json', // 设置请求头
    },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
        // 可以在请求头中加入 token（如果需要）
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        // 处理请求错误
        return Promise.reject(error);
    }
);

// 封装的 POST 请求方法
const post = (url, data) => {
    return axiosInstance.post(url, data);
};

// 导出封装好的 axios 实例和方法
export { axiosInstance, post };
