import instance from '../request'
import { type Chat, type List } from '../../utils/types'

export const GetChatList = async ({
  size,
  page,
  sort,
  ...data
}: List): Promise<Chat[]> => {
  return await instance.get(`/chats/list`, {
    params: { size, page, sort, ...data }
  })
}
export const GetChatDetail = async ({
  id
}: any): Promise<Chat> => {
  return await instance.get(`/chats/chat/${id}`, {
    params: { id }
  })
}
export const DeleteChat = async ({ id }: { id: string }): Promise<any> => {
  return await instance.delete(`/chats/chat/${id}`)
}
// export const RequestUserChatDelete = ({ id }: { id: string }): any => {
//   return async (): Promise<any> => {
//     return await instance.delete(`/chats/user/${id}`)
//   }
// }
