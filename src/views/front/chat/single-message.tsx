import { Avatar, Button, Image, Tooltip } from 'antd'
import styles from './single-message.module.scss'
import clsx from 'clsx'
import { formatTime } from '@/utils/utils'
import { useState } from 'react'
import { PlayCircleOutlined } from '@ant-design/icons'
import FilePng from '@/asserts/file.png'
import { VideoRender } from '@/components/form/media-list-preview'

// const videoRender = (url: string) => {
//   return (ele: any) => {
//     return (
//       <video className="w-[auto] max-h-[80%]" src={url} controls autoPlay muted></video>
//     )
//   }
// }

export default function SingleMessage({
  role = 'other',
  message = {},
  self = {},
  className = ''
}) {
  return (
    <div
      className={clsx(
        styles['chat-single-message'],
        {
          [styles.right]: role === 'self'
        },
        className
      )}
    >
      <Avatar className={styles.avatar}>
        {message?.user?.name?.slice(0, 1)}
      </Avatar>
      <div className={styles.content}>
        <div className={styles['user-container']}>
          <div className={styles.username}>{message?.user?.name}</div>
          <Tooltip title={message?.id}>
            <div className={styles.time}>
              {formatTime(message?.createdTime, true)}
            </div>
          </Tooltip>
          <div className={styles.time}>{}</div>
        </div>
        {message?.content && (
          <div className={clsx(styles.message, styles['message-common'])}>
            {message?.content}
          </div>
        )}
        {message?.image && (
          <div className={styles['image-container']}>
            <Image
              width={'20vw'}
              height={'auto'}
              className={styles.image}
              src={message?.image?.compressUrl}
              preview={{ src: message?.image?.url }}
            />
          </div>
        )}
        {message?.video && (
          <div className={styles['video-container']}>
            <Image
              width={'20vw'}
              height={'auto'}
              className={styles.video}
              src={message?.video?.post?.url}
              preview={{
                toolbarRender: () => <></>,
                imageRender: VideoRender(message?.video?.url),
                mask: <PlayCircleOutlined className="text-4xl" />
              }}
            ></Image>
          </div>
        )}
        {message?.file && (
          <div
            className={clsx(styles['file-container'], styles['message-common'])}
          >
            <img className={clsx(styles['file-icon'])} src={FilePng} />
            <div className={styles['file-detail']}>
              <div className={styles['file-name']}>
                {message?.file?.originalName}
              </div>
              <div className={styles['file-action']}>
                <div className={styles['file-size']}>
                  {formatFileSize(message?.file?.size)}
                </div>
                <div className={styles['file-button']}>
                  <Button type="link" href={message?.file?.url}>
                    下载
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
const formatFileSize = (size: number) => {
  size = Number(size)
  const kb = 1024
  const mb = kb * 1024
  const gb = mb * 1024
  if (size < kb) {
    return size + 'B'
  } else if (size < mb) {
    return (size / kb).toFixed(2) + 'KB'
  } else if (size < gb) {
    return (size / mb).toFixed(2) + 'MB'
  } else {
    return (size / gb).toFixed(2) + 'GB'
  }
}
