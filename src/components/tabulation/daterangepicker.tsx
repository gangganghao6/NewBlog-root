import { Form, Popover,  DatePicker, Tooltip } from 'antd'
import clsx from 'clsx'

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
      <Tooltip title={label}>
        <div
          className={clsx('w-1/5 text-xs overflow-x-hidden text-right mr-1', {
            'required-label': required
          })}
        >
          {label}
        </div>
      </Tooltip>
      <Form.Item
        name={key}
        rules={rules}
        className="w-4/5"
      >
        <RangePicker allowClear format={'YYYY-MM-DD'}/>
      </Form.Item>
    </>
  )
}
