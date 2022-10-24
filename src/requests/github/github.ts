import { Github, List } from '../../utils/types'
import instance from '../request'

export const RequestGithubDetail = ({ id }: { id: string }): any => {
  return async (): Promise<Github> => {
    return await instance.get(`/githubs/github/${id}`)
  }
}
export const RequestGithubList = ({ size, page, type, sort }: List): any => {
  return async (): Promise<Github[]> => {
    return await instance.get(`/githubs/list`, {
      params: {
        size,
        page,
        type,
        sort
      }
    })
  }
}
