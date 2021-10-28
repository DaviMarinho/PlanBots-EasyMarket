import axios from 'axios';

const APIGeneral = axios.create({ baseURL: `https://planbots-easymarket.herokuapp.com` });
// const APIGeneral = axios.create({ baseURL: `http://192.168.0.61:3000` });

export default APIGeneral;
