import { PostCreateBlogComment } from '@/requests/blogs/blog'
import { formatTime } from '@/utils/utils'
import { Avatar, List, Input, Button, message } from 'antd'
import { useState } from 'react'
import sliceEmail from './slice-email'
import { PostCreatePersonalComment } from '@/requests/personal/personal'
import { PostCreateShuoshuoComment } from '@/requests/shuoshuos/shuoshuo'
import { PostCreateComment } from '@/requests/base/comments'

export default function FrontComment({
  blogId,
  run,
  comments = [],
  shuoshuoId,
  personalId
}: any) {
  const [comment, setComment] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <>
      <div className="text-[18px] mb-6">评论 {comments?.length}条</div>
      <List
        itemLayout="horizontal"
        dataSource={comments.slice((currentPage - 1) * 5, currentPage * 5)}
        pagination={{
          onChange: (page) => setCurrentPage(page),
          pageSize: 5,
          total: comments?.length || 0,
          hideOnSinglePage: true
        }}
        renderItem={(item, index) => {
          return (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar>{item?.user?.name?.slice(0, 1)}</Avatar>}
                title={
                  <div className="flex">
                    <div className="mr-2">{item?.user?.name}</div>
                    <div className="font-light text-[13px]">
                      {sliceEmail(item?.user?.email)}
                    </div>
                  </div>
                }
                description={
                  <div className="flex flex-col">
                    <div className="text-[16px]">{item?.comment}</div>
                    <div className="self-end text-[14px]">
                      {formatTime(item?.createdTime)}
                    </div>
                  </div>
                }
              />
            </List.Item>
          )
        }}
      />
      <Input.TextArea
        placeholder="说点什么叭..."
        className="my-4"
        autoSize={{ minRows: 3, maxRows: 6 }}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex justify-end">
        <Button
          onClick={async () => {
            await submitBlogComment({ blogId, shuoshuoId, personalId }, comment)
            run()
            setComment('')
          }}
          type="primary"
        >
          发表评论
        </Button>
      </div>
    </>
  )
}
async function submitBlogComment(
  { blogId, shuoshuoId, personalId }: any,
  comment: string
) {
  await PostCreateComment({ blogId, shuoshuoId, personalId, comment })
  message.success('评论成功')
}
