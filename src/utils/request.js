import axios from 'axios';
import { getToken, setToken } from './authority';
import store from '../store';
import { push } from 'connected-react-router';

const service = axios.create({
    baseURL: '/api',
    timeout: 80000
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
            store.dispatch(push('/user/login'));
        }
        if (status === 403) {
            store.dispatch(push('/exception/403'));
        }
        if (status <= 504 && status >= 500) {
            store.dispatch(push('/exception/500'));
        }
        return Promise.reject(error);
    }
);

export default service;
