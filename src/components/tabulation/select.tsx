import { useRequest } from 'ahooks'
import { Form, Popover, Select, Tooltip } from 'antd'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

export default function ({
  item
}: {
  item: {
    key: string
    label: string
    options: any[]
    required?: boolean
    mode?: string
    api?: Function
  }
}) {
  const { key, options, required, label, api } = item
  const rules = [required && { required: true, message: `${label}为必填项` }]
  const { data, run } = useRequest((data) => api?.(), {
    manual: false
  })
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
        <Select
          allowClear
          placeholder={`请选择${label}`}
          mode={item.mode}
          options={
            options
              ? options.map((option: any) => ({
                  label: option.label,
                  value: option.value
                }))
              : data?.data.map((option: any) => ({
                  label: option,
                  value: option
                }))
          }
        />
      </Form.Item>
    </>
  )
}
