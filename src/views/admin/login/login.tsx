import { Button, Form, Input, message } from 'antd'
import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { RootLogin, rootLogin } from '@/requests/admin/base/root'
import { SwapOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import styles from './index.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import useRedirect from './useRedirect'

export default function AdminLogin({
  setNeedLogin
}: {
  setNeedLogin: Function
}) {
  const [form] = Form.useForm()
  const { run, loading, data, error } = useRequest((data) => rootLogin(data), {
    manual: true
  })
  useRedirect(data, error)

  const submit = async () => {
    await form.validateFields()
    const { account, password } = form.getFieldsValue()
    if (!account || !password) {
      return
    }
    run({ account, password })
  }
  return (
    <Form
      form={form}
      className={clsx('mt-28', styles.register)}
      name="formData"
    >
      <div className="flex flex-col items-center justify-center">
        <span className="text-2xl w-72">登录</span>
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
