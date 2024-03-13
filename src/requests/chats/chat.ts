import instance from '../request'
import { type Chat, type List } from '../../utils/types'

export const GetChatList = async ({
  size,
  page,
  sort,
  userId
}: List): Promise<Chat[]> => {
  return await instance.get(`/chats/list`, {
    params: { size, page, sort, userId }
  })
}
export const RequestChatDelete = ({ id }: { id: string }): any => {
  return async (): Promise<any> => {
    return await instance.delete(`/chats/chat/${id}`)
  }
}
export const RequestUserChatDelete = ({ id }: { id: string }): any => {
  return async (): Promise<any> => {
    return await instance.delete(`/chats/user/${id}`)
  }
}
