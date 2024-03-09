import { type Image, type Project } from '../../utils/types'
import instance from '../request'
import { type Dayjs } from 'dayjs'

export const PostCreatePersonalProject = async ({
  name,
  duty,
  description,
  timeStart,
  githubUrl,
  demoUrl,
  timeEnd,
  images
}: CreateProject): Promise<Project> => {
  return await instance.post('/personal/project', {
    name,
    duty,
    description,
    timeStart,
    githubUrl,
    demoUrl,
    timeEnd,
    images
  })
}
export const PutEditPersonalProject = async ({
  id,
  name,
  duty,
  description,
  timeStart,
  githubUrl,
  demoUrl,
  timeEnd,
  images
}: CreateProject & { id: string }): Promise<Project> => {
  return await instance.put(`/personal/project/${id}`, {
    name,
    duty,
    description,
    timeStart,
    githubUrl,
    demoUrl,
    timeEnd,
    images
  })
}
export const DeletePersonalProject = async ({ id }: { id: string }): Promise<Project> => {
  return await instance.delete(`/personal/project/${id}`)
}
export const GetPersonalProjectList = async ({ size, page, type, sort = 'desc', ...e }: List): Promise<Experience[]> => {
  const result = await instance.get(`/personal/project/list`, {
    params: {
      size,
      page,
      type,
      sort,
      ...e
    }
  })
  return result
}
export const GetPersonalProjectDetail = async ({ id }: { id: string }): Promise<Experience> => {
  return await instance.get(`/personal/project/${id}`)
}
export interface CreateProject {
  name?: string
  duty?: string
  description?: string
  timeStart?: Date | Dayjs
  githubUrl?: string
  demoUrl?: string
  timeEnd?: string
  images?: Image[]
}
