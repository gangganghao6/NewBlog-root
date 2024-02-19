import { rootAuth } from '@/requests/admin/base/root'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function useRedirect(data: any, error: any) {
  const location = useLocation()
  const redirectPath = new URLSearchParams(location.search).get('redirect')
  const navigate = useNavigate()
  const { data: authData, error: authError } = useRequest(rootAuth, {
    manual: false
  })
  useEffect(() => {
    if (authData) {
      navigate('/admin/home')
    }
  }, [authData, authError])
  useEffect(() => {
    if (data?.code === 200) {
      message.success('登录成功')
      navigate(redirectPath || '/admin/home')
    }
  }, [data, error])
}
