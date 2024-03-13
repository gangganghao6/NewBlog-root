import { Button, Input, message } from 'antd'
import styles from './chat.module.scss'
import SingleMessage from './single-message'
import { FileImageOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import { UserAuth } from '@/requests/users/user'
import { useRequest } from 'ahooks'
import { GetChatList } from '@/requests/chats/chat'
export default function FrontChat() {
  const [ws, setWs] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [content, setContent] = useState('')

  const messageAreaRef = useRef<HTMLDivElement>(null)
  const [firstMessageId, setFirstMessageId] = useState()

  const { data: user } = useRequest(UserAuth)
  const { data: messageData, run: GetMessage } = useRequest(
    (page) => GetChatList({ page, sort: 'desc', size: 10 }),
    {
      manual: true
    }
  )
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    if (user) {
      const ws = new WebSocket(
        `${import.meta.env.VITE_WS_LINK}?userId=${user?.data?.id}`
      )
      ws.onopen = () => {
        message.success('连接成功')
      }
      ws.onmessage = (e) => {
        const data = JSON.parse(e?.data)?.data
        if (data?.type === 'boardcast') {
          message.success(data?.onLineCount)
        } else if (data?.type === 'message') {
          setMessages((pre) => [...pre, data])
          setTimeout(() => {
            messageAreaRef?.current?.scrollTo({
              top: messageAreaRef?.current?.scrollHeight,
              behavior: 'smooth'
            })
          }, 16)
        }
      }
      setWs(ws)
    }
  }, [user])
  useEffect(() => {
    if (messageData) {
      setMessages((pre) => [...messageData?.data, ...pre])
      setTimeout(() => {
        const scrollLength = firstMessageId
          ? document.querySelector(`.message-${firstMessageId}`)?.offsetTop
          : messageAreaRef?.current?.scrollHeight
        messageAreaRef?.current?.scrollTo({
          top: scrollLength,
          behavior: 'smooth'
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
        {/* <div className={styles['chat-topbar']}>
            当前在线人数：100
        </div> */}
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
          <FileImageOutlined className={styles['utils-button']} />
          <VideoCameraOutlined className={styles['utils-button']} />
        </div>
        <div className={styles.input}>
          <Input.TextArea
            autoSize={{ minRows: 5, maxRows: 5 }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className={styles.submit}>
          <Button
            type="primary"
            className="mr-2"
            onClick={() => {
              ws.send(JSON.stringify({ content, type: 'message' }))
              setContent('')
            }}
          >
            发送
          </Button>
        </div>
      </div>
    </>
  )
}
