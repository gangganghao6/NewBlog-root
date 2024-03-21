import { Card, Descriptions, Modal } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useEffect, useState } from 'react'
import styles from './project.module.scss'
import ImageDamage from '@/asserts/image-damage.png'
import { ImageListPreview } from '@/components/form/media-list-preview'
import { formatTime } from '@/utils/utils'

export default function FrontPersonalProject({ data }: any) {
  const [imageSrc, setImageSrc] = useState(ImageDamage)
  const [modalOpen, setModalOpen] = useState(false)
  useEffect(() => {
    if (data?.images?.[0]?.url) {
      setImageSrc(data?.images?.[0]?.url)
    }
  }, [data])
  return (
    <>
      <DetailModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        data={data}
      />
      <Card
        onClick={() => setModalOpen(true)}
        hoverable
        className={styles.card}
        cover={
          <img
            alt="example"
            onError={(e) => {
              setImageSrc(ImageDamage)
            }}
            src={imageSrc}
          />
        }
      >
        <Meta
          title={data?.name}
          style={{
            width: '160px'
          }}
          description={
            <div>
              <div>
                {data?.timeStart && formatTime(data?.timeStart, false)}~
                {data?.timeEnd && formatTime(data?.timeEnd, false)}
              </div>
              <div>{data?.githubUrl || '暂无描述'}</div>
            </div>
          }
        />
      </Card>
    </>
  )
}
const DetailModal = ({ modalOpen, setModalOpen, data }: any) => {
  const {
    name,
    duty,
    description,
    githubUrl,
    demoUrl,
    timeStart,
    timeEnd,
    images
  } = data || {}
  const items = [
    { key: 'name', label: '项目名称', children: name, span: 2 },
    { key: 'duty', label: '职责', children: duty, span: 2 },
    { key: 'description', label: '描述', children: description, span: 3 },
    {
      key: 'githubUrl',
      label: 'Github链接',
      children: <a href={githubUrl}>{githubUrl}</a>,
      span: 2
    },
    {
      key: 'demoUrl',
      label: 'Demo链接',
      children: <a href={demoUrl}>{demoUrl}</a>,
      span: 2
    },
    {
      key: 'time',
      label: '开始~结束时间',
      children: (
        <>
          {formatTime(timeStart, false)}~{timeEnd && formatTime(timeEnd, false)}
        </>
      ),
      span: 3
    },
    {
      key: 'images',
      label: '图片',
      children: <ImageListPreview data={images} />,
      span: 3
    }
  ]
  return (
    <Modal
      width={'auto'}
      className='max-w-[1200px]'
      open={modalOpen}
      title="个人项目"
      footer={null}
      onCancel={() => setModalOpen(false)}
    >
      <Descriptions title="User Info" bordered items={items} />
    </Modal>
  )
}
