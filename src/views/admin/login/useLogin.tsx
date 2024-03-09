import { rootAuth } from '@/requests/base/root'
import { AdminLoginInfo } from '@/state/base'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

export default function useLogin() {
  const location = useLocation()
  const redirectPath = new URLSearchParams(location.search).get('redirect')
  const navigate = useNavigate()
  const { data, error, loading, run } = useRequest(rootAuth, {
    manual: true
  })
  const proxyState = useSnapshot(AdminLoginInfo)

  useEffect(() => {
    if (error) {
      AdminLoginInfo.isLogin = false
      AdminLoginInfo.data = {}
      !loading &&
        navigate(
          redirectPath
            ? `/admin/login?redirect=${redirectPath}`
            : '/admin/login'
        )
    } else if (data) {
      AdminLoginInfo.isLogin = true
      AdminLoginInfo.data = data
      if (location.pathname === '/admin/login') {
        navigate(redirectPath || '/admin/home')
      }
    }
  }, [data, error])
  useEffect(() => {
    run()
  }, [proxyState.loginStateChange])
}
