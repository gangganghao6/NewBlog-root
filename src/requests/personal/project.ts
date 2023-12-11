import { type Image, type Project } from '../../utils/types'
import instance from '../request'
import { type Dayjs } from 'dayjs'

export const RequestPersonalProjectPost = ({
  name,
  duty,
  description,
  timeStart,
  githubUrl,
  demoUrl,
  timeEnd,
  image
}: CreateProject): any => {
  return async (): Promise<Project> => {
    return await instance.post('/personal/project', {
      name,
      duty,
      description,
      timeStart,
      githubUrl,
      demoUrl,
      timeEnd,
      image
    })
  }
}
export const RequestPersonalProjectPut = ({
  id,
  name,
  duty,
  description,
  timeStart,
  githubUrl,
  demoUrl,
  timeEnd,
  image
}: CreateProject & { id: string }): any => {
  return async (): Promise<Project> => {
    return await instance.put(`/personal/project/${id}`, {
      name,
      duty,
      description,
      timeStart,
      githubUrl,
      demoUrl,
      timeEnd,
      image
    })
  }
}
export const RequestPersonalProjectDelete = ({ id }: { id: string }): any => {
  return async (): Promise<Project> => {
    return await instance.delete(`/personal/project/${id}`)
  }
}

export interface CreateProject {
  name?: string
  duty?: string
  description?: string
  timeStart?: Date | Dayjs
  githubUrl?: string
  demoUrl?: string
  timeEnd?: string
  image?: Image
}
