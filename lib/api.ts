import { environment } from '@/utils/environment';
import axios from 'axios';

export const api = axios.create({
  baseURL: environment.baseUrl,
  timeout: 300000 // 5 minutes
});
