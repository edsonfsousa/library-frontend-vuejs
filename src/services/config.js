import axios from 'axios';

export const http = axios.create({
    // baseURL: 'http://localhost:8080/'
    // baseURL: 'https://api-livraria.herokuapp.com/'
    baseURL: 'https://springboot-api-livraria.herokuapp.com/'
});
