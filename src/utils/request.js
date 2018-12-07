import axios from 'axios';
import history from '@src/history';
import { getToken, setToken } from './authority';

const service = axios.create({
    baseURL: '/api',
    timeout: 10000
});

service.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${getToken()}`;
        return config;
    },
    error => {
        console.log(error);
        Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => response,
    error => {
        const { status } = error.response;
        if (status === 401) {
            setToken('');
            history.push('/user/login');
        }
        if (status === 403) {
            history.push('/exception/403');
        }
        if (status <= 504 && status >= 500) {
            history.push('/exception/500');
        }
        return Promise.reject(error);
    }
);

export default service;
