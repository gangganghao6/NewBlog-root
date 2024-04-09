import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { FrontLoginInfo } from '@/state/base'
import { formatTime } from '@/utils/utils'
import { Badge, Descriptions, message } from 'antd'
import { UserAuth, UserLogout, UserSubscribe } from '@/requests/users/user'
import { useRequest } from 'ahooks'

export default function FrontSetting() {
  const navigator = useNavigate()
  const { data, error, run } = useRequest(UserAuth)
  const colums = [
    {
      label: '登录状态',
      children: (
        <>
          <Badge
            status={data?.code === 200 ? 'success' : 'error'}
            text={data?.code === 200 ? '已登录' : '未登录'}
          />
          {data?.code === 200 && (
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
          {data?.code !== 200 && (
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
      children: data?.data?.name
    },
    {
      label: 'ID',
      children: data?.data?.id
    },
    {
      label: '邮箱',
      children: data?.data?.email
    },
    {
      label: '是否订阅',
      children: (
        <>
          {data?.data?.isSubscribed ? '是' : '否'}
          {!data?.data?.isSubscribed && (
            <span
              className={styles.link}
              onClick={async () => {
                await UserSubscribe({ isSubscribed: true })
                run()
                message.success('订阅成功')
              }}
            >
              订阅
            </span>
          )}
          {data?.data?.isSubscribed && (
            <span
              className={styles.link}
              onClick={async () => {
                await UserSubscribe({ isSubscribed: false })
                run()
                message.success('取消订阅成功')
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
          status={data?.data?.isBanned ? 'error' : 'success'}
          text={data?.data?.isBanned ? '是' : '否'}
        />
      )
    },
    {
      label: '创建时间',
      children: formatTime(data?.data?.createdTime)
    },
    {
      label: '最近活跃时间',
      children: formatTime(data?.data?.lastActiveTime)
    }
  ]
  return (
    <div className={styles.container}>
      <Descriptions title="我的信息" items={colums} />
    </div>
  )
}
