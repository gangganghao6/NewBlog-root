import {
  formatFileFromResult,
  formatImageFromResult,
  formatVideoFromResult
} from '@/components/form/format-media-from-result'
import { PostFileChunkUpload } from '@/requests/files/file_chunk'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload, message, Image } from 'antd'
import { useCallback, useEffect, useState } from 'react'

export default function UploadFile({ value, onChange, form }: any) {
  const [fileList, setFileList] = useState<any>([])
  const [uploadFileList, setUploadFileList] = useState<any>([])
  const [showPreview, setShowPreview] = useState(false)
  const [previewData, setPreviewData] = useState<any>({})
  const handleVideoUpload = (file: any) => {
    PostFileChunkUpload([file]).then((videoRes) => {
      setFileList([formatVideoFromResult(videoRes[0].data)])
      setUploadFileList([videoRes[0].data])
    })
  }
  const handleImageUpload = (file: any) => {
    PostFileChunkUpload([file]).then((res) => {
      setFileList([formatImageFromResult(res[0].data)])
      setUploadFileList([res[0].data])
    })
  }
  const handleFileUpload = (file: any) => {
    PostFileChunkUpload([file]).then((res) => {
      setFileList([formatFileFromResult(res[0].data)])
      setUploadFileList([res[0].data])
    })
  }
  const beforeUpload = (file: any) => {
    try {
      if (file.type.startsWith('video')) {
        handleVideoUpload(file)
      } else if (file.type.startsWith('image')) {
        handleImageUpload(file)
      } else {
        handleFileUpload(file)
      }
    } catch (e) {
      setFileList([])
      setUploadFileList([])
      message.error('上传失败')
    }
    return false
  }
  const onRemove = (file: any) => {
    setFileList([])
    setUploadFileList([])
  }

  const videoRender = useCallback(
    (element: any) => (
      <video
        className="max-w-[90%] max-h-[80%]"
        src={previewData.url}
        controls
        autoPlay
        muted
      ></video>
    ),
    [previewData]
  )
  useEffect(() => {
    if (uploadFileList.length === 0) {
      onChange(undefined)
    } else {
      onChange(uploadFileList[0])
      form.setFieldValue('name', uploadFileList?.[0]?.originalName || '')
    }
  }, [uploadFileList])
  useEffect(() => {
    if (value) {
      if (value.mediaType === 'video') {
        setFileList([formatVideoFromResult(value)])
      } else if (value.mediaType === 'image') {
        setFileList([formatImageFromResult(value)])
      } else {
        setFileList([formatFileFromResult(value)])
      }
      setUploadFileList([value])
    }
  }, [value?.id])
  return (
    <>
      <div className="text-[0px]">
        {previewData?.type === 'video' && (
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
        )}
        {previewData?.type === 'image' && (
          <Image
            src={previewData?.url || ''}
            className="hidden"
            preview={{
              visible: showPreview,
              onVisibleChange: () => setShowPreview(false)
            }}
          ></Image>
        )}
      </div>
      <Upload
        multiple
        listType="picture"
        beforeUpload={beforeUpload}
        onRemove={onRemove}
        fileList={fileList}
        maxCount={9}
        onPreview={(data) => {
          if (data.type !== 'file') {
            setPreviewData(data)
            setShowPreview(true)
          } else {
            window.open(data?.url)
          }
        }}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </>
  )
}
