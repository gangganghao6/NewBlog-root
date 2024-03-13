import { GetBlogDetail } from '@/requests/blogs/blog'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import styles from './blog-detail.module.scss'
import clsx from 'clsx'
import { formatTime } from '@/utils/utils'
import {
  CommentOutlined,
  EyeOutlined,
  FieldTimeOutlined,
  HighlightOutlined,
  MoneyCollectOutlined,
  PayCircleOutlined
} from '@ant-design/icons'
import ContentEditor from '@/components/editor/content-editor'
import { Button } from 'antd'
import FrontComment from '@/components/comment/front-comment'
import FrontPayButton from '@/components/pay/front-pay-button'
import FrontPayList from '@/components/pay/front-pay-list'

export default function FrontBlogDetail() {
  const id = useParams()?.id
  const { data, loading, run } = useRequest(
    () => GetBlogDetail({ id, increase: true }),
    {
      manual: false
    }
  )
  console.log(data)

  return (
    <div className={styles.detail}>
      <div className={styles.title}>{data?.data?.title}</div>
      <div className={styles.header}>
        <div className={clsx(styles.time, styles['header-item'])}>
          <FieldTimeOutlined />
          发布于:
          {formatTime(data?.data?.createdTime)}
        </div>
        <div className={clsx(styles.type, styles['header-item'])}>
          <HighlightOutlined />
          {data?.data?.type}
        </div>
        <div className={clsx(styles.commentsCount, styles['header-item'])}>
          <CommentOutlined />
          {data?.data?.comments?.length}
        </div>
        <div className={clsx(styles.commentsCount, styles['header-item'])}>
          <MoneyCollectOutlined />
          {data?.data?.pays?.length}
        </div>
        <div className={clsx(styles.visitedCount, styles['header-item'])}>
          <EyeOutlined />
          {data?.data?.visitedCount}
        </div>
      </div>
      <img className={styles.img} src={data?.data?.post?.url} alt="" />
      <div className={styles.content}>
        <ContentEditor type={'detail'} value={data?.data?.content} />
      </div>
      <div className={styles.header}>
        <div className={clsx(styles.time, styles['header-item'])}>
          <FieldTimeOutlined />
          最后编辑于:
          {formatTime(data?.data?.lastModifiedTime)}
        </div>
      </div>
      <div className={styles.pay}>
        <FrontPayButton blogId={id} run={run} />
        <span className="mb-6 text-[13px]">
          喜欢我的文章吗？ 别忘了点赞或赞赏，让我知道创作的路上有你陪伴。
        </span>
      </div>
      <FrontComment
        blogId={id}
        run={run}
        comments={data?.data?.comments || []}
      />
      <FrontPayList pays={data?.data?.pays} />
    </div>
  )
}
