import axios from 'axios'

const url: string = import.meta.env.VITE_PUBLIC_URL
const port: number = import.meta.env.VITE_SERVER_PORT
export default axios.create({
  baseURL: import.meta.env.DEV ? '/api' : `${url}:${port}/api`,
  timeout: 1000 * 60 * 5,
  withCredentials: true
})
