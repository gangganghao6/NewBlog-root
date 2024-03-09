import { Ref, use, useEffect, useRef } from 'react'
import Tabulation from '@/components/tabulation/tabulation'
import { formatTime, handleCopy } from '@/utils/utils'
import DefaultOperationRender from '@/components/tabulation/default-operation-render'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import {
  DeleteShareFile,
  GetShareFileList
} from '@/requests/share_files/share_file'
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
        onDeleteApi: DeleteShareFile,
        detailRoutePath: `/admin/sharefile/detail/${row.id}`,
        editRoutePath: `/admin/sharefile/edit/${row.id}`
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
  { title: '文件名', dataIndex: 'name', key: 'name', width: 150 },
  {
    title: '文件类型',
    dataIndex: 'type',
    key: 'type',
    width: 150,
    render: (_, row) => {
      if (row.image) return '图片'
      if (row.video) return '视频'
      if (row.file) return '文件'
      return 111
    }
  },
  {
    title: '下载数',
    dataIndex: 'downloadCount',
    key: 'downloadCount',
    width: 150
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
    label: '文件名',
    type: 'Input',
    key: 'name'
  },
  { label: '创建日期', type: 'DateRangePicker', key: 'createdTime' },
  { label: '更新时间', type: 'DateRangePicker', key: 'lastModifiedTime' }
]
const operation = [
  {
    label: '新建',
    type: 'create',
    path: '/admin/sharefile/create',
    buttonType: 'primary'
  }
]
export default function () {
  const navigate = useNavigate()
  const tableRef = useRef<{ onSearch?: Function; onReset?: Function }>({})
  return (
    <Tabulation
      api={GetShareFileList}
      ref={tableRef}
      searchConfig={searchConfig}
      column={column(navigate, tableRef)}
      operation={operation}
    />
  )
}
