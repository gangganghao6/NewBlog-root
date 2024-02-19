import instance from '../request'
import { type Blog, type Image, type List } from '../../utils/types'

export const RequestBlogDetail = ({ id }: { id: string }): any => {
  return async (): Promise<Blog> => {
    return await instance.get(`/blogs/blog/${id}`)
  }
}
export const GetBlogList = async ({ size, page, type, sort = 'desc', ...e }: List): any => {
  const result = await instance.get(`/blogs/list`, {
    params: {
      size,
      page,
      type,
      sort,
      ...e
    }
  })
  return result.data
}
export const RequestBlogPost = ({
  images,
  title,
  content,
  type,
  post
}: CreateBlog): any => {
  return async (): Promise<Blog> => {
    return await instance.post(`/blogs/blog`, {
      images,
      title,
      content,
      type,
      post
    })
  }
}
export const RequestBlogPut = ({
  id,
  images,
  title,
  content,
  type,
  post
}: PutBlog): any => {
  return async (): Promise<Blog> => {
    return await instance.put(`/blogs/blog/${id}`, {
      images,
      title,
      content,
      type,
      post
    })
  }
}
export const RequestBlogDelete = ({ id }: { id: string }): any => {
  return async (): Promise<Blog> => {
    return await instance.delete(`/blogs/blog/${id}`)
  }
}
export const getBlogType = async (): Promise<any> => {
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
