import axios from 'axios';
import { SERVER_URL } from '../socket';

const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 7000,
});
export default instance;
