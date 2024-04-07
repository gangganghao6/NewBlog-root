import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { FrontLoginInfo } from '@/state/base'
import { useEffect } from 'react'
import { formatTime } from '@/utils/utils'
import { Badge, Button, Descriptions, message } from 'antd'
import { UserLogout, UserSubscribe } from '@/requests/users/user'
import { useSnapshot } from 'valtio'

export default function FrontSetting() {
  const navigator = useNavigate()
  const loginData = useSnapshot(FrontLoginInfo).data
  const colums = [
    {
      label: '登录状态',
      children: (
        <>
          <Badge
            status={loginData?.code === 200 ? 'success' : 'error'}
            text={loginData?.code === 200 ? '已登录' : '未登录'}
          />
          {loginData?.code === 200 && (
            <span
              className={styles.link}
              onClick={async () => {
                await UserLogout()
                FrontLoginInfo.loginStateChange = new Date().getTime()
              }}
            >
              退出登录
            </span>
          )}
          {loginData?.code !== 200 && (
            <span
              className={styles.link}
              onClick={() => {
                navigator('/front/login?redirect=/front/setting')
              }}
            >
              登录
            </span>
          )}
        </>
      )
    },
    {
      label: '用户名',
      children: loginData?.data?.name
    },
    {
      label: 'ID',
      children: loginData?.data?.id
    },
    {
      label: '邮箱',
      children: loginData?.data?.email
    },
    {
      label: '是否订阅',
      children: (
        <>
          {loginData?.data?.isSubscribed ? '是' : '否'}
          {!loginData?.data?.isSubscribed && (
            <span
              className={styles.link}
              onClick={async () => {
                await UserSubscribe({ isSubscribed: true })
                message.success('订阅成功')
                FrontLoginInfo.loginStateChange = new Date().getTime()
              }}
            >
              订阅
            </span>
          )}
          {loginData?.data?.isSubscribed && (
            <span
              className={styles.link}
              onClick={async () => {
                await UserSubscribe({ isSubscribed: false })
                message.success('取消订阅成功')
                FrontLoginInfo.loginStateChange = new Date().getTime()
              }}
            >
              取消订阅
            </span>
          )}
        </>
      )
    },
    {
      label: '是否被禁',
      children: (
        <Badge
          status={loginData?.data?.isBanned ? 'error' : 'success'}
          text={loginData?.data?.isBanned ? '是' : '否'}
        />
      )
    },
    {
      label: '创建时间',
      children: formatTime(loginData?.data?.createdTime)
    },
    {
      label: '最近活跃时间',
      children: formatTime(loginData?.data?.lastActiveTime)
    }
  ]
  return (
    <div className={styles.container}>
      <Descriptions title="我的信息" items={colums} />
    </div>
  )
}
