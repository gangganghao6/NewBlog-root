import { UserAuth } from '@/requests/users/user'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import { Ref, useEffect, useState } from 'react'

export default (scrollRef: Ref<HTMLElement>) => {
  const { data: user } = useRequest(UserAuth)
  const [ws, setWs] = useState<any>(null)
  const [usedConnected, setUsedConnected] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [onlineUserCount, setOnlineUserCount] = useState(0)
  const [onlineStateChange, setOnlineStateChange] = useState(false)
  const [isBanned, setIsBanned] = useState(false)
  const connectWs = () => {
    if(user?.data?.isBanned===true){
      setIsBanned(true)
      message.error('您已被禁言')
    }
    const ws = new WebSocket(
      `${import.meta.env.VITE_WS_LINK}?userId=${user?.data?.id}`
    )
    ws.onopen = () => {
      setUsedConnected(true)
      setIsConnected(true)
      message.success('连接成功')
    }
    ws.onmessage = (e) => {
      const data = JSON.parse(e?.data)?.data
      if (data?.type === 'boardcast') {
        setOnlineUserCount(data?.onLineCount)
      } else if (data?.type === 'message') {
        setMessages((pre) => [...pre, data])
        setTimeout(() => {
          scrollRef?.current?.scrollTo({
            top: scrollRef?.current?.scrollHeight
          })
        }, 160)
      }
    }
    ws.onclose = () => {
      message.error('连接关闭，正在尝试重连中...')
      setOnlineStateChange((pre) => !pre)
      setIsConnected(false)
    }
    ws.onerror = () => {
      message.error('连接错误，正在尝试重连中...')
      setOnlineStateChange((pre) => !pre)
      setIsConnected(false)
    }
    setWs(ws)
  }
  useEffect(() => {
    if (user && !usedConnected) {
      connectWs()
    } else if (user && usedConnected) {
      setTimeout(() => {
        connectWs()
      }, 3000)
    }
  }, [user, onlineStateChange])
  return {
    ws,
    usedConnected,
    messages,
    onlineUserCount,
    setMessages,
    isConnected,
    isBanned,
    user
  }
}
