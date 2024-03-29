import axios from 'axios'
import { message } from 'antd'
import { GlobalInfo } from '@/state/base'

const url: string = import.meta.env.VITE_PUBLIC_URL
const port: number = import.meta.env.VITE_SERVER_PORT
const axiosInstance = axios.create({
  // baseURL: import.meta.env.DEV ? '/api' : `${url}:${port}/api`,
  baseURL:'/api',
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
  message.error(err?.response?.data?.message || err?.message || '请求失败')
  if (err.response.status === 401) {
    if (window.location.pathname.includes('/front')) {
      window.location.href = `/front/login?redirect=${window.location.pathname}`
    } else if (window.location.pathname.includes('/admin')) {
      window.location.href = `/admin/login?redirect=${window.location.pathname}`
    }
  }
  return Promise.reject(err.response.data || err.message)
});
export default axiosInstance;