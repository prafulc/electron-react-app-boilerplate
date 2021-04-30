import axios from 'axios';

let newaxios = axios
if (process.env.NODE_ENV !== 'development') {
    newaxios = axios.create({
        baseURL: 'http://localhost:3000'
    });
}

export default newaxios;