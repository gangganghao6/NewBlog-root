import { useRequest } from 'ahooks'
import { Divider, Form, Input, Image, DatePicker, Radio } from 'antd'
import CustomFormSubmit from '@/components/form/custom-form-submit'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ActionType } from '@/views/admin/constant'
import CompComment from '@/components/comment/admin-comment'
import CompPay from '@/components/pay/admin-pay-list'
import { CustomDescription } from '@/components/form/custom-description'
import CustomFormItem from '@/components/form/custom-form-item'
import { formatTime } from '@/utils/utils'
import dayjs from 'dayjs'
import {
  PostCreateTodoList,
  PutEditTodoList,
  GetTodoListDetail
} from '@/requests/todolists/todolist'
const descriptionColums = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'createdTime',
    label: '创建时间',
    render: (time: string) => time && formatTime(time)
  },
  {
    key: 'lastModifiedTime',
    label: '更新时间',
    render: (time: string) => time && formatTime(time)
  },
  {
    key: 'isDone',
    label: '状态',
    render: (text: string) => {
      return <>{text ? '已完成' : '未完成'}</>
    }
  },
  {
    key: 'isDoneTime',
    label: '完成时间',
    render: (time: string) => time && formatTime(time, false)
  }
]
export default function AdminProjectCreate({
  type
}: {
  type: 'detail' | 'edit' | 'create'
}) {
  const [form] = Form.useForm()
  const {
    data: projectDetailData,
    error: projectDetailError,
    run: runDetail
  } = useRequest((data) => GetTodoListDetail(data), {
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
    if (type !== 'create' && projectDetailData?.data) {
      const tempData = projectDetailData?.data
      tempData.isDoneTime = tempData.timeStart
        ? dayjs(tempData.timeStart)
        : null
      form.setFieldsValue(tempData)
    }
  }, [projectDetailData])
  return (
    <Form form={form}>
      <span className="text-xl font-semibold mb-6 w-72">{`${ActionType[type]}个人项目`}</span>
      <Divider className="my-2" />
      {type === 'detail' && (
        <CustomDescription
          data={projectDetailData?.data || {}}
          columns={descriptionColums}
        />
      )}
      <CustomFormItem
        label="标题"
        name="title"
        labelCol={{
          span: 4,
          offset: 1
        }}
      >
        {type === 'detail' ? <>{projectDetailData?.data?.title}</> : <Input />}
      </CustomFormItem>
      {type !== 'detail' && (
        <CustomFormItem
          label="状态"
          name="isDone"
          labelCol={{
            span: 4,
            offset: 1
          }}
        >
          <Radio.Group>
            <Radio value={true}>已完成</Radio>
            <Radio value={false}>未完成</Radio>
          </Radio.Group>
        </CustomFormItem>
      )}

      {type !== 'detail' && (
        <CustomFormItem
          label="完成时间"
          name="isDoneTime"
          required={false}
          labelCol={{
            span: 4,
            offset: 1
          }}
        >
          <DatePicker />
        </CustomFormItem>
      )}
      {type !== 'create' && (
        <CustomFormItem
          label="评论"
          name="comments"
          required={false}
          labelCol={{
            span: 4,
            offset: 1
          }}
        >
          <CompComment type={type} />
        </CustomFormItem>
      )}
      {type !== 'create' && (
        <CustomFormItem
          label="打赏"
          name="pays"
          required={false}
          labelCol={{
            span: 4,
            offset: 1
          }}
        >
          <CompPay type={type} />
        </CustomFormItem>
      )}
      <CustomFormSubmit
        okRoutePath={`/admin/todolist/detail/${id}`}
        showOk={type !== 'detail'}
        form={form}
        extraParams={{
          id
        }}
        api={
          type === 'edit'
            ? PutEditTodoList
            : (data: any) => PostCreateTodoList({ id, ...data })
        }
        okText="保存"
        cancelText="返回"
      />
    </Form>
  )
}
