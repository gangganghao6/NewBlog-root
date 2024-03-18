import { Ref, useRef } from 'react'
import Tabulation from '@/components/tabulation/tabulation'
import { formatTime, handleCopy } from '@/utils/utils'
import DefaultOperationRender from '@/components/tabulation/default-operation-render'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { DeleteChat, GetChatList } from '@/requests/chats/chat'
import { GetUrlInfoList } from '@/requests/base/log'
import { GetPayList } from '@/requests/users/user'
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
        onDeleteApi: DeleteChat,
        detailRoutePath: `/admin/user-pay/detail/${row.id}`
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
    title: '博客ID',
    dataIndex: 'blogId',
    key: 'blogId',
    width: 150,
    render: (text: any) => {
      return <a onClick={() => handleCopy(text)}>{text}</a>
    }
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
    title: '打赏金额',
    dataIndex: 'money',
    with: 50,
    key: 'money'
  },
  {
    title: '备注',
    dataIndex: 'message',
    key: 'message'
  },
  {
    title: '打赏方式',
    dataIndex: 'payType',
    key: 'payType'
  },
  {
    title: '打赏结果',
    dataIndex: 'paySuccess',
    key: 'paySuccess',
    render: (text: any) => {
      return <>{text ? '成功' : '未支付'}</>
    }
  },
  // {
  //   title: '订单状态',
  //   dataIndex: 'isClose',
  //   key: 'isClose',
  //   render: (text: any) => {
  //     return <>{text ? '已关闭' : '开启'}</>
  //   }
  // },
  {
    title: '打赏时间',
    dataIndex: 'createdTime',
    key: 'createdTime',
    width: 150,
    render: (text: string, row: any) => {
      return <>{row?.paySuccess ? formatTime(text) : '--'}</>
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
  {
    label: '打赏结果',
    type: 'Select',
    key: 'paySuccess',
    options: [
      { label: '成功', value: true },
      { label: '未支付', value: false }
    ]
  },
  {
    label: '订单状态',
    type: 'Select',
    key: 'isClose',
    options: [
      { label: '已关闭', value: true },
      { label: '开启', value: false }
    ]
  },
  { label: '创建日期', type: 'DateRangePicker', key: 'createdTime' }
]
export default function () {
  const navigate = useNavigate()
  const tableRef = useRef<{ onSearch?: Function; onReset?: Function }>({})
  return (
    <Tabulation
      api={GetPayList}
      ref={tableRef}
      searchConfig={searchConfig}
      column={column(navigate, tableRef)}
    />
  )
}
