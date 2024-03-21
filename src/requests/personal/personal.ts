import instance from '../request'
import { type Personal } from '../../utils/types'
import { type Dayjs } from 'dayjs'

export const GetPersonalInfoDetail = async ({ increase = false }): Promise<Personal> => {
  return await instance.get(`/personal/info?increase=${increase}`)
}
export const PutEditPersonalInfo = async ({
  name,
  sex,
  birthday,
  wechat,
  qq,
  githubName,
  githubUrl,
  university,
  home,
  universityEndTime,
  content
}: CreatePersonal): Promise<Personal> => {
  return await instance.put('/personal/info', {
    name,
    sex,
    birthday,
    wechat,
    qq,
    githubName,
    githubUrl,
    university,
    home,
    universityEndTime,
    content
  })
}

export interface CreatePersonal {
  name?: string
  sex?: string
  birthday?: Date | Dayjs
  wechat?: string
  qq?: string
  githubName?: string
  githubUrl?: string
  university?: string
  home?: string
  universityEndTime?: Date | Dayjs
  content?: string
}
