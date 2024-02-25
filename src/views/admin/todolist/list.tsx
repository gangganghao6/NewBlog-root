import { Ref, useRef } from 'react'
import Tabulation from '@/components/tabulation/tabulation'
import { formatTime, handleCopy } from '@/utils/utils'
import DefaultOperationRender from '@/components/tabulation/default-operation-render'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { DeleteTodoList } from '@/requests/admin/todolists/todolist'
import { GetTodoListList } from '@/requests/admin/todolists/todolist'
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
        onDeleteApi: DeleteTodoList,
        detailRoutePath: `/admin/todolist/detail/${row.id}`,
        editRoutePath: `/admin/todolist/edit/${row.id}`
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
  { title: '标题', dataIndex: 'title', key: 'title', width: 150 },
  {
    title: '状态',
    dataIndex: 'isDone',
    key: 'isDone',
    width: 150,
    render: (text: string) => {
      return <>{text ? '已完成' : '未完成'}</>
    }
  },
  {
    title: '完成时间',
    dataIndex: 'isDoneTime',
    key: 'isDoneTime',
    width: 150,
    render: (text: string) => {
      return <>{formatTime(text)}</>
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    key: 'createdTime',
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
    label: '标题',
    type: 'Input',
    key: 'title'
  },
  {
    label: '状态',
    type: 'Select',
    key: 'isDone',
    options: [
      { label: '未完成', value: false },
      { label: '已完成', value: true }
    ]
  },
  { label: '完成时间', type: 'DatePicker', key: 'isDoneTime' },
  { label: '创建日期', type: 'DateRangePicker', key: 'createdTime' }
]
const operation = [
  {
    label: '新建',
    type: 'create',
    path: '/admin/todolist/create',
    buttonType: 'primary'
  }
]
export default function () {
  const navigate = useNavigate()
  const tableRef = useRef<{ onSearch?: Function; onReset?: Function }>({})
  return (
    <Tabulation
      api={GetTodoListList}
      ref={tableRef}
      searchConfig={searchConfig}
      column={column(navigate, tableRef)}
      operation={operation}
    />
  )
}
