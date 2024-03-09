import React from 'react'
// import { ThemeProvider, createTheme } from '@mui/material/styles'
// import CssBaseline from '@mui/material/CssBaseline'
import { useSnapshot } from 'valtio'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import routes from '@/routes/index'
import '@/index.scss'
import { GlobalInfo } from '@/state/base'
import { ClassErrorBoundary } from './utils/error-boundary'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

function RootNode() {
  const snap = useSnapshot(GlobalInfo)
  // const darkTheme = createTheme({
  //   palette: {
  //     mode: snap.theme === 'light' ? 'light' : 'dark'
  //   }
  // })
  return (
    <ConfigProvider locale={zhCN}>
      <ClassErrorBoundary>
        <RouterProvider router={routes} />
      </ClassErrorBoundary>
    </ConfigProvider>
  )
}
ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <RootNode />
)
