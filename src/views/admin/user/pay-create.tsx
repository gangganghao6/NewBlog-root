import { useRequest } from 'ahooks'
import { Divider, Form, Input, Image, DatePicker, Radio, Button } from 'antd'
import CustomFormSubmit from '@/components/form/custom-form-submit'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ActionType } from '@/views/admin/constant'
import { CustomDescription } from '@/components/form/custom-description'
import CustomFormItem from '@/components/form/custom-form-item'
import { formatTime } from '@/utils/utils'

import { GetChatDetail } from '@/requests/chats/chat'
import { GetUrlInfoDetail } from '@/requests/base/log'
import { GetPayDetail } from '@/requests/users/user'
const descriptionColums = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'money',
    label: '金额'
  },
  {
    key: 'message',
    label: '备注'
  },
  {
    key: 'blogId',
    label: 'Blog ID'
  },
  {
    key: 'shuoshuoId',
    label: 'Shuoshuo ID'
  },
  {
    key: 'orderUrl',
    label: '订单URL',
    render: (text: string) => {
      return (
        <a href={text} target="_blank" rel="noreferrer">
          {text ? text.slice(0, 20) + '...' + text.slice(-20) : ''}
        </a>
      )
    }
  },
  {
    key: 'payType',
    label: '支付方式'
  },
  {
    key: 'paySuccess',
    label: '支付状态',
    render: (text: boolean) => {
      return <span>{text ? '支付成功' : '未支付'}</span>
    }
  },
  {
    key: 'isClose',
    label: '订单状态',
    render: (text: boolean) => {
      return <span>{text ? '开启' : '未关闭'}</span>
    }
  },
  {
    key: 'closeTime',
    label: '订单关闭时间',
    render: (time: string) => time && formatTime(time)
  },
  {
    key: 'orderId',
    label: '订单ID'
  },
  {
    key: 'createdTime',
    label: '订单创建时间',
    render: (time: string) => time && formatTime(time)
  }
]
export default function AdminUserCreate({
  type
}: {
  type: 'detail' | 'edit' | 'create'
}) {
  const [form] = Form.useForm()
  const {
    data: payDetailData,
    error: userDetailError,
    run: runDetail
  } = useRequest((data) => GetPayDetail(data), {
    manual: true
  })
  const { id } = useParams()
  useEffect(() => {
    runDetail({ id })
  }, [])
  return (
    <Form form={form}>
      <span className="text-xl font-semibold mb-6 w-72">{`${ActionType[type]}用户`}</span>
      <Divider className="my-2" />
      <CustomDescription
        data={payDetailData?.data || {}}
        columns={descriptionColums}
      />
      <CustomFormItem
        label="用户名"
        name="name"
        labelCol={{
          span: 3,
          offset: 1
        }}
      >
        <>{payDetailData?.data?.user?.name}</>
      </CustomFormItem>
      <CustomFormItem
        label="邮箱"
        name="email"
        labelCol={{
          span: 3,
          offset: 1
        }}
      >
        <>{payDetailData?.data?.user?.email}</>
      </CustomFormItem>
      <CustomFormSubmit
        okRoutePath={`/admin/user/detail/${id}`}
        showOk={false}
        form={form}
        extraParams={{
          id
        }}
        api={async () => {}}
        okText="保存"
        cancelText="返回"
      />
    </Form>
  )
}