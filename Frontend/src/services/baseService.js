import axios from 'axios';

const APIGeneral = axios.create({ baseURL: `https://planbots-easymarket.herokuapp.com` });

export default APIGeneral;
