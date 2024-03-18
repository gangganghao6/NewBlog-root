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
const descriptionColums = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'createdTime',
    label: '发送时间',
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
    data: chatDetailData,
    error: userDetailError,
    run: runDetail
  } = useRequest((data) => GetChatDetail(data), {
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
        data={chatDetailData?.data || {}}
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
        <>{chatDetailData?.data?.user?.name}</>
      </CustomFormItem>
      <CustomFormItem
        label="邮箱"
        name="email"
        labelCol={{
          span: 3,
          offset: 1
        }}
      >
        <>{chatDetailData?.data?.user?.email}</>
      </CustomFormItem>
      {chatDetailData?.data?.content && (
        <CustomFormItem label="文本" name="content">
          <>{chatDetailData?.data?.content}</>
        </CustomFormItem>
      )}
      {chatDetailData?.data?.image && (
        <CustomFormItem label="图片" name="image">
          <Image
            src={chatDetailData?.data?.image?.compressUrl}
            preview={{
              src: chatDetailData?.data?.image?.url
            }}
          />
        </CustomFormItem>
      )}
      {chatDetailData?.data?.video && (
        <CustomFormItem label="视频" name="image">
          <Image
            className="h-[50px]"
            src={chatDetailData?.data?.video?.post?.url}
            preview={{
              toolbarRender: () => <></>,
              imageRender: videoRender(chatDetailData?.data?.video?.url)
            }}
          ></Image>
        </CustomFormItem>
      )}
      {chatDetailData?.data?.file && (
        <CustomFormItem label="文件" name="image">
          <Button
            type="link"
            href={chatDetailData?.data?.file?.url}
            download={chatDetailData?.data?.file?.name}
            target="_blank"
          >
            {chatDetailData?.data?.file?.originalName}
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
