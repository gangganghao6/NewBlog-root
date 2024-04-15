import { useRequest } from 'ahooks'
import { Divider, Form, Input, Image } from 'antd'
import CustomFormSubmit from '@/components/form/custom-form-submit'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ActionType } from '@/views/admin/constant'
import CompComment from '@/components/comment/admin-comment'
import CompPay from '@/components/pay/admin-pay-list'
import { CustomDescription } from '@/components/form/custom-description'
import CustomFormItem from '@/components/form/custom-form-item'
import { formatTime } from '@/utils/utils'
import {
  GetShareFileDetail,
  PostCreateShareFile,
  PutEditShareFile
} from '@/requests/share_files/share_file'
import UploadFile from './upload-file'
import FilePreview from './file-preview'
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
    key: 'downloadCount',
    label: '下载次数'
  }
]
export default function AdminShuoshuoCreate({
  type
}: {
  type: 'detail' | 'edit' | 'create'
}) {
  const [form] = Form.useForm()
  const {
    data: shareFileDetailData,
    error: shareFileDetailError,
    run: runDetail
  } = useRequest((data) => GetShareFileDetail(data), {
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
    if (type !== 'create') {
      form.setFieldsValue(shareFileDetailData?.data)
    }
  }, [shareFileDetailData])

  return (
    <Form form={form}>
      <span className="text-xl font-semibold mb-6 w-72">{`${ActionType[type]}文件`}</span>
      <Divider className="my-2" />
      {type === 'detail' && (
        <CustomDescription
          data={shareFileDetailData?.data || {}}
          columns={descriptionColums}
        />
      )}
      <CustomFormItem
        label="文件名"
        name="name"
        labelCol={{
          span: 3,
          offset: 1
        }}
      >
        {type === 'detail' ? (
          <>{shareFileDetailData?.data?.name}</>
        ) : (
          <Input placeholder="请输入文件名" />
        )}
      </CustomFormItem>
      <CustomFormItem
        name="file"
        label="文件"
        labelCol={{
          span: 3,
          offset: 1
        }}
      >
        {type === 'detail' ? <FilePreview /> : <UploadFile form={form} />}
      </CustomFormItem>
      <CustomFormSubmit
        okRoutePath={`/admin/sharefile/detail/${id}`}
        showOk={type !== 'detail'}
        form={form}
        extraParams={{
          id
        }}
        api={
          type === 'edit'
            ? PutEditShareFile
            : (data: any) => PostCreateShareFile({ id, ...data })
        }
        okText="保存"
        cancelText="返回"
        intercepter={(e: any) => {
          if (e.file.post) {
            e.video = e.file
            delete e.file
          } else if (e.file.compressUrl) {
            e.image = e.file
            delete e.file
          } else {
            e.file = e.file
          }
          return e
        }}
      />
    </Form>
  )
}
