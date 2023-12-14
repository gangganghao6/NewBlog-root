import { v4 } from 'uuid'
import instance from '../request'
import { createHash } from './utils'

const getMd5Check = async (data: { md5: string, originalName: string, fileType: string }): Promise<any> => {
  const result = await instance.post('/files/md5Check', data)
  return result.data
}
const sendRequest = async (file: File, md5: string): Promise<any> => {
  const fileType = file.name.split('.').at(-1)
  const originalName = file.name
  const fileSize = file.size
  const eachSize = 5 * 1024 * 1024
  const totalSlices = Math.ceil(fileSize / eachSize)
  const formData = new FormData()
  let tempResults = []
  for (let currentSlices = 1; currentSlices <= totalSlices; currentSlices++) {
    const fileSlice: string | Blob = file.slice(
      (currentSlices - 1) * eachSize,
      currentSlices * eachSize
    )
    const info = {
      currentSlicesNum: currentSlices,
      totalSlicesNum: totalSlices,
      md5,
    }
    formData.append('info', JSON.stringify(info))
    formData.append('file', fileSlice)
    const tempResult = await instance.post('/files/fileChunk', formData, {
      headers: {
        contentType: 'multipart/form-data'
      }
    })
    if (tempResult.data.code !== 200) {
      alert('上传发生错误')
    } else {
      tempResults.push(tempResult)
    }
  }
  if (tempResults.some((result) => result.data.code !== 200)) {
    alert('上传发生错误')
  }
  const result: Files_return = await instance.post('/files/fileMerge', {
    md5,
    fileType: fileType,
    originalName: originalName
  })
  return result
}

export const RequestFileChunkUpload = async (filesObj: any): Promise<any> => {
  const files = Object.keys(filesObj).map((key) => {
    return filesObj[key]
  })
  const missions = files.map(async (file: any) => {
    const md5 = await createHash(file)
    const result = await getMd5Check({ md5, originalName: file.name, fileType: file.type })
    if (result.code !== 200) {
      return sendRequest(file, md5)
    }
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
