import { GetBaseInfo } from '@/requests/base/info'
import { proxy } from 'valtio'

export const HttpGetBaseInfo = proxy({ baseInfo: GetBaseInfo() })

export const GlobalInfo = proxy({
  theme: 'light',
  title: '博客',
  loading: false
})
