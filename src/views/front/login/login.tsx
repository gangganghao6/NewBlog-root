import { Button, Form, Input, message } from 'antd'
import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { SwapOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import styles from './index.module.scss'
import { FrontLoginInfo } from '@/state/base'
import { UserLogin } from '@/requests/users/user'

export default function FrontLogin({
  setNeedLogin
}: {
  setNeedLogin: Function
}) {
  const [form] = Form.useForm()
  const { run, loading, data, error } = useRequest((data) => UserLogin(data), {
    manual: true
  })

  const submit = async () => {
    await form.validateFields()
    const { email } = form.getFieldsValue()
    if (!email) {
      return
    }
    run({ email })
  }
  useEffect(() => {
    if (data) {
      message.success('登录成功')
      FrontLoginInfo.loginStateChange = !FrontLoginInfo.loginStateChange
    }
  }, [data, error])
  return (
    <Form
      form={form}
      className={clsx('mt-28', styles.register)}
      name="formData"
    >
      <div className="flex flex-col items-center justify-center">
        <span className="text-2xl w-72 mb-2">登录</span>
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
          <Input className="w-72 h-11" placeholder="邮箱" size="large" allowClear />
        </Form.Item>
        <Button
          className="w-72 h-11 text-base mb-3 mt-2"
          type={'primary'}
          onClick={submit}
          loading={loading}
        >
          登录
        </Button>
        <a
          className="mb-32 text-right w-72 text-xs"
          onClick={() => setNeedLogin(false)}
        >
          <SwapOutlined className="mr-1" />
          切换至注册
        </a>
      </div>
    </Form>
  )
}
