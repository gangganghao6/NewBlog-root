import { Popconfirm, message } from 'antd'
import { on } from 'events'
import { Ref } from 'react'
import { NavigateFunction } from 'react-router-dom'
export default function DefaultOperationRender({
  row,
  navigate,
  tableRef,
  onDeleteApi,
  detailRoutePath,
  editRoutePath
}: {
  row: any
  navigate: NavigateFunction
  tableRef: Ref<any>
  onDeleteApi?: Function
  detailRoutePath?: string
  editRoutePath?: string
}) {
  const onDetail = () => {
    navigate(detailRoutePath)
  }
  const onEdit = () => {
    navigate(editRoutePath)
  }
  const onDelete = async () => {
    console.log(row)

    const result = await onDeleteApi({ id: row.id })
    console.log(result)
    message.success('删除成功')
    tableRef?.current?.onSearch()
  }
  return (
    <div className="flex flex-wrap">
      {detailRoutePath && (
        <a className="mr-1" onClick={onDetail}>
          {'查看'}
        </a>
      )}
      {editRoutePath && (
        <a className="mr-1" onClick={onEdit}>
          {'编辑'}
        </a>
      )}
      {onDeleteApi && (
        <Popconfirm
          title="删除"
          description="删除后无法恢复，确认删除吗?"
          onConfirm={onDelete}
          okText="是"
          cancelText="否"
        >
          <a>删除</a>
        </Popconfirm>
      )}
    </div>
  )
}
