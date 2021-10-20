import axios from 'axios';

const APIGeneral = axios.create({ baseURL: `http://192.168.0.181:3000` });

export default APIGeneral;
