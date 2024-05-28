import { GetBlogList } from '@/requests/blogs/blog'
import { useRequest } from 'ahooks'
import { List, Pagination } from 'antd'
import { BlogCardHalf } from './blog-card'
import { useEffect, useState } from 'react'
import InfiniteScrollList from '@/components/infinite-scroll'
import BlogRecommend from './blog-recommend'

export default function BlogList() {
  const [blogList, setBlogList] = useState([])
  const { data, loading, run } = useRequest(
    (data) => GetBlogList({ page: 1, size: 10, sort: 'desc', ...data }),
    {
      manual: false
    }
  )
  useEffect(() => {
    data && setBlogList((pre) => [...pre, ...data?.data?.result])
  }, [data])
  return (
    <>
      <InfiniteScrollList
        data={blogList}
        totalCount={data?.data?.count || 0}
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
          <List.Item style={{ marginBottom: 0 }}>
            <BlogCardHalf data={item} />
          </List.Item>
        )}
      >
        <BlogRecommend />
      </InfiniteScrollList>
    </>
  )
}
