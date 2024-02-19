import { Popconfirm } from 'antd'
import { Ref } from 'react'
import { NavigateFunction } from 'react-router-dom'
export default function DefaultOperationRender(
  row: any,
  type: string,
  navigate: NavigateFunction,
  tableRef: Ref<any>
) {
  const MY_TYPE: any[any] = {
    blog: '/blog'
  }
  const onDetail = () => {
    navigate(`${MY_TYPE[type]}/detail/${row.id}`)
  }
  const onEdit = () => {
    navigate(`${MY_TYPE[type]}/edit/${row.id}`)
  }
  const onDelete = () => {
    tableRef.current.onSearch()
  }
  return (
    <div className='flex flex-wrap'>
      <a className='mr-1' onClick={onDetail}>{'查看'}</a>
      <a className='mr-1' onClick={onEdit}>{'编辑'}</a>
      <Popconfirm
        title="删除"
        description="删除后无法恢复，确认删除吗?"
        onConfirm={onDelete}
        okText="是"
        cancelText="否"
      >
        <a>删除</a>
      </Popconfirm>
    </div>
  )
}
