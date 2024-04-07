import dayjs from 'dayjs'
import styles from './index.module.scss'
import { GlobalInfo } from '@/state/base'
export default function SummaryInfo() {
  const baseInfo = GlobalInfo.baseInfo

  return (
    <div className={styles.container}>
      <div className={styles.title}>博客信息</div>
      <div className={styles['content-container']}>
        <div className={styles.content}>
          <div className={styles.key}>文章数目</div>
          <div className={styles.value}>{baseInfo?.blogsCount}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.key}>评论数目</div>
          <div className={styles.value}>{baseInfo?.commentsCount}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.key}>运行天数</div>
          <div className={styles.value}>{daysCount(baseInfo?.createdTime)}天</div>
        </div>
        <div className={styles.content}>
          <div className={styles.key}>最后活动</div>
          <div className={styles.value}>{daysCount(baseInfo?.lastModifiedTime)}天</div>
        </div>
      </div>
    </div>
  )
}
const daysCount = (time: any) => {
  time = dayjs().diff(dayjs(time), 'day')
  return time
}
