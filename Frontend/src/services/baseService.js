import axios from 'axios';

const APIGeneral = axios.create({ baseURL: `http://192.168.0.102:3000` });
// const APIGeneral = axios.create({ baseURL: `https://planbots-easymarket.herokuapp.com` });

export default APIGeneral;
  