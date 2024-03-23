import { GetGithubList } from '@/requests/github/github'
import { useRequest } from 'ahooks'
import GithubCard from './github-card'
import { useEffect, useState } from 'react'
import InfiniteScrollList from '@/components/infinite-scroll'
import { List } from 'antd'

export default function FrontGithub() {
  const { data, loading, run } = useRequest(
    (data) => GetGithubList({ page: 1, size: 10, sort: 'desc', ...data }),
    {
      manual: false
    }
  )
  const [githubList, setGithubList] = useState([])
  useEffect(() => {
    data && setGithubList((pre) => [...pre, ...data?.data?.result])
  }, [data])

  return (
    <div>
      <InfiniteScrollList
        data={githubList}
        onBottom={(page: number) => {
          run({ page, size: 20, sort: 'desc' })
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
            <GithubCard data={item} />
          </List.Item>
        )}
      />
    </div>
  )
}
