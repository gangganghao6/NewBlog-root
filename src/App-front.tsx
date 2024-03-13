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

export default function AppFront() {
  const { data, loading } = useRequest(GetBaseInfoDetail)
  useLogin()
  useEffect(() => {
    if (data) {
      GlobalInfo.baseInfo = data?.data
    }
  }, [data])
  const state = useSnapshot(GlobalInfo)
  return (
    <>
      <Spin
        spinning={state.loading}
        tip={<div className="text-white">加载中...</div>}
        fullscreen
        className='z-[10000]'
        indicator={
          <img
            style={{
              width: 100,
              height: 100,
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
