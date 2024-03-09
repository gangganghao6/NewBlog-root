import { Button, Form, Input, message } from 'antd'
import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { rootRegist } from '@/requests/base/root'
import { SwapOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import clsx from 'clsx'
import { AdminLoginInfo } from '@/state/base'

export default function AdminRegister({
  setNeedLogin
}: {
  setNeedLogin: Function
}) {
  const [form] = Form.useForm()
  const { run, loading, data, error } = useRequest((data) => rootRegist(data), {
    manual: true
  })
  const submit = async () => {
    await form.validateFields()
    const { name, email, account, password, confirmPassword } =
      form.getFieldsValue()
    if (password !== confirmPassword) {
      message.error('两次密码不一致')
      return
    } else if (!name || !email || !account || !password) {
      return
    }
    run({ name, email, account, password })
  }
  useEffect(() => {
    if (data) {
      message.success('注册成功')
      AdminLoginInfo.loginStateChange = !AdminLoginInfo.loginStateChange
    }
  }, [data, error])
  return (
    <Form form={form} className={clsx('mt-8', styles['index-form'])} name="formData">
      <div className="flex flex-col items-center justify-center">
        <span className="text-2xl mb-2 w-72">注册</span>
        <Form.Item name="name" required={true}>
          <Input className="w-72 h-11" placeholder="姓名" size="large" />
        </Form.Item>
        <Form.Item name="email" required={true} rules={[{
          type: 'email',
          message: '请输入正确的邮箱'
        }]}>
          <Input
            className="w-72 h-11"
            placeholder="邮箱"
            size="large"
            type="email"
          />
        </Form.Item>
        <Form.Item name="account" required={true}>
          <Input className="w-72 h-11" placeholder="账号" size="large" />
        </Form.Item>
        <Form.Item name="password" required={true}>
          <Input
            className="w-72 h-11"
            placeholder="密码"
            type="password"
            size="large"
          />
        </Form.Item>
        <Form.Item name="confirmPassword" required={true}>
          <Input
            className="w-72 h-11"
            placeholder="确认密码"
            type="password"
            size="large"
          />
        </Form.Item>
        <Button
          className="w-72 h-11 text-base mb-3 mt-2"
          type={'primary'}
          onClick={submit}
          loading={loading}
        >
          注册
        </Button>
        <a
          className="mb-32 text-right w-72 text-xs"
          onClick={() => setNeedLogin(true)}
        >
          <SwapOutlined className="mr-1" />
          切换至登录
        </a>
      </div>
    </Form>
  )
}
