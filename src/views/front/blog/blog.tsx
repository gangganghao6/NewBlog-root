import { GetBaseInfoDetail } from '@/requests/base/info'
import { useRequest } from 'ahooks'
import { Carousel } from 'antd'
import BlogRecommend from './blog-recommend'
import BlogList from './blog-list'

export default function FrontBlog() {
  //   const { data, loading } = useRequest(GetBaseInfoDetail)
  //   console.log(data, loading)
  return (
    <>
      <BlogRecommend />
      <BlogList />
    </>
  )
}
