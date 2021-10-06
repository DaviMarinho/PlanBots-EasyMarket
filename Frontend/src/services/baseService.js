import axios from 'axios';
import { IP_ADDRESS } from '@env';

const APIGeneral = axios.create({ baseURL: `http://${IP_ADDRESS}:3000` });

export default APIGeneral;
