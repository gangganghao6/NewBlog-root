import { List, Todolist } from '../../utils/types'
import instance from '../request'
import { Dayjs } from 'dayjs'

export const RequestTodolistList = ({ size, page, sort, type }: List): any => {
  return async (): Promise<Todolist[]> => {
    return await instance.get('/todolists/list', {
      params: {
        size,
        page,
        sort,
        type
      }
    })
  }
}
export const RequestTodolistPost = ({
  title,
  isDone,
  isDoneTime,
  createdTime
}: PutTodolist): any => {
  return async (): Promise<Todolist> => {
    return await instance.post('/todolists/list', {
      title,
      is_done: isDone,
      is_done_time: isDoneTime,
      created_time: createdTime
    })
  }
}
export const RequestTodolistPut = ({
  id,
  title,
  isDone,
  isDoneTime,
  createdTime
}: PutTodolist & { id: string }): any => {
  return async (): Promise<Todolist> => {
    return await instance.post(`/todolists/list/${id}`, {
      title,
      is_done: isDone,
      is_done_time: isDoneTime,
      created_time: createdTime
    })
  }
}
export const RequestTodolistDelete = ({ id }: { id: string }): any => {
  return async (): Promise<any> => {
    return await instance.delete(`/share_files/file/${id}`)
  }
}
export interface PutTodolist {
  title?: string
  isDone?: boolean
  isDoneTime?: Date | Dayjs
  createdTime?: Date | Dayjs
}
