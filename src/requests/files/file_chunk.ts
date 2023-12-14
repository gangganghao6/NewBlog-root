import instance from '../request'

const getMd5Check = async (data: {
  md5: string
  originalName: string
  fileType: string
}): Promise<any> => {
  const result = await instance.post(`/files/md5Check?md5=${data.md5}`, data)
  return result.data
}
const sendRequest = async (file: File, md5: string): Promise<any> => {
  const fileType = file.name.split('.').at(-1)
  const originalName = file.name
  const fileSize = file.size
  const eachSize = 5 * 1024 * 1024
  const totalSlices = Math.ceil(fileSize / eachSize)
  const tempResults = []
  for (let currentSlices = 1; currentSlices <= totalSlices; currentSlices++) {
    const formData = new FormData()
    const fileSlice: string | Blob = file.slice(
      (currentSlices - 1) * eachSize,
      currentSlices * eachSize
    )
    const info = {
      currentSlicesNum: currentSlices,
      totalSlicesNum: totalSlices
      // md5,
    }
    formData.append('info', JSON.stringify(info))
    formData.append('file', fileSlice)
    const tempResult = await instance.post(
      `/files/fileChunk?md5=${md5}`,
      formData,
      {
        headers: {
          contentType: 'multipart/form-data'
        }
      }
    )
    if (tempResult.data.code !== 200) {
      alert('上传发生错误')
    } else {
      tempResults.push(tempResult)
    }
  }
  if (tempResults.some((result) => result.data.code !== 200)) {
    alert('上传发生错误')
  }
  const result: Files_return = await instance.post(
    `/files/fileMerge?md5=${md5}`,
    {
      // md5,
      fileType,
      originalName
    }
  )
  return result
}

export const RequestFileChunkUpload = async (filesObj: any): Promise<any> => {
  const files = Object.keys(filesObj).map((key) => {
    return filesObj[key]
  })
  const missions = files.map(async (file: any) => {
    const worker = new Worker(new URL('./worker.ts', import.meta.url), {
      type: 'module'
    })
    worker.postMessage(file)
    worker.onmessage = async (e) => {
      const { type, msg }: { type: 'count' | 'progress'; msg: string } = e.data
      if (type === 'count') {
        const result = await getMd5Check({
          md5: msg,
          originalName: file.name,
          fileType: file.type
        })
        if (result.code !== 200) {
          return await sendRequest(file, msg)
        }
      } else if (type === 'progress') {
        console.log(msg)
      }
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
