import instance from '../request'
import {
  type Image,
  type List,
  type ShareFile,
  type Video,
  type File,
  type Project
} from '../../utils/types'

export const GetShareFileList = async ({ size, page, sort, ...data }: List): Promise<ShareFileReturn[]> => {
  return await instance.get('/share_files/list', {
    params: {
      ...data,
      size,
      page,
      sort,
    }
  })
}
export const GetShareFileDetail = async ({ id }: List): Promise<ShareFileReturn[]> => {
  const result = await instance.get(`/share_files/file/${id}`)
  result.data.file = result.data.file || result.data.video || result.data.image
  return result
}
export const GetShareFileDownload = async ({ id }: { id: string }): Promise<null> => {
  return await instance.get(`/share_files/download/${id}`)
}
export const PostCreateShareFile = async ({
  ...data
}: CreateShareFile): Promise<ShareFileReturn> => {
  return await instance.post(`/share_files/file`, {
    ...data
  })
}
export const PutEditShareFile = async ({
  id,
  ...data
}: {
  id: string
  type: string
}): Promise<ShareFile> => {
  return await instance.put(`/share_files/file/${id}`, {
    ...data
  })
}
export const DeleteShareFile = async ({ id }: { id: string }): Promise<null> => {
  return await instance.delete(`/share_files/file/${id}`)
}
export const GetRandomShareFile = async (): Promise<ShareFileReturn> => {
  return await instance.get(`/share_files/random-file`)
}
export interface CreateShareFile {
  name: string
  video?: Video
  image?: Image
  file?: File
}

export interface ShareFileReturn {
  file: File
  video: Video
  image: Image
  name: string
}
