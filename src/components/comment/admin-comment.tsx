import { Avatar, Button, List, Popconfirm, message } from 'antd'
import sliceEmail from './slice-email'
import { formatTime } from '@/utils/utils'
import { DeleteBlogComment } from '@/requests/blogs/blog'
import { useState } from 'react'
import { DeletePersonalComment } from '@/requests/personal/personal'
import { DeleteShuoshuoComment } from '@/requests/shuoshuos/shuoshuo'

export default function Comment({
  value = [],
  onChange,
  type,
  blogId,
  shuoshuoId,
  run
}: any) {
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <List
      itemLayout="horizontal"
      dataSource={value.slice((currentPage - 1) * 5, currentPage * 5)}
      pagination={{
        onChange: (page) => setCurrentPage(page),
        pageSize: 5,
        total: value?.length || 0,
        hideOnSinglePage: true
      }}
      renderItem={(item, index) => (
        <List.Item
          actions={
            type === 'edit'
              ? [
                  <Popconfirm
                    title="删除这条评论"
                    description="删除不可逆，是否确认删除?"
                    onConfirm={async () => {
                      await onDelete({ blogId, shuoshuoId }, item?.id, run)
                      run()
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type={'text'} danger>
                      删除
                    </Button>
                  </Popconfirm>
                ]
              : []
          }
        >
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
      )}
    />
  )
}
async function onDelete({ blogId, shuoshuoId }: any, id: string) {
  if (blogId) {
    await DeleteBlogComment({ blogId, commentId: id })
  } else if (shuoshuoId) {
    await DeleteShuoshuoComment({ shuoshuoId, commentId: id })
  } else {
    await DeletePersonalComment({ commentId: id })
  }
  // document.querySelector('main')?.scrollTo({
  //   top: 0,
  //   behavior: 'smooth'
  // })
  message.success('删除成功')
}
