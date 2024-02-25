import { type List, type Todolist } from '../../utils/types'
import instance from '../request'
import { type Dayjs } from 'dayjs'

export const GetTodoListList = async ({ size, page, sort, type, ...data }: List): Promise<Todolist[]> => {
  return await instance.get('/todolists/list', {
    params: {
      size,
      page,
      sort,
      type,
      ...data
    }
  })
}
export const PostCreateTodoList = async ({
  title,
  isDone,
  isDoneTime,
  createdTime
}: PutTodolist): Promise<Todolist> => {
  return await instance.post('/todolists/todolist', {
    title,
    isDone,
    isDoneTime,
    createdTime
  })
}
export const PutEditTodoList = async ({
  id,
  title,
  isDone,
  isDoneTime,
  createdTime
}: PutTodolist & { id: string }): Promise<Todolist> => {
  return await instance.put(`/todolists/todolist/${id}`, {
    title,
    isDone,
    isDoneTime,
    createdTime
  })
}
export const DeleteTodoList = async ({ id }: { id: string }): Promise<any> => {
  return await instance.delete(`/todolists/todolist/${id}`)
}
export const GetTodoListDetail = async ({ id }: { id: string }): Promise<Todolist> => {
  return await instance.get(`/todolists/todolist/${id}`)
}
export interface PutTodolist {
  title?: string
  isDone?: boolean
  isDoneTime?: Date | Dayjs
  createdTime?: Date | Dayjs
}
