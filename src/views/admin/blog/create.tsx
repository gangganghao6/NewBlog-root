import {
  GetBlogDetail,
  PostCreatBlog,
  PutEditBlog,
  getBlogType
} from '@/requests/blogs/blog'
import { useRequest } from 'ahooks'
import { Button, Divider, Form, Input, Select, message, Image } from 'antd'
import ContentEditor from '@/components/editor/content-editor'
import UploadCoverImage from '@/components/form/upload-cover-image'
import CustomFormSubmit from '@/components/form/custom-form-submit'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ActionType } from '@/views/admin/constant'
import CompComment from '@/components/comment/admin-comment'
import CompPay from '@/components/pay/admin-pay-list'
import { CustomDescription } from '@/components/form/custom-description'
import CustomFormItem from '@/components/form/custom-form-item'
import { formatTime } from '@/utils/utils'
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
export default function AdminBlogCreate({
  type
}: {
  type: 'detail' | 'edit' | 'create'
}) {
  const [form] = Form.useForm()
  const { data: blogTypeData, error: blogTypeError } = useRequest(
    () => getBlogType(),
    { manual: false }
  )
  const {
    data: blogDetailData,
    error: blogDetailError,
    run: runDetail
  } = useRequest((data) => GetBlogDetail({ id, ...data }), {
    manual: true
  })
  const { id } = useParams()

  useEffect(() => {
    if (type !== 'create') {
      runDetail({ id })
    }
  }, [type])
  useEffect(() => {
    if (type !== 'create') {
      form.setFieldsValue(blogDetailData?.data)
    }
  }, [blogDetailData])

  return (
    <Form form={form}>
      <span className="text-xl font-semibold mb-6 w-72">{`${ActionType[type]}博客`}</span>
      <Divider className="my-2" />
      {type === 'detail' && (
        <CustomDescription
          data={blogDetailData?.data || {}}
          columns={descriptionColums}
        />
      )}
      <CustomFormItem label="标题" name="title">
        {type === 'detail' ? <>{blogDetailData?.data?.title}</> : <Input />}
      </CustomFormItem>
      {type !== 'detail' && (
        <CustomFormItem label="类别" name="type" normalize={(item) => item[0]}>
          <Select
            mode={'tags'}
            maxCount={1}
            options={blogTypeData?.data?.map((item: string) => ({
              label: item,
              value: item
            }))}
            showSearch
          />
        </CustomFormItem>
      )}
      <CustomFormItem label="封面" name="post">
        {type === 'detail' ? (
          <Image
            className="max-h-[20em]"
            src={blogDetailData?.data?.post?.url}
          />
        ) : (
          <UploadCoverImage />
        )}
      </CustomFormItem>
      <CustomFormItem label="内容" name="content">
        <ContentEditor type={type} />
      </CustomFormItem>
      {type !== 'create' && (
        <CustomFormItem label="评论" name="comments" required={false}>
          <CompComment type={type} blogId={id} run={runDetail} />
        </CustomFormItem>
      )}
      {type !== 'create' && (
        <CustomFormItem label="打赏" name="pays" required={false}>
          <CompPay type={type} />
        </CustomFormItem>
      )}
      <CustomFormSubmit
        okRoutePath={`/admin/blog/detail/${id}`}
        showOk={type !== 'detail'}
        form={form}
        extraParams={{
          id
        }}
        api={
          type === 'edit'
            ? PutEditBlog
            : (data: any) => PostCreatBlog({ id, ...data })
        }
        okText="保存"
        cancelText="返回"
      />
    </Form>
  )
}
