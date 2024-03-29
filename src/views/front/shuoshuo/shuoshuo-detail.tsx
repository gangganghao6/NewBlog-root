import { useRequest } from 'ahooks'
import styles from './shuoshuo-detail.module.scss'
import { GetShuoshuoDetail } from '@/requests/shuoshuos/shuoshuo'
import { useLocation } from 'react-router-dom'
import FrontComment from '@/components/comment/front-comment'
import {
  ImageListPreview,
  VideoListPreview
} from '@/components/form/media-list-preview'
import {
  CommentOutlined,
  EyeOutlined,
  FieldTimeOutlined
} from '@ant-design/icons'
import { formatTime } from '@/utils/utils'
import clsx from 'clsx'

export default function FrontShuoshuoDetail() {
  const location = useLocation()
  const id = location.pathname.split('/').at(-1)
  const { data, run } = useRequest(
    (data) => GetShuoshuoDetail({ id, increase: true, ...data }),
    { manual: false }
  )
  //   const mediaList = [...(data?.data?.images || []), ...(data?.data?.videos || [])]
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={clsx(styles.time, styles['header-item'])}>
          <FieldTimeOutlined />
          发布于:
          {formatTime(data?.data?.createdTime)}
        </div>
        <div className={clsx(styles.commentsCount, styles['header-item'])}>
          <CommentOutlined />
          {data?.data?.comments?.length}
        </div>
        <div className={clsx(styles.visitedCount, styles['header-item'])}>
          <EyeOutlined />
          {data?.data?.visitedCount}
        </div>
      </div>
      <div className={styles.content}>{data?.data?.content}</div>
      <div className={styles.medias}>
        <ImageListPreview data={data?.data?.images} />
        <VideoListPreview data={data?.data?.videos} />
      </div>
      <div className={styles.header}>
        <div className={clsx(styles.time, styles['header-item'])}>
          <FieldTimeOutlined />
          最后编辑于:
          {formatTime(data?.data?.lastModifiedTime)}
        </div>
      </div>
      <FrontComment run={run} comments={data?.data?.comments} shuoshuoId={id} />
    </div>
  )
}
