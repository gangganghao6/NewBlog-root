import { useRequest } from 'ahooks'
import styles from './index.module.scss'
import { getBlogType } from '@/requests/blogs/blog'
import { Tag } from 'antd'
export default function TagsShow() {
  const { data } = useRequest(getBlogType)
  return (
    <div className={styles.container}>
      <div className={styles.title}>博客标签</div>
      <div className={styles.content}>
        {data?.data?.map((item: string) => <Tag>{item}</Tag>)}
      </div>
    </div>
  )
}
