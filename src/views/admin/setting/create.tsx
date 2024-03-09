import { useRequest } from 'ahooks'
import { Button, Divider, Form, Input, Select, DatePicker } from 'antd'
import UploadCoverImage from '@/components/form/upload-cover-image'
import CustomFormSubmit from '@/components/form/custom-form-submit'
import { useEffect } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { ActionType } from '@/views/admin/constant'
import CustomFormItem from '@/components/form/custom-form-item'
import { GetBlogList } from '@/requests/blogs/blog'
import { GetBaseInfoDetail, PutEditBaseInfo } from '@/requests/base/info'

const MyFormItem = (props: any) => {
  return (
    <CustomFormItem
      {...props}
      required={false}
      labelCol={{
        span: 4,
        offset: 1
      }}
    />
  )
}

export default function AdminSettingCreate({ type }: { type: 'edit' }) {
  const [form] = Form.useForm()
  const {
    data: blogListData,
    error: blogListError,
    run: runBlogListDetail
  } = useRequest(
    (data) => GetBlogList({ page: 1, size: 10, sort: 'desc', ...data }),
    {
      manual: false
    }
  )
  const {
    data: baseInfoData,
    error: baseInfoError,
    run: runBaseInfoDetail
  } = useRequest(() => GetBaseInfoDetail(), {
    manual: true
  })
  let [searchParams] = useSearchParams()

  useEffect(() => {
    if (baseInfoData?.data) {
      const tempData = baseInfoData?.data
      if (tempData?.recommendBlogIds) {
        tempData.recommendBlogIds = tempData.recommendBlogIds.split(',')
      }
      form.setFieldsValue(tempData)
    }
  }, [baseInfoData])

  useEffect(() => {
    runBaseInfoDetail()
  }, [searchParams.get('random')])
  return (
    <Form form={form}>
      <span className="text-xl font-semibold mb-6 w-72">{`${ActionType[type]}设置`}</span>
      <Divider className="my-2" />
      <MyFormItem label="博客名称" name="name">
        <Input placeholder="请输入博客名称" />
      </MyFormItem>
      <MyFormItem label="博客描述" name="description">
        <Input placeholder="请输入博客描述" />
      </MyFormItem>
      <MyFormItem label="头像" name="headImage">
        <UploadCoverImage />
      </MyFormItem>
      <MyFormItem label="推荐博客文章" name="recommendBlogIds">
        <Select
          mode="multiple"
          onSearch={(data) => {
            runBlogListDetail({ title: data })
          }}
          options={blogListData?.data?.result?.map((item: any) => ({
            label: `${item.title}(${item.id})`,
            value: item.id
          }))}
        ></Select>
      </MyFormItem>

      <CustomFormSubmit
        okRoutePath={`/admin/setting?random=${+new Date()}`}
        showOk={true}
        form={form}
        intercepter={(data: any) => {
          if(data.recommendBlogIds){
            data.recommendBlogIds = data.recommendBlogIds.join(',')
          }
          return data
        }}
        api={PutEditBaseInfo}
        okText="保存"
        cancelText="返回"
      />
    </Form>
  )
}
