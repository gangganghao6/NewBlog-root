import { useRequest } from 'ahooks'
import { Card, List, Tag } from 'antd'
import styles from './shuoshuo.module.scss'
import { useEffect, useState } from 'react'
import { formatTime } from '@/utils/utils'
import InfiniteScrollList from '@/components/infinite-scroll'
import { GetShuoshuoList } from '@/requests/shuoshuos/shuoshuo'
import ShuoshuoCard from './shuoshuo-card'
export default function FrontTodoList() {
  const [shuoshuoList, setShuoshuoList] = useState([])
  const { data, run } = useRequest((data) =>
    GetShuoshuoList({ size: 20, page: 1, sort: 'desc', ...data })
  )
  useEffect(() => {
    data && setShuoshuoList((pre) => [...pre, ...data?.data?.result])
  }, [data])
  return (
    <div>
      <InfiniteScrollList
        data={shuoshuoList}
        onBottom={(page: number) => {
          run({ size: 20, page, sort: 'desc' })
        }}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
          xl: 1,
          xxl: 1
        }}
        renderItem={(item: any) => (
          <List.Item>
            <ShuoshuoCard data={item}/>
          </List.Item>
        )}
      />
    </div>
  )
}
