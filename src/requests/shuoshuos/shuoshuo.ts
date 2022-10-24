import { Image, List, Shuoshuo, Video } from '../../utils/types'
import instance from '../request'

export const RequestShuoshuoList = ({ size, page, sort, type }: List): any => {
  return async (): Promise<Shuoshuo[]> => {
    return await instance.get('/shuoshuos/list', {
      params: {
        size,
        page,
        sort,
        type
      }
    })
  }
}
export const RequestShuoshuoDetail = ({ id }: { id: string }): any => {
  return async (): Promise<Shuoshuo> => {
    return await instance.get(`/shuoshuos/shuoshuo/${id}`)
  }
}
export const RequestShuoshuoPost = ({
  mediaClass,
  content,
  images,
  video
}: CreateShuoshuo): any => {
  return async (): Promise<Shuoshuo> => {
    return await instance.post(`/shuoshuos/shuoshuo`, {
      media_class: mediaClass,
      content,
      images,
      video
    })
  }
}
export const RequestShuoshuoPut = ({
  id,
  mediaClass,
  content,
  images,
  video
}: CreateShuoshuo & { id: string }): any => {
  return async (): Promise<Shuoshuo> => {
    return await instance.put(`/shuoshuos/shuoshuo/${id}`, {
      media_class: mediaClass,
      content,
      images,
      video
    })
  }
}
export const RequestShuoshuoDelete = ({ id }: { id: string }): any => {
  return async (): Promise<any> => {
    return await instance.delete(`/shuoshuos/shuoshuo/${id}`)
  }
}

export interface CreateShuoshuo {
  mediaClass?: 'video' | 'images' | 'text'
  content?: string
  images?: Image[]
  video?: Video
}
