import axios from 'axios'

export default axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_URL,
  timeout: 5000,
  withCredentials: true
})
