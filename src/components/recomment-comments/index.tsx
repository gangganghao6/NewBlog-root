import { useRequest } from 'ahooks'
import RecommendCommentItem from './comment-item'
import styles from './index.module.scss'
import { GetCommentList } from '@/requests/base/comments'
export default function RecommentComments() {
  const { data } = useRequest((data) =>
    GetCommentList({ page: 1, size: 5,sort:'desc', ...data })
  )
  return (
    <div className={styles.container}>
      <div className={styles.title}>最新评论</div>
      {data?.data?.result?.map((item: any) => {
        return <RecommendCommentItem item={item} />
      })}
    </div>
  )
}
