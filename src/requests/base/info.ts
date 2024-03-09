import { Image } from '@/utils/types'
import { type BaseInfo } from '../../utils/types'
import instance from '../request'

// export const RequestBaseInfo = (): any => {
//   return async (): Promise<BaseInfo> => {
//     return await instance.get('/base/info')
//   }
// }

export const GetBaseInfoDetail = async (): Promise<any> => {
  return instance.get('/base/info')
}

// export const RequestPostBaseInfo = ({
//   name,
//   headImage
// }: BaseInfoCreate): any => {
//   return async (): Promise<BaseInfo> => {
//     return await instance.post('/base/info', {
//       name,
//       head_image: headImage
//     })
//   }
// }

export const PutEditBaseInfo = async ({
  name,
  description,
  headImage,
  recommendBlogIds
}: BaseInfoModify): Promise<BaseInfo> => {
  return await instance.put('/base/info', {
    name,
    description,
    headImage,
    recommendBlogIds
  })
}
export const GetBaseSummaryInfo = async (): Promise<any> => {
  return await instance.get('/base/summaryInfo')
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
  description?: string
  recommendBlogIds?: string
  headImage?: Image
}
