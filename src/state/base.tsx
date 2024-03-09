import { proxy } from 'valtio'

export const GlobalInfo = proxy({
  // theme: 'dark',
  loading: false,
  isLeftbarOpen: false,
  baseInfo: {},
})
export const AdminLoginInfo = proxy({
  isLogin: false,
  data: {},
  loginStateChange: false
})
export const FrontLoginInfo = proxy({
  isLogin: false,
  data: {},
  loginStateChange: false
})
