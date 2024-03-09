import { Button, Form, Input, message } from 'antd'
import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { rootRegist } from '@/requests/base/root'
import { SwapOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import clsx from 'clsx'
import { FrontLoginInfo } from '@/state/base'

export default function FrontRegister({
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
    const { name, email } = form.getFieldsValue()
    if (!name || !email) {
      return
    }
    run({ name, email })
  }
  useEffect(() => {
    if (data) {
      message.success('注册成功')
      FrontLoginInfo.loginStateChange = !FrontLoginInfo.loginStateChange
    }
  }, [data, error])
  return (
    <Form
      form={form}
      className={clsx('mt-14', styles['index-form'])}
      name="formData"
    >
      <div className="flex flex-col items-center justify-center">
        <span className="text-2xl mb-2 w-72">注册</span>
        <Form.Item name="name" required={true}>
          <Input className="w-72 h-11" placeholder="姓名" size="large" />
        </Form.Item>
        <Form.Item
          name="email"
          required={true}
          rules={[
            {
              type: 'email',
              message: '请输入正确的邮箱'
            }
          ]}
        >
          <Input
            className="w-72 h-11"
            placeholder="邮箱"
            size="large"
            type="email"
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
