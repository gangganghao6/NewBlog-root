import instance from '../request'
import { Image, List, ShareFile, Video, File, Project } from '../../utils/types'

export const RequestShareFileList = ({ size, page, sort, type }: List): any => {
  return async (): Promise<ShareFileReturn[]> => {
    return await instance.get('/share_files/list', {
      params: {
        size,
        page,
        sort,
        type
      }
    })
  }
}
export const RequestShareFileDownload = ({ id }: { id: string }): any => {
  return async (): Promise<null> => {
    return await instance.get(`/share_files/download/${id}`)
  }
}
export const RequestShareFilePost = ({
  type,
  mediaClass,
  video,
  image,
  file
}: CreateShareFile): any => {
  return async (): Promise<ShareFileReturn> => {
    return await instance.post(`/share_files/file`, {
      type,
      media_class: mediaClass,
      video,
      image,
      file
    })
  }
}
export const RequestShareFilePut = ({
  id,
  type
}: {
  id: string
  type: string
}): any => {
  return async (): Promise<ShareFile> => {
    return await instance.put(`/share_files/file/${id}`, {
      type
    })
  }
}
export const RequestShareFileDelete = ({ id }: { id: string }): any => {
  return async (): Promise<Project> => {
    return await instance.delete(`/share_files/file/${id}`)
  }
}

export interface CreateShareFile {
  type: string
  mediaClass: 'videos' | 'images' | 'files'
  video?: Video
  image?: Image
  file?: File
}

export interface ShareFileReturn {
  share_file: ShareFile
  file: Image | Video | File
}
