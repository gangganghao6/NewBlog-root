import { Button, Modal } from 'antd'
import { useState } from 'react'
import { CustomDescription } from '../form/custom-description'
import { formatTime } from '@/utils/utils'
const descriptionColums = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'type',
    label: '类别'
  },
  {
    key: 'createdTime',
    label: '创建时间',
    render: (time: string) => time && formatTime(time)
  },
  {
    key: 'lastModifiedTime',
    label: '更新时间',
    render: (time: string) => time && formatTime(time)
  },
  {
    key: 'visitedCount',
    label: '访问次数'
  }
]
export default function PayDetail() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <Button type={'link'} onClick={() => setModalOpen(true)}>
        查看详情
      </Button>
      <Modal
        title="Basic Modal"
        open={modalOpen}
        onOk={() => {}}
        width={800}
        onCancel={() => setModalOpen(false)}
      >
        <CustomDescription data={{}} columns={descriptionColums} />
      </Modal>
    </>
  )
}
