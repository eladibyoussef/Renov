import axios from 'axios';



const API = axios.create({
  baseURL: 'http://localhost:1337',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;