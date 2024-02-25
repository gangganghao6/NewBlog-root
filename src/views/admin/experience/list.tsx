import { Ref, useRef } from 'react'
import Tabulation from '@/components/tabulation/tabulation'
import { formatTime, handleCopy } from '@/utils/utils'
import DefaultOperationRender from '@/components/tabulation/default-operation-render'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import {
  DeletePersonalExperience,
  GetPersonalExperienceList
} from '@/requests/admin/personal/experience'
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
        onDeleteApi: DeletePersonalExperience,
        detailRoutePath: `/admin/experience/detail/${row.id}`,
        editRoutePath: `/admin/experience/edit/${row.id}`
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
  { title: '公司', dataIndex: 'company', key: 'company', width: 150 },
  { title: '职责', dataIndex: 'duty', key: 'duty', width: 150 },
  { title: '描述', dataIndex: 'description', key: 'description', width: 150 },
  {
    title: '开始时间',
    dataIndex: 'timeStart',
    key: 'timeStart',
    render: (text: string) => {
      return <>{formatTime(text)}</>
    }
  },
  {
    title: '结束时间',
    dataIndex: 'timeEnd',
    key: 'timeEnd',
    render: (text: string) => {
      return <>{text ? formatTime(text) : '--'}</>
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    key: 'createdTime',
    render: (text: string) => {
      return <>{formatTime(text)}</>
    }
  },
  {
    title: '更新时间',
    dataIndex: 'lastModifiedTime',
    key: 'lastModifiedTime',
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
    label: '公司',
    type: 'Input',
    key: 'conpany'
  },
  {
    label: '职责',
    type: 'Input',
    key: 'duty'
  },
  {
    label: '描述',
    type: 'Input',
    key: 'description'
  },
  {
    label: '日程',
    type: 'DatePicker',
    key: 'time'
  },
  { label: '创建日期', type: 'DateRangePicker', key: 'createdTime' },
  { label: '更新时间', type: 'DateRangePicker', key: 'lastModifiedTime' }
]
const operation = [
  {
    label: '新建',
    type: 'create',
    path: '/admin/experience/create',
    buttonType: 'primary'
  }
]
export default function () {
  const navigate = useNavigate()
  const tableRef = useRef<{ onSearch?: Function; onReset?: Function }>({})
  return (
    <Tabulation
      api={GetPersonalExperienceList}
      ref={tableRef}
      searchConfig={searchConfig}
      column={column(navigate, tableRef)}
      operation={operation}
    />
  )
}
