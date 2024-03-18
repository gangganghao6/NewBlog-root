import { Upload } from 'antd'
import styles from './upload-button.module.scss'
import { PostFileChunkUpload } from '@/requests/files/file_chunk'

export default function UploadButton({
  children,
  onSubmitMessage,
  disabled
}: any) {
  const beforeUpload = (file: any) => {
    PostFileChunkUpload([file]).then((res) => {
      const data = res[0].data
      if (data?.mediaType === 'image') {
        onSubmitMessage({ image: data })()
      } else if (data?.mediaType === 'video') {
        onSubmitMessage({ video: data })()
      } else {
        onSubmitMessage({ file: data })()
      }
    })
    return false
  }
  return (
    <Upload
      className={styles['upload-button']}
      beforeUpload={beforeUpload}
      showUploadList={false}
      disabled={disabled}
    >
      {children}
    </Upload>
  )
}
