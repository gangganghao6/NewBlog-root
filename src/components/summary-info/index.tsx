import dayjs from 'dayjs'
import styles from './index.module.scss'
import { GlobalInfo } from '@/state/base'
import clsx from 'clsx'
import {
  CommentOutlined,
  FileMarkdownOutlined,
  FormatPainterOutlined,
  FundOutlined,
  ScheduleOutlined
} from '@ant-design/icons'
export default function SummaryInfo() {
  const baseInfo = GlobalInfo.baseInfo
  return (
    <div
      className={styles.container}
      data-step="4"
      data-intro="这里会展示博客的一些统计信息"
    >
      <div className={styles.title}>博客信息</div>
      <div className={styles['content-container']}>
        <div className={clsx(styles.content, 'bg-blue-500')}>
          <div className={styles.key}>
            <FileMarkdownOutlined className="mr-2" />
            文章数目
          </div>
          <div className={styles.value}>{baseInfo?.blogsCount}</div>
        </div>
        <div className={clsx(styles.content, 'bg-orange-500')}>
          <div className={styles.key}>
            <CommentOutlined className="mr-2" />
            评论数目
          </div>
          <div className={styles.value}>{baseInfo?.commentsCount}</div>
        </div>
        <div className={clsx(styles.content, 'bg-green-500')}>
          <div className={styles.key}>
            <FundOutlined className="mr-2" />
            访问次数
          </div>
          <div className={styles.value}>{baseInfo?.visitedCount}</div>
        </div>
        <div className={clsx(styles.content, 'bg-red-500')}>
          <div className={styles.key}>
            <ScheduleOutlined className="mr-2" />
            运行天数
          </div>
          <div className={styles.value}>
            {daysCount(baseInfo?.createdTime)}天
          </div>
        </div>
        <div className={clsx(styles.content, 'bg-purple-500')}>
          <div className={styles.key}>
            <FormatPainterOutlined className="mr-2" />
            最后活动
          </div>
          <div className={styles.value}>
            {daysCount(baseInfo?.lastModifiedTime)}天
          </div>
        </div>
      </div>
    </div>
  )
}
const daysCount = (time: any) => {
  time = dayjs().diff(dayjs(time), 'day')
  return time
}
