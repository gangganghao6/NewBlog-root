import { Ref, use, useEffect, useRef } from 'react'
import { Suspense, useState } from 'react'
import {
  DeleteBlog,
  GetBlogList,
  getBlogType
} from '@/requests/blogs/blog'
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
        onDeleteApi: DeleteBlog,
        detailRoutePath: `/admin/blog/detail/${row.id}`,
        editRoutePath: `/admin/blog/edit/${row.id}`
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
    title: '封面',
    dataIndex: 'post',
    key: 'post',
    render: (item: any) => {
      return (
        <Image
          className="max-h-28 min-w-16 w-20"
          src={item?.compressUrl}
          preview={{
            src: item?.url
          }}
        />
      )
    }
  },
  { title: '标题', dataIndex: 'title', key: 'title', width: 150 },
  // {
  //   title: '内容',
  //   dataIndex: 'content',
  //   key: 'content',
  //   width: 300,
  //   render: (text: any) => {
  //     return (
  //       <ContentEditor
  //         className={'max-h-28 overflow-y-scroll'}
  //         type="detail"
  //         value={text}
  //         readonly={true}
  //       />
  //     )
  //   }
  // },
  { title: '类别', dataIndex: 'type', key: 'type', width: 80 },
  {
    title: '访问数/评论数/打赏数',
    dataIndex: 'visitedCount',
    key: 'visitedCount',
    width: 150,
    render: (_: never, row: any) => {
      const { visitedCount, comments, pays } = row
      return `${visitedCount}/${comments.length}/${pays.length}`
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
    label: '标题',
    type: 'Input',
    key: 'title',
    required: false
  },
  {
    label: '类别',
    type: 'Select',
    key: 'type',
    api: getBlogType
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
