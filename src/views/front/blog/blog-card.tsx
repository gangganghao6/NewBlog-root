import { Node } from 'slate'
import styles from './blog-card.module.scss'
import { formatTime } from '@/utils/utils'
import {
  CommentOutlined,
  EyeOutlined,
  FieldTimeOutlined,
  HighlightOutlined,
  MoneyCollectOutlined
} from '@ant-design/icons'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

export function BlogCardTop(props: any) {
  const { data } = props
  const navigate = useNavigate()
  return (
    <div
      className={styles['top-card']}
      onClick={() => {
        navigate(`/front/blog/detail/${data?.id}`)
      }}
    >
      <img className={styles.post} src={data?.post.url} alt="" />
      <div className={styles.container}>
        <div className={styles.title}>{data?.title}</div>
        <div className={styles.content}>
          {serialize(JSON.parse(data?.content || '[]'))}
        </div>
      </div>
    </div>
  )
}
export function BlogCardHalf(props: any) {
  const { data } = props
  const navigate = useNavigate()

  return (
    <div
      className={styles['half-card']}
      onClick={() => {
        navigate(`/front/blog/detail/${data?.id}`)
      }}
    >
      <img className={styles.post} src={data?.post.url} alt="" />
      <div className={styles.container}>
        <div className={styles.title}>{data?.title}</div>
        <div className={styles.content}>
          {serialize(JSON.parse(data?.content || '[]'))}
        </div>
        <div className={styles.footer}>
          <div className={clsx(styles.time, styles['footer-item'])}>
            <FieldTimeOutlined />
            {formatTime(data?.createdTime, false)}
          </div>
          <div className={clsx(styles.type, styles['footer-item'])}>
            <HighlightOutlined />
            {data?.type}
          </div>
          <div className={clsx(styles.commentsCount, styles['footer-item'])}>
            <CommentOutlined />
            {data?.comments?.length}
          </div>
          <div className={clsx(styles.visitedCount, styles['footer-item'])}>
            <EyeOutlined />
            {data?.visitedCount}
          </div>
          <div className={clsx(styles.paysCount, styles['footer-item'])}>
            <MoneyCollectOutlined />
            {data?.pays?.length}
          </div>
        </div>
      </div>
    </div>
  )
}
const serialize = (nodes: []) => {
  return nodes.map((n) => Node.string(n)).join('')
}
