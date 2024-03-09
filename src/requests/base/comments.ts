import instance from '../request'

export const RequestDeleteComment = ({
  id,
  blogId,
  shuoshuoId,
  personalId
}: CommentsDelete): any => {
  return async (): Promise<{ count: number }> => {
    return await instance.delete('/base/comments', {
      data: {
        id,
        blog_id: blogId,
        shuoshuo_id: shuoshuoId,
        personal_id: personalId
      }
    })
  }
}

export interface CommentsDelete {
  id?: number
  blogId?: string
  shuoshuoId?: string
  personalId?: string
}
