import instance from '../request'
import { type List, type Pay, type User } from '../../utils/types'
import isMobile from 'is-mobile'

export const GetUserDetail = async ({ id }: { id: string }): Promise<UserLoginReturn> => {
  return await instance.get(`/users/user/${id}`)
}

export const PutEditUser = async ({
  id,
  name,
  isSubscribed,
  isBanned
}: PutUser): Promise<UserLoginReturn> => {
  return await instance.put(`/users/user/${id}`, {
    isSubscribed,
    name,
    isBanned
  })
}
export const PostCreateUser = async ({ name, email }: User): Promise<any> => {
  return await instance.post(`/users/regist`, {
    name,
    email
  })
}
export const GetUserList = async ({ page, size, sort, ...data }: List): Promise<any> => {
  return await instance.get(`/users/list`, {
    params: {
      size,
      page,
      sort,
      // type,
      ...data
    }
  })
}
export const DeleteUser = async ({ id }: { id: string }): Promise<any> => {
  return await instance.delete(`/users/user/${id}`)
}
export const UserLogin = async ({ email }: { email: string }): Promise<any> => {
  return await instance.post(`/users/login`, {
    email
  })
}
export const UserLogout = async (): Promise<any> => {
  return await instance.post(`/users/logout`)
}
export const UserRegist = async ({ name, email }: User): Promise<any> => {
  return await instance.post(`/users/regist`, {
    name,
    email
  })
}
export const UserAuth = async (): Promise<any> => {
  return await instance.post('/users/auth')
}
export const UserCreatePayOrder = async ({ blogId, money, type, message, payType }: CreatePayOrder): Promise<any> => {
  return await instance.post('/users/pay/create', { blogId, money, type, message, payType, isMobile: isMobile() })
}
export const UserConfirmPayOrder = async ({ outTradeNo }: { outTradeNo: string }): Promise<any> => {
  return await instance.get(`/users/pay/confirm`, {
    params: {
      outTradeNo
    }
  })

}
export const GetPayList = async ({ page, size, sort, ...data }: List): Promise<Pay[]> => {
  return await instance.get(`/users/pay/list`, {
    params: {
      page,
      size,
      sort,
      ...data
    }
  })
}
export const GetPayDetail = async ({ id }: any): Promise<Pay> => {
  return await instance.get(`/users/pay/${id}`)
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
  type: 'blog' | 'personal'
  isMobile?: boolean
  blogId?: string
  message?: string
  money: number
  payType: 'alipay' | 'wechat'
}
