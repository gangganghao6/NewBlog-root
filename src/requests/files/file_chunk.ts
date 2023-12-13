import { v4 } from 'uuid'
import instance from '../request'

const MEDIA_TYPE = {
  IMAGES: 'images',
  VIDEOS: 'videos',
  FILES: 'files'
}
const sendRequest = async (file: File): Promise<any> => {
  // const file = e.target.files[0]
  const fileType = file.name.split('.').at(-1)
  const fileName = file.name.split('.').slice(0, -1).join('.')
  const fileSize = file.size
  const eachSize = 5 * 1024 * 1024
  const totalSlices = Math.ceil(fileSize / eachSize)
  const uuid = v4()
  const mediaType = MEDIA_TYPE.IMAGES
  const formData = new FormData()
  const missions = []
  for (let currentSlices = 1; currentSlices <= totalSlices; currentSlices++) {
    const fileSlice: string | Blob = file.slice(
      (currentSlices - 1) * eachSize,
      currentSlices * eachSize
    )
    const info = {
      currentSlicesNum: currentSlices,
      totalSlicesNum: totalSlices,
      fileType: fileType,
      uuid,
      mediaType: mediaType
    }
    formData.append('file', fileSlice)
    formData.append('info', JSON.stringify(info))
    missions.push(
      instance.post('/files/fileChunk', formData, {
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
  const result: Files_return = await instance.post('/files/fileMerge', {
    uuid,
    mediaType: mediaType,
    fileType: fileType
  })
  // setUploadResult(result)
  return result
}

export const RequestFileChunkUpload = async (filesObj: any): Promise<any> => {
  const files = Object.keys(filesObj).map((key) => {
    return filesObj[key]
  })
  const missions = files.map((file: any) => {
    return sendRequest(file)
  })
  return await Promise.all(missions)
}

export interface Files_return {
  name: string
  url: string
  size: number
  mediaType: 'images' | 'videos' | 'files'
  fileType: string // 'txt'/'jpg'...
  duration?: number
}
