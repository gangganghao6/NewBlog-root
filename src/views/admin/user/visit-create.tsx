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
const descriptionColums = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'ip',
    label: 'IP'
  },
  {
    key:'country',
    label:'国家'
  },
  {
    key:'province',
    label:'省份'
  },
  {
    key:'city',
    label:'城市'
  },
  {
    key:'isp',
    label:'运营商'
  },
  {
    key:'browserName',
    label:'浏览器'
  },
  /*browserName     String?
  browserVersion  String?
  browserMajor    String?
  engineName      String?
  engineVersion   String?
  osName          String?
  osVersion       String?
  deviceVendor    String?
  deviceModel     String?
  deviceType      String?
  cpuArchitecture String?*/
  {
    key:'browserVersion',
    label:'浏览器版本'
  },
  {
    key:'browserMajor',
    label:'浏览器主版本'
  },
  {
    key:'engineName',
    label:'引擎'
  },
  {
    key:'engineVersion',
    label:'引擎版本'
  },
  {
    key:'osName',
    label:'操作系统'
  },
  {
    key:'osVersion',
    label:'操作系统版本'
  },
  {
    key:'deviceVendor',
    label:'设备厂商'
  },
  {
    key:'deviceModel',
    label:'设备型号'
  },
  {
    key:'deviceType',
    label:'设备类型'
  },
  {
    key:'cpuArchitecture',
    label:'CPU架构'
  },
  {
    key: 'visitTime',
    label: '发送时间',
    render: (time: string) => time && formatTime(time)
  },
  {
    key: 'visitTime',
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
    data: urlDetailData,
    error: userDetailError,
    run: runDetail
  } = useRequest((data) => GetUrlInfoDetail(data), {
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
        data={urlDetailData?.data || {}}
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
        <>{urlDetailData?.data?.user?.name}</>
      </CustomFormItem>
      <CustomFormItem
        label="邮箱"
        name="email"
        labelCol={{
          span: 3,
          offset: 1
        }}
      >
        <>{urlDetailData?.data?.user?.email}</>
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
