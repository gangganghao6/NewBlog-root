import { GetTodoListList } from '@/requests/todolists/todolist'
import { useRequest } from 'ahooks'
import { Card, List, Tag } from 'antd'
import styles from './todolist.module.scss'
import { useEffect, useState } from 'react'
import { formatTime } from '@/utils/utils'
export default function FrontTodoList() {
  const [page, setPage] = useState(1)
  const [todoList, setTodoList] = useState([])
  const { data, run } = useRequest((data) =>
    GetTodoListList({ size: 20, page: 1, sort: 'desc', ...data })
  )
  useEffect(() => {
    console.log(data)
    if (data) {
      setTodoList((pre) => [...pre, ...data?.data?.result])
    }
  }, [data])
  useEffect(() => {
    run({ size: 20, page, sort: 'desc' })
  }, [page])
  return (
    <div
      className={styles['todolist-container']}
      onScroll={(e) => {
        if (
          e.target.scrollHeight - e.target.scrollTop ===
          e.target.clientHeight
        ) {
          setPage((pre) => pre + 1)
        }
      }}
    >
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 2
        }}
        dataSource={todoList || []}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={
                <div className={styles['title-container']}>
                  <div className={styles.title}>{item?.title}</div>
                  <div>
                    {item?.isDone && <Tag color="green">已完成</Tag>}
                    {!item?.isDone && <Tag color="blue">未完成</Tag>}
                  </div>
                </div>
              }
            >
              <div className={styles['content-container']}>
                <div className={styles.content}>
                  创建于:{formatTime(item?.createdTime)}
                </div>
                {item?.isDone && (
                  <div className={styles.content}>
                    完成于:{formatTime(item?.isDoneTime, false)}
                  </div>
                )}
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}
