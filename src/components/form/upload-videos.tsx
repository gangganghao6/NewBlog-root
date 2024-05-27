import { PostFileChunkUpload } from '@/requests/files/file_chunk'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload, message, Image } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { formatVideoFromResult } from './format-media-from-result'

export default function UploadCoverImage({ value, onChange }: any) {
  const [fileList, setFileList] = useState<any>([])
  const [uploadFileList, setUploadFileList] = useState<any>([])
  const [showPreview, setShowPreview] = useState(false)
  const [previewData, setPreviewData] = useState<any>({})
  const handleVideoUpload = (file: any) => {
    PostFileChunkUpload([file]).then((videoRes) => {
      setFileList((pre: any) => [...pre, formatVideoFromResult(videoRes[0].data)])
      setUploadFileList((pre: any) => [...pre, videoRes[0].data])
    })
  }
  const beforeUpload = (file: any) => {
    try {
      if (file.type.startsWith('video')) {
        handleVideoUpload(file)
      }
    } catch (e) {
      setFileList([])
      setUploadFileList([])
      message.error('上传失败')
    }
    return false
  }
  const onRemove = (file: any) => {
    const index = fileList.indexOf(file)
    const uploadIndex = uploadFileList.findIndex(
      (item: any) => item.url === file.url
    )
    const newFileList = fileList.slice()
    const newUploadFileList = uploadFileList.slice()
    newFileList.splice(index, 1)
    newUploadFileList.splice(uploadIndex, 1)
    setFileList(newFileList)
    setUploadFileList(newUploadFileList)
  }

  const videoRender = useCallback(
    (element: any) => {
      return (
        <video
          className="max-w-[90%] max-h-[80%]"
          src={previewData.url}
          controls
          autoPlay
          muted
        ></video>
      )
    },
    [previewData]
  )
  useEffect(() => {
    if (uploadFileList.length === 0) {
      onChange(undefined)
    } else {
      onChange(uploadFileList)
    }
  }, [uploadFileList])
  useEffect(() => {
    if (value) {
      setFileList(value.map((item: any) => formatVideoFromResult(item)))
      setUploadFileList(value)
    }
  }, [value?.length])
  return (
    <>
      <div className="text-[0px]">
        <Image
          src={previewData?.url || ''}
          className="hidden"
          preview={{
            toolbarRender: () => <></>,
            imageRender: videoRender,
            visible: showPreview,
            onVisibleChange: () => setShowPreview(false)
          }}
        ></Image>
      </div>
      <Upload
        multiple
        listType="picture"
        beforeUpload={beforeUpload}
        onRemove={onRemove}
        fileList={fileList}
        maxCount={9}
        onPreview={(data) => {
          setPreviewData(data)
          setShowPreview(true)
        }}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </>
  )
}
