import instance from '../request'
import { type Blog, type Image, type List } from '../../utils/types'

export const RequestBlogDetail = ({ id }: { id: string }): any => {
  return async (): Promise<Blog> => {
    return await instance.get(`/blogs/blog/${id}`)
  }
}
export const RequestBlogList = ({ size, page, type, sort }: List): any => {
  return async (): Promise<Blog[]> => {
    return await instance.get(`/blogs/list`, {
      params: {
        size,
        page,
        type,
        sort
      }
    })
  }
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
