import { ReactElement, useState, Suspense } from 'react'
import './App.css'
import Test from './Test'
import DataFetcher from './utils/DataFetcher'

import { RequestPayList } from './requests/users/user'
import { RequestFileChunkUpload } from './requests/files/file_chunk'

function App(): ReactElement {
  const [uploadResult, setUploadResult] = useState(null)
  if (uploadResult !== null) {
    console.log(uploadResult)
  }
  return (
    <div className="App">
      <input
        type={'file'}
        className="upload-file"
        onInput={RequestFileChunkUpload(setUploadResult)}
      />
      <Suspense fallback={'loading...'}>
        <Test
          data={DataFetcher(
            RequestPayList({ page: 1, size: 10, sort: 'desc' })
          )}
        />
      </Suspense>
    </div>
  )
}

export default App
