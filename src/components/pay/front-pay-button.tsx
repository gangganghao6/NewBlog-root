import { UserCreatePayOrder } from '@/requests/users/user'
import { PayCircleOutlined } from '@ant-design/icons'
import { Button, Form, InputNumber, Modal } from 'antd'
import { useState } from 'react'

export default function FrontPayButton({ blogId }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [money, setMoney] = useState(0)
  console.log(money)

  return (
    <>
      <Button
        type="default"
        shape="round"
        className="mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        <PayCircleOutlined />
        打赏
      </Button>
      <Modal
        title="打赏金额"
        open={isModalOpen}
        onOk={() =>
          handleOk({ blogId, payType: 'alipay', money, type: 'blog' })
        }
        onCancel={() => setIsModalOpen(false)}
      >
        <Form>
          <InputNumber onChange={(e) => setMoney(e)} />
        </Form>
      </Modal>
    </>
  )
}
const handleOk = async ({ blogId, payType, money, type }: any) => {
  const result = await UserCreatePayOrder({ blogId, payType, money, type })
  console.log(result)
}
