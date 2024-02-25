import instance from '../request'
import { type Blog, type Image, type List } from '@/utils/types'

export const GetBlogDetail = async ({ id }: { id: string }): Promise<Blog> => {
  return await instance.get(`/blogs/blog/${id}?increase=false`)
}
export const GetBlogList = async ({ size, page, type, sort = 'desc', ...e }: List): Promise<Blog[]> => {
  const result = await instance.get(`/blogs/list`, {
    params: {
      size,
      page,
      type,
      sort,
      ...e
    }
  })
  return result
}
export const PostCreatBlog = async ({
  images,
  title,
  content,
  type,
  post
}: CreateBlog) => {
  return await instance.post(`/blogs/blog`, {
    images,
    title,
    content,
    type,
    post
  })
}
export const PutEditBlog = async ({
  id,
  images,
  title,
  content,
  type,
  post
}: PutBlog): Promise<Blog> => {
  return await instance.put(`/blogs/blog/${id}`, {
    images,
    title,
    content,
    type,
    post
  })
}
export const DeleteBlog = async ({ id }: { id: string }): Promise<any> => {
  return await instance.delete(`/blogs/blog/${id}`)
}
export const getBlogType = async (): Promise<Array<string>> => {
  return await instance.get(`/blogs/blogType`)
}
export interface CreateBlog {
  images: Image[]
  title: string
  content: string
  type: string
  post?: Image
}

export interface PutBlog extends CreateBlog {
  id: string
}
