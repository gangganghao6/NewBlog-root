import { type ReactElement } from 'react'

export default function Test({ data }: any): ReactElement {
  const msg = data.read()
  console.log(msg)
  return <div>{JSON.stringify(msg)}</div>
  // return <></>
}
  // const ws = new WebSocket(`${import.meta.env.VITE_WS_LINK}?userId=ea51dc62-c033-4d80-944d-cd400f548b3f`);
  // ws.onopen = () => {
  //   ws.send(JSON.stringify({ content: '123' }));
  // };
  // ws.onmessage = (e) => {
  //   console.log(JSON.parse(e.data));
  // }



  // import { RequestFileChunkUpload } from './requests/files/file_chunk'
        /* <input
        type={'file'}
        className="upload-file"
        multiple={true}
        onInput={async (e): Promise<void> => {
          const result = await RequestFileChunkUpload(e.target.files)
          // setUploadResult(result)
        }}
      /> */
      /* <div>{JSON.stringify(uploadResult.map((item) => item.data.data))}</div> */