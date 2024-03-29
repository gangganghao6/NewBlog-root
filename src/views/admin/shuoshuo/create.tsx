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
import UploadImages from '@/components/form/upload-images'
import UploadVideos from '@/components/form/upload-videos'
import {
  GetShuoshuoDetail,
  PostCreateShuoshuo,
  PutEditShuoshuo
} from '@/requests/shuoshuos/shuoshuo'
import {
  ImageListPreview,
  VideoListPreview
} from '@/components/form/media-list-preview'
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
  },
  {
    key: 'visitedCount',
    label: '访问次数'
  }
]
export default function AdminShuoshuoCreate({
  type
}: {
  type: 'detail' | 'edit' | 'create'
}) {
  const [form] = Form.useForm()
  const {
    data: shuoshuoDetailData,
    error: shuoshuoDetailError,
    run: runDetail
  } = useRequest((data) => GetShuoshuoDetail({ id, ...data }), {
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
      form.setFieldsValue(shuoshuoDetailData?.data)
    }
  }, [shuoshuoDetailData])
  return (
    <Form form={form}>
      <span className="text-xl font-semibold mb-6 w-72">{`${ActionType[type]}说说`}</span>
      <Divider className="my-2" />
      {type === 'detail' && (
        <CustomDescription
          data={shuoshuoDetailData?.data || {}}
          columns={descriptionColums}
        />
      )}
      <CustomFormItem label="内容" name="content">
        {type === 'detail' ? (
          <>{shuoshuoDetailData?.data?.content}</>
        ) : (
          <TextArea
            placeholder="请输入内容"
            autoSize={{ minRows: 3, maxRows: 10 }}
          />
        )}
      </CustomFormItem>
      <CustomFormItem label="图片" name="images" required={false}>
        {type === 'detail' ? (
          <ImageListPreview data={shuoshuoDetailData?.data?.images} />
        ) : (
          <UploadImages />
        )}
      </CustomFormItem>
      <CustomFormItem label="视频" name="videos" required={false}>
        {type === 'detail' ? (
          <VideoListPreview data={shuoshuoDetailData?.data?.videos} />
        ) : (
          <UploadVideos />
        )}
      </CustomFormItem>
      {type !== 'create' && (
        <CustomFormItem label="评论" name="comments" required={false}>
          <CompComment type={type} shuoshuoId={id} run={runDetail} />
        </CustomFormItem>
      )}
      <CustomFormSubmit
        okRoutePath={`/admin/shuoshuo/detail/${id}`}
        showOk={type !== 'detail'}
        form={form}
        extraParams={{
          id
        }}
        api={
          type === 'edit'
            ? PutEditShuoshuo
            : (data: any) => PostCreateShuoshuo({ id, ...data })
        }
        okText="保存"
        cancelText="返回"
      />
    </Form>
  )
}
