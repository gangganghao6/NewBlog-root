import instance from '../request'
import { Chat, List } from '../../utils/types'

export const RequestChatList = ({
  size,
  page,
  sort,
  userId
}: List & { userId?: string }): any => {
  return async (): Promise<Chat[]> => {
    return await instance.get(`/chats/list`, {
      params: { size, page, sort, user_id: userId }
    })
  }
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
