import axios from 'axios';
import config from './config';

const api = axios.create({
    baseURL: config.API_URL,
    responseType: 'json',
});

export default api;
