import { Form, Popover, Select } from 'antd'
import clsx from 'clsx'
import { useState } from 'react'

export default function ({
  item
}: {
  item: {
    key: string
    label: string
    options: any[]
    required?: boolean
    mode?: string
  }
}) {
  const { key, options, required, label } = item
  const rules = [required && { required: true, message: `${label}为必填项` }]

  return (
    <>
      <Popover placement="topRight" content={label}>
        <div
          className={clsx('w-1/5 text-xs overflow-x-hidden text-right mr-1', {
            'required-label': required
          })}
        >
          {label}
        </div>
      </Popover>
      <Form.Item name={key} rules={rules} className="w-4/5">
        <Select
          mode={item.mode}
          options={options.map((option: any) => ({
            label: option.label,
            value: option.value
          }))}
        />
      </Form.Item>
    </>
  )
}
