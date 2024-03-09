import { Ref, useRef } from 'react'
import Tabulation from '@/components/tabulation/tabulation'
import { formatTime, handleCopy } from '@/utils/utils'
import DefaultOperationRender from '@/components/tabulation/default-operation-render'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { DeleteUser, GetUserList } from '@/requests/users/user'
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
        onDeleteApi: DeleteUser,
        detailRoutePath: `/admin/user/detail/${row.id}`,
        editRoutePath: `/admin/user/edit/${row.id}`
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
  { title: '姓名', dataIndex: 'name', key: 'name', width: 150 },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    width: 150
  },
  {
    title: '是否被禁',
    dataIndex: 'isBanned',
    key: 'isBanned',
    width: 150,
    render: (text: string) => {
      return <>{text ? '是' : '否'}</>
    }
  },
  {
    title: '是否订阅',
    dataIndex: 'isSubscribed',
    key: 'isSubscribed',
    width: 150,
    render: (text: string) => {
      return <>{text ? '是' : '否'}</>
    }
  },
  {
    title: '注册时间',
    dataIndex: 'createdTime',
    key: 'createdTime',
    width: 150,
    render: (text: string) => {
      return <>{formatTime(text)}</>
    }
  },
  {
    title: '最后活跃时间',
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
    label: '邮箱',
    type: 'Input',
    key: 'email'
  },
  {
    label: '是否被禁',
    type: 'Select',
    key: 'isBanned',
    options: [
      { label: '是', value: true },
      { label: '否', value: false }
    ]
  },{
    label: '是否订阅',
    type: 'Select',
    key: 'isSubscribed',
    options: [
      { label: '是', value: true },
      { label: '否', value: false }
    ]
  },
  { label: '注册时间', type: 'DateRangePicker', key: 'createdTime' }
]
const operation = [
  {
    label: '新建',
    type: 'create',
    path: '/admin/user/create',
    buttonType: 'primary'
  }
]
export default function () {
  const navigate = useNavigate()
  const tableRef = useRef<{ onSearch?: Function; onReset?: Function }>({})
  return (
    <Tabulation
      api={GetUserList}
      ref={tableRef}
      searchConfig={searchConfig}
      column={column(navigate, tableRef)}
      operation={operation}
    />
  )
}
