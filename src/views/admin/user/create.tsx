import { useRequest } from 'ahooks'
import { Divider, Form, Input, Image, DatePicker, Radio } from 'antd'
import CustomFormSubmit from '@/components/form/custom-form-submit'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ActionType } from '@/views/admin/constant'
import { CustomDescription } from '@/components/form/custom-description'
import CustomFormItem from '@/components/form/custom-form-item'
import { formatTime } from '@/utils/utils'

import {
  GetUserDetail,
  PostCreateUser,
  PutEditUser
} from '@/requests/users/user'
const descriptionColums = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'createdTime',
    label: '注册时间',
    render: (time: string) => time && formatTime(time)
  },
  {
    key: 'lastActiveTime',
    label: '最后活跃时间',
    render: (time: string) => time && formatTime(time)
  },
  {
    key: 'isBanned',
    label: '是否被禁',
    render: (text: string) => {
      return <>{text ? '是' : '否'}</>
    }
  },
  {
    key: 'isSubscribed',
    label: '是否订阅',
    render: (time: string) => {
      return <>{time ? '是' : '否'}</>
    }
  }
]
export default function AdminUserCreate({
  type
}: {
  type: 'detail' | 'edit' | 'create'
}) {
  const [form] = Form.useForm()
  const {
    data: userDetailData,
    error: userDetailError,
    run: runDetail
  } = useRequest((data) => GetUserDetail(data), {
    manual: true
  })
  const { id } = useParams()
  useEffect(() => {
    if (type !== 'create') {
      runDetail({ id })
    }
  }, [type])
  useEffect(() => {
    //平铺视频和图片
    if (type !== 'create' && userDetailData?.data) {
      form.setFieldsValue(userDetailData?.data)
    }
  }, [userDetailData])
  return (
    <Form form={form}>
      <span className="text-xl font-semibold mb-6 w-72">{`${ActionType[type]}用户`}</span>
      <Divider className="my-2" />
      {type === 'detail' && (
        <CustomDescription
          data={userDetailData?.data || {}}
          columns={descriptionColums}
        />
      )}
      <CustomFormItem
        label="用户名"
        name="name"
        labelCol={{
          span: 3,
          offset: 1
        }}
      >
        {type === 'detail' ? <>{userDetailData?.data?.name}</> : <Input />}
      </CustomFormItem>
      <CustomFormItem
        label="邮箱"
        name="email"
        labelCol={{
          span: 3,
          offset: 1
        }}
      >
        {type !== 'create' ? <>{userDetailData?.data?.email}</> : <Input/>}
      </CustomFormItem>
      {type !== 'detail' && (
        <CustomFormItem
          label="是否被禁"
          name="isBanned"
          required={false}
          labelCol={{
            span: 3,
            offset: 1
          }}
        >
          <Radio.Group>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        </CustomFormItem>
      )}

      {type !== 'detail' && (
        <CustomFormItem
          label="是否订阅"
          name="isSubscribed"
          required={false}
          labelCol={{
            span: 3,
            offset: 1
          }}
        >
          <Radio.Group>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        </CustomFormItem>
      )}
      <CustomFormSubmit
        okRoutePath={`/admin/user/detail/${id}`}
        showOk={type !== 'detail'}
        form={form}
        extraParams={{
          id
        }}
        api={
          type === 'edit'
            ? PutEditUser
            : (data: any) => PostCreateUser({ id, ...data })
        }
        okText="保存"
        cancelText="返回"
      />
    </Form>
  )
}
