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
      {payDetailData?.data?.content && (
        <CustomFormItem label="文本" name="content">
          <>{payDetailData?.data?.content}</>
        </CustomFormItem>
      )}
      {payDetailData?.data?.image && (
        <CustomFormItem label="图片" name="image">
          <Image
            src={payDetailData?.data?.image?.compressUrl}
            preview={{
              src: payDetailData?.data?.image?.url
            }}
          />
        </CustomFormItem>
      )}
      {payDetailData?.data?.video && (
        <CustomFormItem label="视频" name="image">
          <Image
            className="h-[50px]"
            src={payDetailData?.data?.video?.post?.url}
            preview={{
              toolbarRender: () => <></>,
              imageRender: videoRender(payDetailData?.data?.video?.url)
            }}
          ></Image>
        </CustomFormItem>
      )}
      {payDetailData?.data?.file && (
        <CustomFormItem label="文件" name="image">
          <Button
            type="link"
            href={payDetailData?.data?.file?.url}
            download={payDetailData?.data?.file?.name}
            target="_blank"
          >
            {payDetailData?.data?.file?.originalName}
          </Button>
        </CustomFormItem>
      )}
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

const videoRender = (url: string) => {
  return (ele: any) => {
    return (
      <video className="w-4/5 h-4/5" src={url} controls autoPlay muted></video>
    )
  }
}
