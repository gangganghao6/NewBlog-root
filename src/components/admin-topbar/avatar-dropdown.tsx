import { rootEditPassword, rootLogout } from '@/requests/base/root'
import { AdminLoginInfo } from '@/state/base'
import { UserOutlined } from '@ant-design/icons'
import {
  Avatar,
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Popover,
  message
} from 'antd'
import { useSnapshot } from 'valtio'
import { useLocation, useNavigate } from 'react-router-dom'
import { formatTime } from '@/utils/utils'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import CustomFormItem from '@/components/form/custom-form-item'
import clsx from 'clsx'

export default function AvatarDropdown() {
  const { data, isLogin } = useSnapshot(AdminLoginInfo)

  return (
    <Popover
      placement="bottomRight"
      className={clsx(!isLogin && 'hidden')}
      title={isLogin ? data?.data?.name : ''}
      content={isLogin ? <MyContent data={data?.data} /> : ''}
    >
      <Button type="text" className="h-full flex items-center">
        <Avatar icon={<UserOutlined />} />
        <span className="ml-2">{data?.data?.name}</span>
      </Button>
    </Popover>
  )
}
const MyContent = ({ data }: { data: any }) => {
  const ref = useRef()
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div>
      <div>ID：{data?.id}</div>
      <div>账号：{data?.account}</div>
      <div>邮箱：{data?.email}</div>
      <div>最近登录时间：{formatTime(data?.lastLoginTime)}</div>
      <Divider />
      <div>
        <Button
          type="text"
          className="w-[46%]"
          onClick={async () => {
            setIsModalOpen(true)
          }}
        >
          修改密码
        </Button>
        <Divider type="vertical" />
        <Button
          type="text"
          className="w-[46%]"
          onClick={async () => {
            await rootLogout()
            AdminLoginInfo.loginStateChange = !AdminLoginInfo.loginStateChange
          }}
        >
          退出登录
        </Button>
      </div>
      <Modal
        title="修改密码"
        open={isModalOpen}
        onOk={async () => {
          const result = await ref?.current?.submit()
          result && setIsModalOpen(false)
        }}
        onCancel={() => setIsModalOpen(false)}
      >
        <EditPassword ref={ref} id={data?.id} />
      </Modal>
    </div>
  )
}
const EditPassword = forwardRef(({ id }: { id: string }, ref) => {
  const [form] = Form.useForm()
  const submit = async () => {
    await form.validateFields()
    const { oldPassword, newPassword, confirmPassword } = form.getFieldsValue()
    if (newPassword !== confirmPassword) {
      message.error('两次密码不一致')
      return false
    } else {
      await rootEditPassword({ id, oldPassword, newPassword })
      message.success('修改成功')
      form.resetFields()
      return true
    }
  }
  useImperativeHandle(
    ref,
    () => {
      return {
        submit
      }
    },
    []
  )
  return (
    <Form form={form}>
      <CustomFormItem
        name="oldPassword"
        label={'旧密码'}
        labelCol={{
          span: 5,
          offset: 1
        }}
      >
        <Input />
      </CustomFormItem>
      <CustomFormItem
        name="newPassword"
        label={'新密码'}
        labelCol={{
          span: 5,
          offset: 1
        }}
      >
        <Input />
      </CustomFormItem>
      <CustomFormItem
        name="confirmPassword"
        label={'确认密码'}
        labelCol={{
          span: 5,
          offset: 1
        }}
      >
        <Input />
      </CustomFormItem>
    </Form>
  )
})
