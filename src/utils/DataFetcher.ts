import { flushSync } from 'react-dom'
import { useState } from 'react'

export default function DataFetcher(Request: any): any {
  const [, setRefresh] = useState(false)
  let isPending = true
  let data: any = null
  const promise: Promise<any> = Request().then(
    (res: any) => {
      isPending = false
      data = res
    },
    (err: any) => {
      isPending = false
      data = err
    }
  )
  return {
    read() {
      if (isPending) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw promise
      } else {
        return data.data
      }
    },
    reload() {
      Request().then(() => {
        flushSync(() => setRefresh((prev) => !prev))
      })
    }
  }
}
