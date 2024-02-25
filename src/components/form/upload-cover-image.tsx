import { PostFileChunkUpload } from '@/requests/admin/files/file_chunk'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload, message, Image } from 'antd'
import { useEffect, useState } from 'react'

export default function UploadCoverImage({ value, onChange }: any) {
  const [fileList, setFileList] = useState<any>([])
  const [uploadFileList, setUploadFileList] = useState<any>([])
  const [showPreview, setShowPreview] = useState(false)
  const beforeUpload = (file: any) => {
    try {
      if (!file.type.startsWith('image')) {
        message.error(`格式[${file.type}]错误，请上传图片`)
        return false
      }
      PostFileChunkUpload([file]).then((res) => {
        const { name, compressUrl, url } = res[0].data
        setFileList([
          {
            uid: url,
            name: name,
            status: 'done',
            url,
            thumbUrl: compressUrl
          }
        ])
        setUploadFileList((pre: any) => [...pre, res[0].data])
      })
    } catch (e) {
      setFileList([])
      message.error('上传失败')
    }
    return false
  }
  const onRemove = (file: any) => {
    setFileList([])
    setUploadFileList([])
  }
  useEffect(() => {
    if (value) {
      setFileList([{ ...value, thumbUrl: value.compressUrl }])
    }
  }, [value?.id])
  useEffect(() => {
    if (uploadFileList.length === 0) {
      onChange(undefined)
    } else {
      onChange(uploadFileList[0])
    }
  }, [uploadFileList])

  return (
    <>
      <div className="text-[0px]">
        <Image
          src={fileList[0]?.url || ''}
          className="hidden"
          preview={{
            visible: showPreview,
            onVisibleChange: () => setShowPreview(false)
          }}
        ></Image>
      </div>
      <Upload
        listType="picture"
        beforeUpload={beforeUpload}
        onRemove={onRemove}
        fileList={fileList}
        maxCount={1}
        onPreview={() => {
          setShowPreview(true)
        }}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </>
  )
}
