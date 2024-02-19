import { use } from 'react'
import { Suspense, useState } from 'react'
import { GetBaseInfo } from '@/requests/admin/base/info'
import { useParams } from 'react-router-dom'
// import { useSnapshot } from 'valtio'

export default function () {
  const [requestPromise, setRequestPromise] = useState<any>(GetBaseInfo)
  return (
    <Suspense fallback={<>loading...</>}>
      <BlogListRender requestPromise={requestPromise} />
    </Suspense>
  )
}
function BlogListRender({ requestPromise }: { requestPromise: Promise<any> }) {
  const result = use(requestPromise)
  const params = useParams()
  console.log(params)
  return <>456</>
}
