import { Ref, useRef } from 'react'
import Tabulation from '@/components/tabulation/tabulation'
import { formatTime, handleCopy } from '@/utils/utils'
import DefaultOperationRender from '@/components/tabulation/default-operation-render'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { DeleteChat, GetChatList } from '@/requests/chats/chat'
// import { useSnapshot } from 'valtio'
const column = (navigate: NavigateFunction, tableRef: Ref<any>) => [
  {
    title: '操作',
    dataIndex: 'operation',
    width: 100,
    key: 'operation',
    render: (_: never, row: any) => {
      return DefaultOperationRender({
        row: row,
        navigate,
        tableRef,
        onDeleteApi: DeleteChat,
        detailRoutePath: `/admin/user-chat/detail/${row.id}`
        // editRoutePath: `/admin/user/edit/${row.id}`
      })
    }
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 150,
    render: (text: any) => {
      return <a onClick={() => handleCopy(text)}>{text}</a>
    }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    render: (text: any, row: any) => {
      return <>{row?.user?.name}</>
    }
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    width: 150,
    render: (text: any, row: any) => {
      return <>{row?.user?.email}</>
    }
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    width: 200,
    ellipsis: true,
    render: (text: any, row: any) => {
      let content = ''
      content = row?.content ? `文本：${row?.content}` : content
      content = row?.image ? `图片：${row?.image?.originalName}` : content
      content = row?.video ? `视频：${row?.video?.originalName}` : content
      content = row?.file ? `文件：${row?.file?.originalName}` : content
      return <>{content}</>
    }
  },
  {
    title: '发送时间',
    dataIndex: 'createdTime',
    key: 'createdTime',
    width: 150,
    render: (text: string) => {
      return <>{formatTime(text)}</>
    }
  }
]
const searchConfig = [
  {
    label: 'ID',
    type: 'Input',
    key: 'id',
    required: false
  },
  {
    label: '姓名',
    type: 'Input',
    key: 'name'
  },
  {
    label: '用户ID',
    type: 'Input',
    key: 'userId'
  },
  {
    label: '用户邮箱',
    type: 'Input',
    key: 'email'
  },
  { label: '创建日期', type: 'DateRangePicker', key: 'createdTime' }
]
export default function () {
  const navigate = useNavigate()
  const tableRef = useRef<{ onSearch?: Function; onReset?: Function }>({})
  return (
    <Tabulation
      api={GetChatList}
      ref={tableRef}
      searchConfig={searchConfig}
      column={column(navigate, tableRef)}
    />
  )
}
