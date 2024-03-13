import { Avatar } from 'antd'
import styles from './single-message.module.scss'
import clsx from 'clsx'
import { formatTime } from '@/utils/utils'
export default function SingleMessage({
  role = 'other',
  message = {},
  self = {},
  className = ''
}) {
  const arr = Array.from({ length: 88 }, (v, k) => '打发地方')
  return (
    <div
      className={clsx(
        styles['chat-single-message'],
        {
          [styles.right]: role === 'self'
        },
        className
      )}
    >
      <Avatar className={styles.avatar}>
        {message?.user?.name?.slice(0, 1)}
      </Avatar>
      <div className={styles.content}>
        <div className={styles['user-container']}>
          <div className={styles.username}>{message?.user?.name}</div>
          <div className={styles.time}>
            {formatTime(message?.createdTime, true)}
          </div>
        </div>
        <div className={styles.message}>{message?.content}</div>
      </div>
    </div>
  )
}
