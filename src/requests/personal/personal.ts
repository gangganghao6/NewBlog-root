import instance from '../request'
import { type Personal } from '../../utils/types'
import { type Dayjs } from 'dayjs'

export const RequestPersonalInfo = (): any => {
  return async (): Promise<Personal> => {
    return await instance.get('/personal/info')
  }
}
export const RequestPersonalInfoInit = ({
  name,
  sex,
  birthday,
  wechat,
  qq,
  github,
  university,
  home,
  universityEndTime,
  readme
}: CreatePersonal): any => {
  return async (): Promise<Personal> => {
    return await instance.post('/personal/info', {
      name,
      sex,
      birthday,
      wechat,
      qq,
      github,
      university,
      home,
      university_end_time: universityEndTime,
      readme
    })
  }
}
export const RequestPersonalInfoPut = ({
  name,
  sex,
  birthday,
  wechat,
  qq,
  github,
  university,
  home,
  universityEndTime,
  readme
}: CreatePersonal): any => {
  return async (): Promise<Personal> => {
    return await instance.put('/personal/info', {
      name,
      sex,
      birthday,
      wechat,
      qq,
      github,
      university,
      home,
      university_end_time: universityEndTime,
      readme
    })
  }
}

export interface CreatePersonal {
  name?: string
  sex?: string
  birthday?: Date | Dayjs
  wechat?: string
  qq?: string
  github?: string
  university?: string
  home?: string
  universityEndTime?: Date | Dayjs
  readme?: string
}
