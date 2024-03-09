import { useRequest } from 'ahooks'
import { Divider, Form, Input, Image, DatePicker } from 'antd'
import CustomFormSubmit from '@/components/form/custom-form-submit'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ActionType } from '@/views/admin/constant'
import CompComment from '@/components/comment/admin-comment'
import CompPay from '@/components/pay/admin-pay-list'
import { CustomDescription } from '@/components/form/custom-description'
import CustomFormItem from '@/components/form/custom-form-item'
import { formatTime } from '@/utils/utils'
import UploadImages from '@/components/form/upload-images'
import { ImageListPreview } from '@/components/form/media-list-preview'
import dayjs from 'dayjs'
import {
  PostCreatePersonalProject,
  PutEditPersonalProject,
  GetPersonalProjectDetail
} from '@/requests/personal/project'
const { TextArea } = Input
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
  }
  // {
  //   key: 'visitedCount',
  //   label: '访问次数'
  // }
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
  } = useRequest((data) => GetPersonalProjectDetail(data), {
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
      tempData.timeStart = tempData.timeStart ? dayjs(tempData.timeStart) : null
      tempData.timeEnd = tempData.timeEnd ? dayjs(tempData.timeEnd) : null
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
        label="名称"
        name="name"
        labelCol={{
          span: 4,
          offset: 1
        }}
      >
        {type === 'detail' ? <>{projectDetailData?.data?.name}</> : <Input />}
      </CustomFormItem>
      <CustomFormItem
        label="职位"
        name="duty"
        labelCol={{
          span: 4,
          offset: 1
        }}
      >
        {type === 'detail' ? <>{projectDetailData?.data?.duty}</> : <Input />}
      </CustomFormItem>
      <CustomFormItem
        label="开始时间"
        name="timeStart"
        labelCol={{
          span: 4,
          offset: 1
        }}
      >
        {type === 'detail' ? (
          <>{formatTime(projectDetailData?.data?.timeStart, false)}</>
        ) : (
          <DatePicker />
        )}
      </CustomFormItem>
      <CustomFormItem
        label="结束时间"
        name="timeEnd"
        required={false}
        labelCol={{
          span: 4,
          offset: 1
        }}
      >
        {type === 'detail' ? (
          <>{formatTime(projectDetailData?.data?.timeEnd, false)}</>
        ) : (
          <DatePicker />
        )}
      </CustomFormItem>
      <CustomFormItem
        label="说明"
        name="description"
        labelCol={{
          span: 4,
          offset: 1
        }}
      >
        {type === 'detail' ? (
          <>{projectDetailData?.data?.description}</>
        ) : (
          <TextArea
            placeholder="请输入说明"
            autoSize={{ minRows: 3, maxRows: 10 }}
          />
        )}
      </CustomFormItem>
      <CustomFormItem
        label="GitHub Url"
        name="githubUrl"
        labelCol={{
          span: 4,
          offset: 1
        }}
      >
        {type === 'detail' ? (
          <>{projectDetailData?.data?.githubUrl}</>
        ) : (
          <TextArea
            placeholder="请输入GitHub Url"
            autoSize={{ minRows: 3, maxRows: 10 }}
          />
        )}
      </CustomFormItem>
      <CustomFormItem
        label="Demo Url"
        name="demoUrl"
        labelCol={{
          span: 4,
          offset: 1
        }}
      >
        {type === 'detail' ? (
          <>{projectDetailData?.data?.demoUrl}</>
        ) : (
          <TextArea
            placeholder="请输入Demo Url Url"
            autoSize={{ minRows: 3, maxRows: 10 }}
          />
        )}
      </CustomFormItem>
      <CustomFormItem
        label="图片"
        name="images"
        required={false}
        labelCol={{
          span: 4,
          offset: 1
        }}
      >
        {type === 'detail' ? (
          <ImageListPreview data={projectDetailData?.data?.images} />
        ) : (
          <UploadImages />
        )}
      </CustomFormItem>
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
        okRoutePath={`/admin/project/detail/${id}`}
        showOk={type !== 'detail'}
        form={form}
        extraParams={{
          id
        }}
        api={
          type === 'edit'
            ? PutEditPersonalProject
            : (data: any) => PostCreatePersonalProject({ id, ...data })
        }
        okText="保存"
        cancelText="返回"
      />
    </Form>
  )
}
