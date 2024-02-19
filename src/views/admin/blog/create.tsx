import { getBlogType } from '@/requests/admin/blogs/blog'
import { useRequest } from 'ahooks'
import { Button, Col, Divider, Form, Input, Row, Select, message } from 'antd'
import ContentEditor from './editor/content-editor'
const CustomFormItem = ({
  label,
  name,
  required = true,
  children,
  className
}: {
  label?: string
  name: string
  required?: boolean
  children: React.ReactNode
  className?: string
}) => {
  return (
    <Form.Item
      labelAlign={'left'}
      labelCol={{ span: 2, offset: 2 }}
      className={`w-5/6 ${className}`}
      label={label}
      name={name}
      required={required}
    >
      {children}
    </Form.Item>
  )
}

export default function AdminBlogCreate() {
  const { data: blogTypeData, error: blogTypeError } = useRequest(
    () => getBlogType(),
    { manual: false }
  )

  return (
    <Form>
      <span className="text-xl font-semibold mb-6 w-72">新建博客</span>
      <Divider className="my-2" />
      <CustomFormItem label="标题" name="title">
        <Input />
      </CustomFormItem>
      <CustomFormItem label="类别" name="category">
        <Select
          options={blogTypeData?.data.map((item: string) => ({
            label: item,
            value: item
          }))}
          showSearch
          onChange={(item) => {
            if (item.length > 1) {
              message.error('最多选择一个类别')
            }
          }}
        />
      </CustomFormItem>
      <CustomFormItem label="内容" name="content">
        <ContentEditor/>
      </CustomFormItem>
    </Form>
  )
}
