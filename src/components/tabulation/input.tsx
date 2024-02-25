import { Col, Form, Input, Popover, Tooltip } from 'antd'
import clsx from 'clsx'
import { useState } from 'react'

export default function ({
  item,
}: {
  item: { key: string; label: string; required: boolean }
}) {
  const { required, label, key } = item
  const [error, setError] = useState(false)
  const rules = [required && { required: true, message: `${label}为必填项` }]

  return (
    <>
       <Tooltip title={label}>
        <div
          className={clsx('w-1/5 text-xs overflow-x-hidden text-right mr-1', {
            'required-label': required
          })}
        >
          {label}
        </div>
      </Tooltip>
      <Form.Item name={key} rules={rules} className="w-4/5">
        <Input allowClear placeholder={`请输入${label}`}/>
      </Form.Item>
    </>
  )
}
