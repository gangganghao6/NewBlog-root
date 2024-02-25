import { Image } from 'antd'
export function ImageListPreview({ data = [] }) {
  return (
    <Image.PreviewGroup>
      {data.map((item: any, index: number) => (
        <Image
          key={index}
          width={200}
          height={200}
          src={item.compressUrl}
          preview={{
            src: item.url
          }}
        />
      ))}
    </Image.PreviewGroup>
  )
}
export function VideoListPreview({ data = [] }) {
  return (
    <>
      {data.map((item: any, index: number) => (
        <Image
          key={index}
          width={200}
          height={200}
          src={item.post.compressUrl}
          preview={{
            toolbarRender: () => <></>,
            imageRender: imageRender(item)
          }}
        />
      ))}
    </>
  )
}

const imageRender = (item: any) => () => (
  <video className="w-4/5" src={item.url} controls autoPlay muted></video>
)
