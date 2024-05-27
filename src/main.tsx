import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import routes from '@/routes/index'
import '@/index.scss'
import { GlobalInfo } from '@/state/base'
import { ClassErrorBoundary } from './utils/error-boundary'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import introJs from 'intro.js'
import isMobile from 'is-mobile'
import 'intro.js/introjs.css'
dayjs.locale('zh-cn')

function RootNode() {
  const snap = useSnapshot(GlobalInfo)
  useEffect(() => {
    if (!localStorage.getItem('introjs-done') && !isMobile()) {
      localStorage.setItem('introjs-done', 'true')
      setTimeout(() => {
        introJs()
          .setOptions({
            nextLabel: '下一步',
            prevLabel: '上一步',
            doneLabel: '完成',
            // skipLabel: '跳过',
            showStepNumbers: false,
            disableInteraction: true
          })
          .start()
      }, 500)
    }
  }, [])
  return (
    <ConfigProvider locale={zhCN}>
      <ClassErrorBoundary>
        <RouterProvider router={routes} />
        <div
          id="root-node"
          style={{
            backgroundImage: `url(${snap?.baseInfo?.headImage?.url})`
          }}
        ></div>
      </ClassErrorBoundary>
    </ConfigProvider>
  )
}
ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <RootNode />
)
