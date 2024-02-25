import {
  ImageListPreview,
  VideoListPreview
} from '@/components/form/media-list-preview'

export default function FilePreview({ value }) {

  return (
    <>
      {value?.mediaType === 'image' && <ImageListPreview data={[value]} />}
      {value?.mediaType === 'video' && <VideoListPreview data={[value]} />}
      {value?.mediaType !== 'image' && value?.mediaType !== 'video' && (
        <a onClick={() => window.open(value?.url, '_blank')}>{value?.name}</a>
      )}
    </>
  )
}
