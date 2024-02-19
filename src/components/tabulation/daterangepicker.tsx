import { Form, Popover, Select, DatePicker } from 'antd'
import clsx from 'clsx'
import { useState } from 'react'
import locale from 'antd/es/date-picker/locale/zh_CN'

import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import { formatTime } from '@/utils/utils'

const { RangePicker } = DatePicker

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
  const { key, required, label } = item
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
      <Form.Item
        name={key}
        rules={rules}
        className="w-4/5"
      >
        <RangePicker locale={locale} />
      </Form.Item>
    </>
  )
}
