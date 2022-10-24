import axios from 'axios'

const url: string = import.meta.env.VITE_PUBLIC_URL
const port: number = import.meta.env.VITE_BACKEND_PORT
export default axios.create({
  baseURL: `${url}:${port}/api`,
  timeout: 5000,
  withCredentials: true
})
