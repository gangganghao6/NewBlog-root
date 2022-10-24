import { List, UserVisit } from '../../utils/types'
import instance from '../request'

export const RequestInfoList = ({ page, size, sort }: List): any => {
  return async (): Promise<UserVisit[]> => {
    return await instance.get('/base/urls_info/list', {
      params: {
        page,
        size,
        sort
      }
    })
  }
}
export const RequestInfoAnalysis = (): any => {
  return async (): Promise<UserVisit[]> => {
    return await instance.get('/base/urls_info/analysis')
  }
}
