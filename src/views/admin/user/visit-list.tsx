import { Ref, useRef } from 'react'
import Tabulation from '@/components/tabulation/tabulation'
import { formatTime, handleCopy } from '@/utils/utils'
import DefaultOperationRender from '@/components/tabulation/default-operation-render'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { DeleteChat, GetChatList } from '@/requests/chats/chat'
import { DeleteUrlInfo, GetUrlInfoList } from '@/requests/base/log'
// import { useSnapshot } from 'valtio'
const column = (navigate: NavigateFunction, tableRef: Ref<any>) => [
  {
    title: '操作',
    dataIndex: 'operation',
    width: 100,
    key: 'operation',
    render: (_: never, row: any) => {
      return DefaultOperationRender({
        row,
        navigate,
        tableRef,
        onDeleteApi: DeleteUrlInfo,
        detailRoutePath: `/admin/user-visit/detail/${row.id}`
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
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
    width: 150
  },
  {
    title: '用户',
    dataIndex: 'email',
    key: 'email',
    width: 150,
    render: (text: any, row: any) => {
      return (
        <>
          {row?.user?.name || '-'} {row?.user?.email || '-'}
        </>
      )
    }
  },
  {
    title: '访问时间',
    dataIndex: 'visitTime',
    key: 'visitTime',
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
    label: '用户姓名',
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
  { label: '创建日期', type: 'DateRangePicker', key: 'visitTime' }
]
export default function () {
  const navigate = useNavigate()
  const tableRef = useRef<{ onSearch?: Function; onReset?: Function }>({})
  return (
    <Tabulation
      api={GetUrlInfoList}
      ref={tableRef}
      searchConfig={searchConfig}
      column={column(navigate, tableRef)}
    />
  )
}
