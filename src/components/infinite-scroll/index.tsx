import { List } from 'antd'
import { useRef, useState } from 'react'
import styles from './index.module.scss'

export default function InfiniteScrollList({
  onBottom,
  children,
  data,
  totalCount = 0,
  renderItem,
  grid = {}
}: any) {
  const [page, setPage] = useState(1)
  const timeRef = useRef(null)
  return (
    <div
      className={styles['infinite-scroll-container']}
      onScroll={(e) => {
        if (timeRef.current) {
          clearTimeout(timeRef.current)
          timeRef.current = null
        }
        timeRef.current = setTimeout(() => {
          if (
            Math.abs(
              e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
            ) < 2 &&
            totalCount > data?.length
          ) {
            setPage(page + 1)
            onBottom && onBottom(page + 1)
          }
        }, 100)
      }}
    >
      {children}
      <List grid={grid} dataSource={data || []} renderItem={renderItem} />
    </div>
  )
}
