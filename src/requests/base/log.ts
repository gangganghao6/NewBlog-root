import { type List, type UserVisit } from '../../utils/types'
import instance from '../request'

export const GetUrlInfoList = async ({ page, size, sort, ...data }: List): Promise<any> => {
  return await instance.get('/base/urlsInfo/list', {
    params: {
      page,
      size,
      sort,
      ...data
    }
  })
}
export const GetUrlInfoDetail = async ({ id }: any): Promise<any> => {
  return await instance.get(`/base/urlsInfo/url/${id}`)
}
export const DeleteUrlInfo = async ({ id }: any): Promise<any> => {
  return await instance.delete(`/base/urlsInfo/url/${id}`)
}
export const RequestInfoAnalysis = (): any => {
  return async (): Promise<UserVisit[]> => {
    return await instance.get('/base/urlsInfo/analysis')
  }
}
