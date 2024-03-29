import {
  type Image,
  type List,
  type Shuoshuo,
  type Video
} from '@/utils/types'
import instance from '../request'

export const GetShuoshuoList = async ({ size, page, sort, ...data }: List): Promise<Shuoshuo[]> => {
  return await instance.get('/shuoshuos/list', {
    params: {
      ...data,
      size,
      page,
      sort,
      // type
    }
  })
}
export const GetShuoshuoDetail = async ({ id, increase = false }: { id: string, increase: boolean }): Promise<Shuoshuo> => {
  return await instance.get(`/shuoshuos/shuoshuo/${id}?increase=${increase}`)
}
export const PostCreateShuoshuo = async ({
  content,
  images,
  videos
}: CreateShuoshuo): Promise<Shuoshuo> => {
  return await instance.post(`/shuoshuos/shuoshuo`, {
    content,
    images,
    videos
  })
}
export const PutEditShuoshuo = async ({
  id,
  content,
  images,
  videos
}: CreateShuoshuo & { id: string }): Promise<Shuoshuo> => {
  return await instance.put(`/shuoshuos/shuoshuo/${id}`, {
    content,
    images,
    videos
  })
}
export const DeleteShuoshuo = async ({ id }: { id: string }): Promise<any> => {
  return await instance.delete(`/shuoshuos/shuoshuo/${id}`)
}
export const PostCreateShuoshuoComment = async ({ comment, shuoshuoId }: any) => {
  return await instance.post(`/shuoshuos/shuoshuocomment`, {
    comment,
    shuoshuoId
  })
}
export const DeleteShuoshuoComment = async ({ shuoshuoId, commentId }: any) => {
  return await instance.delete(`/shuoshuos/shuoshuocomment`, {
    data: {
      shuoshuoId,
      commentId
    },
  })
}
export interface CreateShuoshuo {
  content?: string
  images?: Image[]
  videos?: Video[]
}
