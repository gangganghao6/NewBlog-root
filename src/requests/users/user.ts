import instance from '../request'
import { List, Pay, User } from '../../utils/types'

export const RequestUserInfo = ({ id }: { id: string }): any => {
  return async (): Promise<UserLoginReturn> => {
    return await instance.get(`/users/user/${id}`)
  }
}

export const RequestUserPut = ({
  id,
  name,
  isSubscribed,
  isBanned
}: PutUser): any => {
  return async (): Promise<UserLoginReturn> => {
    return await instance.put(`/users/user/${id}`, {
      is_subscribed: isSubscribed,
      name,
      is_banned: isBanned
    })
  }
}
export const RequestUserDetail = ({ id }: { id: string }): any => {
  return async (): Promise<User> => {
    return await instance.get(`/users/user_detail/${id}`)
  }
}
export const RequestPayList = ({ page, size, sort }: List): any => {
  return async (): Promise<Pay[]> => {
    return await instance.get(`/users/pay/list`, {
      params: {
        page,
        size,
        sort
      }
    })
  }
}

export interface UserLoginReturn {
  id: string
  name: string
  email: string
  is_subscribed: boolean
  is_banned: boolean
}

export interface PutUser {
  id: string
  name?: string
  isSubscribed?: boolean
  isBanned?: boolean
}

export interface CreatePayOrder {
  userId: string
  type: 'blog' | 'personal'
  blogId?: string
  money: number
  payType: 'alipay' | 'wechat'
}
