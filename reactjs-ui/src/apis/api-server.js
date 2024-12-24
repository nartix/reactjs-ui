import axios from 'axios';
import { environment as env } from '../globals';

export default axios.create({
  baseURL: env.EXPRESSJS_URL,
});
