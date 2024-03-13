import { Avatar, Button, List } from 'antd'
import sliceEmail from '@/components/comment/slice-email'
import { formatTime } from '@/utils/utils'
import { useState } from 'react'
export default function Pays({ pays = [] }: any) {
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <>
      <div className="text-[18px] mb-6">打赏记录 {pays?.length}条</div>
      <List
        itemLayout="horizontal"
        dataSource={pays.slice((currentPage - 1) * 5, currentPage * 5)}
        pagination={{
          onChange: (page) => setCurrentPage(page),
          pageSize: 5,
          total: pays?.length || 0,
          hideOnSinglePage: true
        }}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{item?.user?.name.slice(0, 1)}</Avatar>}
              title={
                <div className="flex">
                  <div className="mr-2">{item?.user?.name}</div>
                  <div className="font-light text-[13px] mr-2">
                    {sliceEmail(item?.user?.email)}
                  </div>
                  <div className="font-light text-[13px]">
                    {`打赏了${item?.money}元`}
                  </div>
                </div>
              }
              description={
                <div className="flex flex-col">
                  <div className="text-[16px]">{`备注：${
                    item?.message || '无'
                  }`}</div>
                  <div className="self-end text-[14px]">
                    {formatTime(item?.closeTime)}
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </>
  )
}
