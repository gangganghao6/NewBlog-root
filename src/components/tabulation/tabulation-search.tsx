import { Button, message } from 'antd'
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons'
import { Divider, Form } from 'antd'

export default function Action({
  loading,
  onSearch,
  onReset
}: {
  loading: boolean
  onSearch: Function
  onReset: Function
}) {
  return (
    <>
      <div className="flex justify-end">
        <Button type={'primary'} onClick={onSearch.bind(null, 1, 10)}>
          {loading ? <LoadingOutlined /> : <SearchOutlined />}
          搜索
        </Button>
        <Button onClick={onReset.bind(null)} className="ml-2">
          重置
        </Button>
      </div>
      <Divider className="my-2" />
    </>
  )
}
