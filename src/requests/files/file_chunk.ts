import { message } from 'antd'
import instance from '../request'
import { FilesChunkRequest, FilesMergeRequest, FilesMergeReturn, Md5CheckRequest } from './file_chunk.d'
import { getVideoPost } from '@/utils/media'
import { GlobalInfo } from '@/state/base'

const getMd5Check = async (requestObj: Md5CheckRequest, md5: string): Promise<any> => {
  return await instance.post(`/files/md5Check?md5=${md5}`, requestObj)
}
const sendRequest = async (file: File, requestObj: FilesMergeRequest, md5: string): Promise<any> => {
  const eachSize = 5 * 1024 * 1024
  const totalSlicesNum = Math.ceil(requestObj.size / eachSize)
  const tempResults = []
  for (let currentSlicesNum = 1; currentSlicesNum <= totalSlicesNum; currentSlicesNum++) {
    const formData = new FormData()
    const fileSlice: string | Blob = file.slice(
      (currentSlicesNum - 1) * eachSize,
      currentSlicesNum * eachSize
    )
    const info: FilesChunkRequest = {
      currentSlicesNum,
      totalSlicesNum
    }
    formData.append('info', JSON.stringify(info))
    formData.append('file', fileSlice)
    const tempResult: { data: FilesMergeReturn, code: number } = await instance.post(
      `/files/fileChunk?md5=${md5}`,
      formData,
      {
        headers: {
          contentType: 'multipart/form-data'
        }
      }
    )
    if (tempResult.code !== 200) {
      message.error('上传发生错误')
    } else {
      tempResults.push(tempResult)
    }
  }
  if (tempResults.some((result) => result.code !== 200)) {
    message.error('上传发生错误')
  }
  const result: FilesMergeReturn = await instance.post(
    `/files/fileMerge?md5=${md5}`,
    requestObj
  )
  return result
}

export const PostFileChunkUpload = async (filesObj: any): Promise<any> => {
  const files = Object.keys(filesObj).map((key) => {
    return filesObj[key]
  })
  const missions = files.map((file: any) => {
    return new Promise(async (resolve, reject) => {
      const worker = new Worker(new URL('./worker.ts', import.meta.url), {
        type: 'module'
      })
      worker.postMessage(file)
      worker.onmessage = async (e) => {
        const { type, msg }: { type: 'calculate' | 'progress', msg: string } = e.data
        if (type === 'calculate') {
          const requestObj: FilesMergeRequest = {
            originalName: file.name,
            fileSuffix: file.name.split('.').at(-1),
            fileType: file.type,
            size: file.size,
            mediaType: file.type.split('/')[0]
          }
          const result = await getMd5Check(requestObj, msg)
          if (result.code !== 200) {
            if (file.type.split('/')[0] === 'video') {
              const post = await getVideoPost(file)
              const postResult = await PostFileChunkUpload([post.file])
              const videoResult = await sendRequest(file, requestObj, msg)
              videoResult.data.post = postResult[0].data
              videoResult.data.duration = post.duration
              resolve(videoResult)
            } else {
              resolve(await sendRequest(file, requestObj, msg))
            }
          } else {
            if (file.type.split('/')[0] === 'video') {
              const post = await getVideoPost(file)
              const postResult = await PostFileChunkUpload([post.file])
              result.data.post = postResult[0].data
              result.data.duration = post.duration
              resolve(result)
            } else {
              resolve(result)
            }
          }
        } else if (type === 'progress') {
          console.log(msg)
        }
      }
    })
  })
  GlobalInfo.loading = true
  const finalResult = await Promise.all(missions)
  GlobalInfo.loading = false
  return finalResult
}
