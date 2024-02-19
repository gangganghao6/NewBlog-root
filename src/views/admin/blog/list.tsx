import { Ref, use, useRef } from 'react'
import { Suspense, useState } from 'react'
import { GetBlogList } from '@/requests/admin/blogs/blog'
// import Skeleton from '@mui/material/Skeleton'
import Tabulation from '@/components/tabulation/tabulation'
import dayjs from 'dayjs'
import { formatTime, handleCopy } from '@/utils/utils'
import { Popover } from 'antd'
import DefaultOperationRender from '@/components/tabulation/default-operation-render'
import { NavigateFunction, useNavigate } from 'react-router-dom'
// import { useSnapshot } from 'valtio'
const column = (navigate: NavigateFunction, tableRef: Ref<any>) => [
  {
    title: '操作',
    dataIndex: 'operation',
    width: 100,
    key: 'operation',
    render: (_: never, row: any) => {
      return DefaultOperationRender(row, 'blog', navigate, tableRef)
    }
  },
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    render: (text: any) => {
      return <a onClick={() => handleCopy(text)}>{text}</a>
    }
  },
  { title: '标题', dataIndex: 'title', key: 'title' },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    render: (text: any) => {
      return (
        <Popover content={text}>
          {text.length > 30 ? text.slice(0, 50) + '...' : text}
        </Popover>
      )
    }
  },
  { title: '类别', dataIndex: 'type', key: 'type' },
  {
    title: '访问数/评论数/打赏数',
    dataIndex: 'visitedCount',
    key: 'visitedCount',
    render: (_: never, row: any) => {
      const { visitedCount, commentsCount, paysCount } = row
      return `${visitedCount}/${commentsCount}/${paysCount}`
    }
  },
  {
    title: '创建时间/更新时间',
    dataIndex: 'createdTime',
    key: 'createdTime',
    render: (_: never, row: any) => {
      return (
        <div className="text-pretty">
          {`${formatTime(row.createdTime)} ${formatTime(row.lastModifiedTime)}`}
        </div>
      )
    }
  }
]
const searchConfig = [
  {
    label: '标题121212121',
    type: 'Input',
    key: 'titsdfafdsafe',
    required: false
  },
  {
    label: '类别asdasdfsf',
    type: 'Select',
    mode: 'multiple',
    key: 'category',
    options: [
      { label: '类别1', value: 1 },
      { label: '类别2', value: 2 }
    ]
  },
  {
    label: '类别',
    type: 'Select',
    key: 'category',
    options: [
      { label: '类别1', value: 1 },
      { label: '类别2', value: 2 }
    ]
  },
  { label: '标题', type: 'Input', key: 'title' },
  { label: '标题', type: 'Input', key: 'title' },
  {
    label: '类别',
    type: 'Select',
    key: 'category',
    options: [
      { label: '类别1', value: 1 },
      { label: '类别2', value: 2 }
    ]
  },
  { label: '标题', type: 'Input', key: 'title' },
  {
    label: '类别',
    type: 'Select',
    key: 'category',
    options: [
      { label: '类别1', value: 1 },
      { label: '类别2', value: 2 }
    ]
  },
  { label: '标题', type: 'Input', key: 'title' },
  {
    label: '类别',
    type: 'Select',
    key: 'category',
    options: [
      { label: '类别1', value: 1 },
      { label: '类别2水电费是的', value: 2 }
    ]
  },
  { label: '标xxx题', type: 'DateRangePicker', key: 'time' },
  { label: 'datepicker', type: 'DatePicker', key: 'xxx' }
]
const operation = [
  {
    label: '新建',
    type: 'create',
    path: '/admin/blog/create',
    buttonType: 'primary'
  }
]
export default function () {
  // const [requestPromise, setRequestPromise] = useState<any>(
  //   GetBlogList({ size: 10, page: 1, sort: 'desc' })
  // )
  const navigate = useNavigate()
  const tableRef = useRef<{ onSearch?: Function; onReset?: Function }>({})

  return (
    <Tabulation
      api={GetBlogList}
      ref={tableRef}
      // setRequestPromise={setRequestPromise}
      searchConfig={searchConfig}
      column={column(navigate, tableRef)}
      operation={operation}
      // data={result}
    />
    // <Suspense fallback={<CompSkeleton />}>
    // <BlogListRender
    //   requestPromise={requestPromise}
    //   setRequestPromise={setRequestPromise}
    // />
    // {/* </Suspense> */}
  )
}
// function BlogListRender({
//   requestPromise,
//   setRequestPromise
// }: {
//   requestPromise: Promise<any>
//   setRequestPromise: Function
// }) {
//   // const result = use(requestPromise)
//   return (

//   )
// }
