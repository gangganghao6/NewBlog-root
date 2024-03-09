import { GetBlogDetail } from '@/requests/blogs/blog'
import { GlobalInfo } from '@/state/base'
import { Carousel } from 'antd'
import { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import { BlogCardTop } from './blog-card'

export default function BlogRecommend() {
  const [blogs, setBlogs] = useState<any[]>([])
  const baseInfo = useSnapshot(GlobalInfo).baseInfo
  useEffect(() => {
    if (baseInfo?.recommendBlogIds) {
      getAllBlogs(baseInfo).then((res) => {
        setBlogs(res)
      })
    }
  }, [baseInfo])

  return (
    <Carousel autoplay>
      {blogs.map((item) => (
        <BlogCardTop data={item} />
      ))}
    </Carousel>
  )
}
const getAllBlogs = async (baseInfo: any) => {
  const recommentBlogIds = baseInfo?.recommendBlogIds || ''
  const ids = recommentBlogIds.split(',')
  const res = await Promise.all(
    ids.map((id: any) => {
      return GetBlogDetail({ id })
    })
  )
  return res.map((item) => item?.data)
}
