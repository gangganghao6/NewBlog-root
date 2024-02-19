import { proxy } from 'valtio'


export const GlobalInfo = proxy({
  theme: 'dark',
  title: '博客',
  loading: false
})
