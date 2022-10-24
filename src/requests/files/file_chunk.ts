import { v4 } from 'uuid'
import instance from '../request'

const MEDIA_TYPE = {
  IMAGES: 'images',
  VIDEOS: 'videos',
  FILES: 'files'
}
export const RequestFileChunkUpload = (setUploadResult: any): any => {
  return async (e: any): Promise<void> => {
    const file = e.target.files[0]
    const fileType = file.name.split('.').at(-1)
    const fileSize = file.size
    const eachSize = 2 * 1024 * 1024
    const totalSlices = Math.ceil(fileSize / eachSize)
    const uuid = v4()
    const mediaClass = MEDIA_TYPE.IMAGES
    const formData = new FormData()
    const missions = []
    for (let currentSlices = 1; currentSlices <= totalSlices; currentSlices++) {
      const fileSlice = file.slice(
        (currentSlices - 1) * eachSize,
        currentSlices * eachSize
      )
      const info = {
        current_slices: currentSlices,
        total_slices: totalSlices,
        file_type: fileType,
        uuid,
        media_class: mediaClass
      }
      formData.append('file', fileSlice)
      formData.append('info', JSON.stringify(info))
      missions.push(
        instance.post('/files/file_chunk', formData, {
          headers: {
            contentType: 'multipart/form-data'
          }
        })
      )
    }
    const tempResults = await Promise.all(missions)
    if (tempResults.some((result) => result.data.code !== 200)) {
      alert('上传发生错误')
    }
    const result: Files_return = await instance.post('/files/file_merge', {
      uuid,
      media_class: mediaClass,
      file_type: fileType
    })
    setUploadResult(result)
  }
}

export interface Files_return {
  name: string
  url: string
  size: number
  media_class: 'images' | 'videos' | 'files'
  file_type: string // 'txt'/'jpg'...
  duration?: number
}
