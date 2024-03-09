import { Outlet } from 'react-router-dom'
import AdminTopBar from '@/components/admin-topbar/topbar'
import useAdminLogin from '@/views/admin/login/useLogin'
import { Spin } from 'antd'
import { useSnapshot } from 'valtio'
import { GlobalInfo } from '@/state/base'
import loadingGif from '@/asserts/loading.gif'

export default function App() {
  useAdminLogin()
  const state = useSnapshot(GlobalInfo)

  return (
    <>
      <Spin
        spinning={state.loading}
        tip={<div className="text-white">加载中...</div>}
        fullscreen
        indicator={
          <img
            style={{
              width: 100,
              height: 100
              // transform: 'translate(-45%, -60%)'
            }}
            src={loadingGif}
            alt="loading"
          />
        }
      ></Spin>
      <AdminTopBar>
        <Outlet />
      </AdminTopBar>
    </>
  )
}
