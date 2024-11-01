import axios from 'axios';

const Eco4DApi = axios.create({
    baseURL: 'http://localhost:3000'});

export default Eco4DApi