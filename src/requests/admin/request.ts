import axios from 'axios'
import { message } from 'antd'
import { GlobalInfo } from '@/state/base'

const url: string = import.meta.env.VITE_PUBLIC_URL
const port: number = import.meta.env.VITE_SERVER_PORT
const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? '/api/admin' : `${url}:${port}/api/admin`,
  timeout: 1000 * 60,
  withCredentials: true
})
axiosInstance.interceptors.request.use(config => {
  return config;
}, err => { });
axiosInstance.interceptors.response.use(res => {
  return res.data
}, err => {

  message.error(err?.response?.data?.message || err?.message || '请求失败')

  if (err.response.status === 401) {
    window.location.href = `/admin/login?redirect=${window.location.pathname}`
  }
  return Promise.reject(err.response.data || err.message)
});
export default axiosInstance;