import { Button, Input, Tooltip, message } from 'antd'
import styles from './chat.module.scss'
import SingleMessage from './single-message'
import { FileOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import { useRequest } from 'ahooks'
import { GetChatList } from '@/requests/chats/chat'
import useChat from './useChat'
import UploadButton from './upload-button'
export default function FrontChat() {
  const [content, setContent] = useState('')
  const messageAreaRef = useRef<HTMLDivElement>(null)
  const [firstMessageId, setFirstMessageId] = useState()
  const {
    ws,
    messages,
    onlineUserCount,
    setMessages,
    isConnected,
    isBanned,
    user
  } = useChat(messageAreaRef)
  const { data: messageData, run: GetMessage } = useRequest(
    (page) => GetChatList({ page, sort: 'desc', size: 10, reverse: true }),
    {
      manual: true
    }
  )
  const [currentPage, setCurrentPage] = useState(1)
  const onSubmitMessage = ({ content, image, video, file }: any) => {
    return () => {
      if (content) {
        ws.send(JSON.stringify({ content, type: 'message' }))
        setContent('')
      } else if (image) {
        ws.send(JSON.stringify({ image, type: 'message' }))
      } else if (video) {
        ws.send(JSON.stringify({ video, type: 'message' }))
      } else {
        ws.send(JSON.stringify({ file, type: 'message' }))
      }
    }
  }
  useEffect(() => {
    if (messageData) {
      setMessages((pre) => [...messageData?.data?.result, ...pre])
      setTimeout(() => {
        const scrollLength = firstMessageId
          ? document.querySelector(`.message-${firstMessageId}`)?.offsetTop
          : messageAreaRef?.current?.scrollHeight
        messageAreaRef?.current?.scrollTo({
          top: scrollLength
        })
      }, 16)
    }
  }, [messageData])
  useEffect(() => {
    GetMessage(currentPage)
  }, [currentPage])
  return (
    <>
      <div className={styles.container}>
        <div
          className={styles['message-area']}
          ref={messageAreaRef}
          onScroll={(e) => {
            if (e.target.scrollTop === 0) {
              setCurrentPage((pre) => pre + 1)
              setFirstMessageId(messages[0]?.id)
            }
          }}
        >
          {messages.map((item, index) => {
            return (
              <SingleMessage
                className={`message-${item?.id}`}
                key={item?.id}
                role={item?.userId === user?.data?.id ? 'self' : 'other'}
                message={item}
                self={user}
              />
            )
          })}
        </div>
        <div className={styles.utils}>
          <UploadButton onSubmitMessage={onSubmitMessage} disabled={isBanned}>
            <Tooltip title="上传文件">
              <FileOutlined />
            </Tooltip>
          </UploadButton>
        </div>
        <div className={styles.input}>
          <Input.TextArea
            autoSize={{ minRows: 5, maxRows: 5 }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onPressEnter={onSubmitMessage({ content })}
            maxLength={500}
            placeholder="最多输入500个字符"
            disabled={isBanned}
          />
        </div>
        <div className={styles.submit}>
          <span className={styles['online-count']}>
            <span>当前在线人数：{onlineUserCount}</span>
            <span className="ml-2">
              连接状态：{isConnected ? '已连接' : '未连接'}
            </span>
          </span>
          <Button
            type="primary"
            className="mr-2"
            disabled={isBanned}
            onClick={onSubmitMessage({ content })}
          >
            发送
          </Button>
        </div>
      </div>
    </>
  )
}
