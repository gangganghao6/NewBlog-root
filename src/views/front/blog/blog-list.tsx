import { GetBlogList } from '@/requests/blogs/blog'
import { useRequest } from 'ahooks'
import { Pagination } from 'antd'
import { BlogCardHalf } from './blog-card'

export default function BlogList() {
  const { data, loading, run } = useRequest(
    (data) => GetBlogList({ page: 1, size: 10, sort: 'desc', ...data }),
    {
      manual: false
    }
  )

  return (
    <div>
      {data &&
        data?.data?.result.map((item: any) => {
          return <BlogCardHalf data={item} />
        })}
      <div className="pt-8 pb-4">
        <Pagination
          className="text-center"
          defaultCurrent={1}
          total={data?.data?.count || 0}
          onChange={(e) => run({ page: e })}
        />
      </div>
    </div>
  )
}
