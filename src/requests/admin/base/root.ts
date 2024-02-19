import instance from '../request'
import CryptoJS from 'crypto-js'

export const rootLogin = async ({ account, password }: RootLogin): Promise<any> => {
  const myPassword = CryptoJS.AES.encrypt(
    password,
    import.meta.env.VITE_CRYPTO_KEY as string
  ).toString()
  return await instance.post('/base/root/login', {
    account,
    password: myPassword
  })
}
export const rootRegist = async ({
  account,
  email,
  password,
  name
}: RootRegist): Promise<any> => {
  const myPassword = CryptoJS.AES.encrypt(
    password,
    import.meta.env.VITE_CRYPTO_KEY as string
  ).toString()
    return await instance.post('/base/root/regist', {
      account,
      password: myPassword,
      email,
      name
    })
}
export const RequestRootPut = ({
  id,
  newPassword,
  oldPassword
}: RootModify): any => {
  const myNewPassword = CryptoJS.AES.encrypt(
    newPassword,
    import.meta.env.VITE_CRYPTO_KEY as string
  ).toString()
  const myOldPassword = CryptoJS.AES.encrypt(
    oldPassword,
    import.meta.env.VITE_CRYPTO_KEY as string
  ).toString()
  return async (): Promise<RootLoginReturn> => {
    return await instance.put('/base/root/modify', {
      id,
      new_password: myNewPassword,
      old_password: myOldPassword
    })
  }
}
export const rootAuth = async (): Promise<any> => {
  return await instance.post('/base/root/auth')
}
export interface RootLogin {
  account: string
  password: string
}

export interface RootLoginReturn {
  id: string
  account: string
  email: string
}

export interface RootRegist {
  account: string
  password: string
  email: string,
  name: string
}

export interface RootModify {
  id: string
  newPassword: string
  oldPassword: string
}
