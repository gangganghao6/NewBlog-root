import { PlayCircleOutlined } from '@ant-design/icons'
import { Image } from 'antd'
export function ImageListPreview({ data = [], width = 200, height = 200 }) {
  return (
    <Image.PreviewGroup>
      {data.map((item: any, index: number) => (
        <Image
          key={index}
          width={'25vmin'}
          height={'25vmin'}
          src={item.compressUrl}
          preview={{
            src: item.url
          }}
        />
      ))}
    </Image.PreviewGroup>
  )
}
export function VideoListPreview({ data = [], width = 200, height = 200 }) {
  return (
    <>
      {data.map((item: any, index: number) => (
        <Image
          key={index}
          width={'25vmin'}
          height={'25vmin'} 
          src={item.post.compressUrl}
          preview={{
            toolbarRender: () => <></>,
            imageRender: VideoRender(item),
            mask: <PlayCircleOutlined className="text-4xl" />
          }}
        />
      ))}
    </>
  )
}

export const VideoRender = (item: any) => () => (
  <video
    className="w-[auto] max-h-[80%]"
    src={item.url}
    controls
    autoPlay
    muted
  ></video>
)
