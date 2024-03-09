import { useRequest } from 'ahooks'
import { Button, Divider, Form, Input, Radio, DatePicker } from 'antd'
import ContentEditor from '@/components/editor/content-editor'
import UploadCoverImage from '@/components/form/upload-cover-image'
import CustomFormSubmit from '@/components/form/custom-form-submit'
import { useEffect } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { ActionType } from '@/views/admin/constant'
import CompComment from '@/components/comment/admin-comment'
import CompPay from '@/components/pay/admin-pay-list'
import { CustomDescription } from '@/components/form/custom-description'
import CustomFormItem from '@/components/form/custom-form-item'
import { formatTime } from '@/utils/utils'
import {
  GetPersonalInfoDetail,
  PutEditPersonalInfo
} from '@/requests/personal/personal'
import dayjs from 'dayjs'

const MyFormItem = (props: any) => {
  return (
    <CustomFormItem
      {...props}
      required={false}
      labelCol={{
        span: 3,
        offset: 1
      }}
    />
  )
}
const descriptionColums = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'type',
    label: '类别'
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
    key: 'visitedCount',
    label: '访问次数'
  }
]
export default function AdminPersonalCreate({ type }: { type: 'edit' }) {
  const [form] = Form.useForm()
  const {
    data: personalDetailData,
    error: personalDetailError,
    run: runDetail
  } = useRequest(() => GetPersonalInfoDetail(), {
    manual: false
  })
  let [searchParams] = useSearchParams()

  useEffect(() => {
    if (personalDetailData?.data) {
      const tempData = personalDetailData?.data
      if (!tempData.birthday) {
        delete tempData.birthday
      } else {
        tempData.birthday = dayjs(tempData.birthday)
      }
      if (!tempData.universityEndTime) {
        delete tempData.universityEndTime
      } else {
        tempData.universityEndTime = dayjs(tempData.universityEndTime)
      }
      form.setFieldsValue(tempData)
    }
  }, [personalDetailData])

  useEffect(() => {
    runDetail()
    document.querySelector('main')?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [searchParams.get('random')])
  return (
    <Form form={form}>
      <span className="text-xl font-semibold mb-6 w-72">{`${ActionType[type]}个人主页`}</span>
      <Divider className="my-2" />
      <CustomDescription
        data={personalDetailData?.data || {}}
        columns={descriptionColums}
      />
      <MyFormItem label="姓名" name="name">
        <Input placeholder="请输入你的姓名" />
      </MyFormItem>
      <MyFormItem label="性别" name="sex">
        <Radio.Group>
          <Radio value={'男'}>男</Radio>
          <Radio value={'女'}>女</Radio>
          <Radio value={'未知'}>未知</Radio>
        </Radio.Group>
      </MyFormItem>
      <MyFormItem label="生日" name="birthday">
        <DatePicker />
      </MyFormItem>
      <MyFormItem label="家乡" name="home">
        <Input />
      </MyFormItem>
      <MyFormItem label="QQ" name="qq">
        <Input />
      </MyFormItem>
      <MyFormItem label="微信" name="wechat">
        <Input />
      </MyFormItem>
      <MyFormItem label="GitHub名称" name="githubName">
        <Input />
      </MyFormItem>
      <MyFormItem label="GitHub链接" name="githubUrl">
        <Input type="url" />
      </MyFormItem>
      <MyFormItem label="最高学历" name="university">
        <Input />
      </MyFormItem>
      <MyFormItem label="毕业时间" name="universityEndTime">
        <DatePicker />
      </MyFormItem>
      <MyFormItem label="内容" name="content">
        <ContentEditor type={'edit'} />
      </MyFormItem>
      <MyFormItem label="评论" name="comments" required={false}>
        <CompComment type={type} />
      </MyFormItem>
      <MyFormItem label="打赏" name="pays" required={false}>
        <CompPay type={type} />
      </MyFormItem>
      <CustomFormSubmit
        okRoutePath={`/admin/personal?random=${+new Date()}`}
        showOk={true}
        form={form}
        // extraParams={{
        //   id
        // }}
        api={PutEditPersonalInfo}
        okText="保存"
        cancelText="返回"
        // run={runDetail}
      />
    </Form>
  )
}
