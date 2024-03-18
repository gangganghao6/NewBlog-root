import { Avatar, Button, List } from 'antd'
import CompPayDetail from './detail'
import { useState } from 'react'
import { formatTime } from '@/utils/utils'
import { useNavigate } from 'react-router-dom'
export default function Pays({ value = [], onChange, type }: any) {
  const navigate = useNavigate()
  const DetailButton = ({ id }: any) => {
    return (
      <Button type='link' onClick={() => navigate(`/admin/user-pay/detail/${id}`)}>
        查看详情
      </Button>
    )
  }
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <>
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
          <List.Item actions={[<DetailButton id={item?.id}/>]}>
            <List.Item.Meta
              avatar={<Avatar>{item?.user?.name.slice(0, 1)}</Avatar>}
              title={
                <div className="flex">
                  <div className="mr-2">{item?.user?.name}</div>
                  <div className="font-light text-[13px] mr-2">
                    {item?.user?.email}
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
