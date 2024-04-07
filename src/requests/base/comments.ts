import { List } from '@/utils/types'
import instance from '../request'

export const DeleteComment = async ({
  commentId,
  blogId,
  shuoshuoId,
  personalId
}: CommentsDelete): Promise<any> => {
  return await instance.delete('/base/comments', {
    data: {
      commentId,
      blogId,
      shuoshuoId,
      personalId
    }
  })
}
export const PostCreateComment = async ({
  comment,
  blogId,
  shuoshuoId,
  personalId
}: CommentsCreate): Promise<any> => {
  return await instance.post('/base/comments', {
    comment,
    blogId,
    shuoshuoId,
    personalId
  })
}
export const GetCommentList = async ({ page, size, sort, ...data }: List): Promise<any> => {
  return await instance.get('/base/comment/list', {
    params: {
      page,
      size,
      sort,
      ...data
    }
  })
}
export interface CommentsDelete {
  commentId?: number
  blogId?: string
  shuoshuoId?: string
  personalId?: string
}
export interface CommentsCreate {
  comment?: string
  blogId?: string
  shuoshuoId?: string
  personalId?: string
}