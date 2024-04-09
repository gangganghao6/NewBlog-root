import { formatTime } from '@/utils/utils'
import styles from './shuoshuo-card.module.scss'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { CommentOutlined, EyeOutlined } from '@ant-design/icons'
export default function ShuoshuoCard({ data }: any) {
  const navigate = useNavigate()
  const mediaList = [...(data?.images || []), ...(data?.videos || [])]

  return (
    <div
      className={styles['shuoshuo-card']}
      onClick={() => {
        navigate(`/front/shuoshuo/detail/${data?.id}`)
      }}
    >
      <div className={styles.time}>
        <div className={styles.date}>
          {dayjs(data.createdTime).format('DD')}
        </div>
        <div className={styles.month}>
          {dayjs(data?.createdTime).format('M')}月
        </div>
      </div>
      <div className={styles['right-container']}>
        <div className={styles.image}>
          {mediaList.slice(0, 4).map((item: any) => {
            const src = item?.compressUrl
              ? item?.compressUrl
              : item?.post?.compressUrl
            return <img style={{ objectFit: 'cover' }} src={src} alt={src} />
          })}
        </div>
        <div className={styles['content-container']}>
          <div className={styles.content}>{data?.content}</div>
          <div className={styles['media-size']}>
            <span>共{mediaList?.length}张</span>
            <span>
              <CommentOutlined />
              {data?.comments?.length}
            </span>
            <span>
              <EyeOutlined />
              {data?.visitedCount}
            </span>
            <span>{formatTime(data?.createdTime)}</span>
          </div>
        </div>
        <div className={styles['comment-container']}>
        </div>
      </div>
    </div>
  )
}
