import axios from 'axios';

const APIGeneral = axios.create({ baseURL: 'http://localhost:3000' });

export default APIGeneral;
