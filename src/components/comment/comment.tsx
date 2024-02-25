import { Avatar, List } from 'antd'
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
export default function Comment({ value, onChange, type }: any) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item
          actions={type === 'edit' ? [<a key="comment-delete">删除</a>] : []}
        >
          <List.Item.Meta
            avatar={<Avatar>{item.title.slice(0, 1)}</Avatar>}
            title={<>{item.title}</>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  )
}
