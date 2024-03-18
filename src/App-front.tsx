import { Outlet, useLocation } from 'react-router-dom'
import '@/App-admin.scss'
import FrontTopbar from '@/components/front-topbar'
import Mask from './components/mask/mask'
import { useRequest } from 'ahooks'
import { GetBaseInfoDetail } from './requests/base/info'
import { useEffect } from 'react'
import { GlobalInfo } from './state/base'
import useLogin from '@/views/front/login/useLogin'
import { Spin } from 'antd'
import { useSnapshot } from 'valtio'
import loadingGif from '@/asserts/loading.gif'
import { PostAddUserVisit } from '@/requests/base/log'

export default function AppFront() {
  const { data, loading } = useRequest(GetBaseInfoDetail)
  const location = useLocation()
  useLogin()
  useEffect(() => {
    if (data) {
      GlobalInfo.baseInfo = data?.data
    }
  }, [data])
  const state = useSnapshot(GlobalInfo)
  useEffect(() => {
    const result = navigator.sendBeacon(
      '/api/base/urlsInfo/url',
      JSON.stringify({ url: location.pathname })
    )
    console.log(result);
    
  }, [location.pathname])
  return (
    <>
      <Spin
        spinning={state.loading}
        tip={<div className="text-white">加载中...</div>}
        fullscreen
        className="z-[10000]"
        indicator={
          <img
            style={{
              width: 100,
              height: 100
            }}
            src={loadingGif}
            alt="loading"
          />
        }
      ></Spin>
      <Mask />
      <FrontTopbar>
        <Outlet />
      </FrontTopbar>
    </>
  )
}
