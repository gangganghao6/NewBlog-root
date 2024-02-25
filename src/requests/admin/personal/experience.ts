import { List } from '@/utils/types'
import { type Experience, type Image, type Personal } from '../../utils/types'
import instance from '../request'
import { type Dayjs } from 'dayjs'

export const PostCreatePersonalExperience = async ({
  company,
  duty,
  description,
  timeStart,
  timeEnd,
  images
}: CreateExperience): Promise<Experience> => {
  return await instance.post('/personal/experience', {
    company,
    duty,
    description,
    timeStart,
    timeEnd,
    images
  })
}
export const PutEditPersonalExperience = async ({
  id,
  company,
  duty,
  description,
  timeStart,
  timeEnd,
  images
}: CreateExperience & { id: string }): Promise<Experience> => {
  return await instance.put(`/personal/experience/${id}`, {
    company,
    duty,
    description,
    timeStart,
    timeEnd,
    images
  })
}
export const DeletePersonalExperience = async ({
  id
}: {
  id: string
}): Promise<Personal> => {
  return await instance.delete(`/personal/experience/${id}`)
}
export const GetPersonalExperienceList = async ({ size, page, type, sort = 'desc', ...e }: List): Promise<Experience[]> => {
  const result = await instance.get(`/personal/experience/list`, {
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
export const GetPersonalExperienceDetail = async ({ id }: { id: string }): Promise<Experience> => {
  return await instance.get(`/personal/experience/${id}`)
}
export interface CreateExperience {
  company?: string
  duty?: string
  description?: string
  timeStart?: Date | Dayjs
  timeEnd?: Date | Dayjs
  images?: Image[]
}
