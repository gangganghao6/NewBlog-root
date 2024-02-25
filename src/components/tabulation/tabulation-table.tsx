import { Table } from 'antd'
import Action from './tabulation-action'
// import { onSearch } from './tabulation-search'

export default function CompTable({
  column,
  data,
  loading,
  operation,
  onSearch
}: {
  column: any[]
  data: any
  loading: boolean
  operation: any[]
  onSearch: Function
}) {
  data &&
    (data.result = data?.data?.result.map((item: any) => {
      return { ...item, operation: 'operation' }
    }))
  data && (data.count = data?.data?.count)

  return (
    <>
      <Action operation={operation} />
      <Table
        size="small"
        loading={loading}
        columns={column}
        dataSource={data?.result}
        pagination={{
          total: data?.count,
          onChange: (page, size) => {
            onSearch(page, size)
          }
        }}
      />
    </>
  )
}
