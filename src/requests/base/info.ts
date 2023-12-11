import { type BaseInfo } from '../../utils/types'
import instance from '../request'

export const RequestBaseInfo = (): any => {
  return async (): Promise<BaseInfo> => {
    return await instance.get('/base/info')
  }
}

export const RequestPostBaseInfo = ({
  name,
  headImage
}: BaseInfoCreate): any => {
  return async (): Promise<BaseInfo> => {
    return await instance.post('/base/info', {
      name,
      head_image: headImage
    })
  }
}

export const RequestPutBaseInfo = ({
  name,
  headImage
}: BaseInfoModify): any => {
  return async (): Promise<BaseInfo> => {
    return await instance.put('/base/info', {
      name,
      head_image: headImage
    })
  }
}

export interface BaseInfoCreate {
  name: string
  headImage: {
    name: string
    url: string
    size: number
  }
}

export interface BaseInfoModify {
  name?: string
  headImage?: {
    name: string
    url: string
    size: number
  }
}
