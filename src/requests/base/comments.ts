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