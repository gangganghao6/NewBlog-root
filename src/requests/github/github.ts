import { type Github, type List } from '../../utils/types'
import instance from '../request'

export const GetGithubDetail = async ({ id }: { id: string }): Promise<Github> => {
  return await instance.get(`/githubs/github/${id}`)
}
export const GetGithubList = async ({ size, page, type, sort }: List): Promise<Github[]> => {
  return await instance.get(`/githubs/list`, {
    params: {
      size,
      page,
      type,
      sort
    }
  })
}
