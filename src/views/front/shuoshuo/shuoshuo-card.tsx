import { formatTime } from '@/utils/utils'
import styles from './shuoshuo-card.module.scss'
import dayjs from 'dayjs'
export default function ShuoshuoCard({ data }: any) {
  const mediaList = [...(data?.images || []), ...(data?.videos || [])]

  return (
    <div className={styles['shuoshuo-card']}>
      <div className={styles.time}>
        <div className={styles.date}>
          {dayjs(data.createdTime).format('DD')}
        </div>
        <div className={styles.month}>
          {dayjs(data?.createdTime).format('M')}月
        </div>
      </div>
      <div className={styles.image}>
        {/* {data?.images?.slice(0, 4).map((item: any) => {
          return <img src={item.compressUrl} alt="" />
        })}
        {data?.videos?.slice(0, 4).map((item: any) => {
          return <img src={item?.post?.compressUrl} alt="" />
        })} */}
        {mediaList.map((item: any) => {
          const src = item?.compressUrl
            ? item?.compressUrl
            : item?.post?.compressUrl
          return <img src={src} alt={src} />
        })}
      </div>
      <div className={styles['content-container']}>
        <div className={styles.content}>{data?.content}</div>
        <div className={styles['media-size']}>共{mediaList?.length}张</div>
      </div>
    </div>
  )
}
