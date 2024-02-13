import { use } from 'react'
import { Suspense, useState } from 'react'
import { GetBlogList } from '@/requests/blogs/blog'
import Skeleton from '@mui/material/Skeleton'
import Tabulation from '@/components/tabulation/tabulation'
// import { useSnapshot } from 'valtio'
const column = [
  { title: '标题', dataIndex: 'title' },
  { title: '内容', dataIndex: 'content' }
]
const searchConfig = [
  { label: '标题121212121', type: 'Input', key: 'titsdfafdsafe',required: true },
  {
    label: '类别asdasdfsf',
    type: 'Select',
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
  { label: '标xxx题', type: 'DatePicker', key: 'time' },
]
export default function () {
  const [requestPromise, setRequestPromise] = useState<any>(
    GetBlogList({ size: 10, page: 1, sort: 'desc' })
  )
  return (
    <Suspense fallback={<CompSkeleton />}>
      <BlogListRender
        requestPromise={requestPromise}
        setRequestPromise={setRequestPromise}
      />
    </Suspense>
  )
}
function BlogListRender({
  requestPromise,
  setRequestPromise
}: {
  requestPromise: Promise<any>
  setRequestPromise: Function
}) {
  const result = use(requestPromise)
  return (
    <Tabulation
      api={GetBlogList}
      setRequestPromise={setRequestPromise}
      searchConfig={searchConfig}
      column={[]}
      data={result}
    />
  )
}

function CompSkeleton() {
  return <Skeleton variant="rectangular">125</Skeleton>
}
