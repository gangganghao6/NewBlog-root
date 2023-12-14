import { type ReactElement, useState, Suspense } from 'react'
import './App.css'
import Test from './Test'
import DataFetcher from './utils/DataFetcher'

import { RequestPayList } from './requests/users/user'
import { RequestFileChunkUpload } from './requests/files/file_chunk'

function App(): ReactElement {
  const [uploadResult, setUploadResult] = useState([])
  console.log(uploadResult);
  // const ws = new WebSocket(`${import.meta.env.VITE_WS_LINK}?userId=ea51dc62-c033-4d80-944d-cd400f548b3f`);
  // ws.onopen = () => {
  //   ws.send(JSON.stringify({ content: '123' }));
  // };
  // ws.onmessage = (e) => {
  //   console.log(JSON.parse(e.data));
  // }
  return (
    <div className="App">
      <input
        type={'file'}
        className="upload-file"
        multiple={true}
        onInput={async (e) => {
          const result = await RequestFileChunkUpload(e.target.files)
          // setUploadResult(result)
        }}
      />
      <div>{JSON.stringify(uploadResult.map(item => item.data.data))}</div>
      {/* <Suspense fallback={'loading...'}>
        <Test
          data={DataFetcher(
            RequestPayList({ page: 1, size: 10, sort: 'desc' })
          )}
        />
      </Suspense> */}
    </div>
  )
}

export default App
