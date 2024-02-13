import axios from 'axios'
import { GlobalInfo } from '@/state/base'

const url: string = import.meta.env.VITE_PUBLIC_URL
const port: number = import.meta.env.VITE_SERVER_PORT
const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : `${url}:${port}/api`,
  timeout: 1000 * 60,
  withCredentials: true
})
axiosInstance.interceptors.request.use(config => {
  GlobalInfo.loading = true
  return config;
}, err => { });
axiosInstance.interceptors.response.use(res => {
  GlobalInfo.loading = false
  return res.data
}, err => {
  GlobalInfo.loading = false
  // const method = err.config.method
  // if (method === 'get') {
  //   return err.response.data;
  // } else {
    return Promise.reject(err.response.data)
  // }
});
export default axiosInstance;