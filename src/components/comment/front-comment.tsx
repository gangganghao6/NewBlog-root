import { PostCreateBlogComment } from '@/requests/blogs/blog'
import { formatTime } from '@/utils/utils'
import { Avatar, List, Input, Button, message } from 'antd'
import { useState } from 'react'
import sliceEmail from './slice-email'
const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
]
export default function FrontComment({ blogId, run, comments }: any) {
  const [comment, setComment] = useState('')
  console.log(comments)

  return (
    <>
      <div className="text-[18px] mb-6">评论</div>
      <List
        itemLayout="horizontal"
        dataSource={comments}
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
            await submitBlogComment(blogId, comment)
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
async function submitBlogComment(blogId: number, comment: string) {
  await PostCreateBlogComment({ blogId, comment })
  message.success('评论成功')
  document.querySelector('main')?.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
