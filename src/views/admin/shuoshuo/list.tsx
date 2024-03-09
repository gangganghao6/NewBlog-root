import { Ref, use, useEffect, useRef } from 'react'
import { Suspense, useState } from 'react'
import {
  DeleteShuoshuo,
  GetShuoshuoList,
  // getBlogType
} from '@/requests/shuoshuos/shuoshuo'
import Tabulation from '@/components/tabulation/tabulation'
import { formatTime, handleCopy } from '@/utils/utils'
import { Popover, Image } from 'antd'
import DefaultOperationRender from '@/components/tabulation/default-operation-render'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import ContentEditor from '@/components/editor/content-editor'
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
        onDeleteApi: DeleteShuoshuo,
        detailRoutePath: `/admin/shuoshuo/detail/${row.id}`,
        editRoutePath: `/admin/shuoshuo/edit/${row.id}`
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
  { title: '内容', dataIndex: 'content', key: 'title', width: 150 },
  {
    title: '访问数/评论数',
    dataIndex: 'visitedCount',
    key: 'visitedCount',
    width: 150,
    render: (_: never, row: any) => {
      const { visitedCount, commentsCount } = row
      return `${visitedCount}/${commentsCount}`
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
    label: '内容',
    type: 'Input',
    key: 'content'
  },
  { label: '创建日期', type: 'DateRangePicker', key: 'createdTime' },
  { label: '更新时间', type: 'DateRangePicker', key: 'lastModifiedTime' }
]
const operation = [
  {
    label: '新建',
    type: 'create',
    path: '/admin/shuoshuo/create',
    buttonType: 'primary'
  }
]
export default function () {
  const navigate = useNavigate()
  const tableRef = useRef<{ onSearch?: Function; onReset?: Function }>({})
  return (
    <Tabulation
      api={GetShuoshuoList}
      ref={tableRef}
      searchConfig={searchConfig}
      column={column(navigate, tableRef)}
      operation={operation}
    />
  )
}