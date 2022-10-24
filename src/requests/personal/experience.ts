import { Experience, Image, Personal } from '../../utils/types'
import instance from '../request'
import { Dayjs } from 'dayjs'

export const RequestPersonalExperiencePost = ({
  company,
  duty,
  description,
  timeStart,
  timeEnd,
  image
}: CreateExperience): any => {
  return async (): Promise<Experience> => {
    return await instance.post('/personal/experience', {
      company,
      duty,
      description,
      time_start: timeStart,
      time_end: timeEnd,
      image
    })
  }
}
export const RequestPersonalExperiencePut = ({
  id,
  company,
  duty,
  description,
  timeStart,
  timeEnd,
  image
}: CreateExperience & { id: string }): any => {
  return async (): Promise<Experience> => {
    return await instance.put(`/personal/experience/${id}`, {
      company,
      duty,
      description,
      time_start: timeStart,
      time_end: timeEnd,
      image
    })
  }
}
export const RequestPersonalExperienceDelete = ({
  id
}: {
  id: string
}): any => {
  return async (): Promise<Personal> => {
    return await instance.delete(`/personal/experience/${id}`)
  }
}

export interface CreateExperience {
  company?: string
  duty?: string
  description?: string
  timeStart?: Date | Dayjs
  timeEnd?: Date | Dayjs
  image?: Image
}
