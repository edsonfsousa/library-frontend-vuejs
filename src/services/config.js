import axios from 'axios';

export const http = axios.create({
    // baseURL: 'http://localhost:8081/'
    baseURL: 'https://api-spring-livraria.herokuapp.com/'
});
