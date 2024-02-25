import { Avatar, Button, List } from 'antd'
import CompPayDetail from './detail'
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
export default function Pays({ value, onChange, type }: any) {
  const DetailButton = () => <CompPayDetail/>
  const DeleteButton = () => <Button type={'link'}>删除</Button>

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item
          actions={
            type === 'edit'
              ? [<DetailButton />, <DeleteButton />]
              : [<DetailButton />]
          }
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
