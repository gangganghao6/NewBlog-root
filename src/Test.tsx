import { ReactElement } from 'react'

export default function Test({ data }: any): ReactElement {
  const msg = data.read()
  console.log(msg)
  return <div>{JSON.stringify(msg)}</div>
  // return <></>
}
