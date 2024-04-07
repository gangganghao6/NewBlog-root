import { UserAuth } from '@/requests/users/user'
import { FrontLoginInfo } from '@/state/base'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'

export default function useLogin() {
  const location = useLocation()
  const redirectPath = new URLSearchParams(location.search).get('redirect')
  const navigate = useNavigate()
  const { data, error, loading, run } = useRequest(UserAuth, {
    manual: true
  })
  const proxyState = useSnapshot(FrontLoginInfo)

  useEffect(() => {
    if (error) {
      FrontLoginInfo.isLogin = false
      FrontLoginInfo.data = {}
      !loading &&
        navigate(
          redirectPath
            ? `/front/login?redirect=${redirectPath}`
            : '/front/login'
        )
    } else if (data) {
      FrontLoginInfo.isLogin = true
      FrontLoginInfo.data = data
      if (location.pathname === '/front/login') {
        navigate(redirectPath || '/front/blog/list')
      }
    }
  }, [data, error])
  useEffect(() => {
      run()
  }, [proxyState.loginStateChange])
}
