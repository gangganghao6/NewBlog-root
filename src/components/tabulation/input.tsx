import { Col, Form, Input, Popover } from 'antd'
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
        <Input />
      </Form.Item>
      {/* <TextField
        fullWidth
        size="small"
        required={item.required}
        error={error}
        value={formData[item.key]}
        label={item.label}
        helperText={error && `${item.label}为必填项`}
        onBlur={(e) => setError(e.target.value === '' && item.required)}
        onChange={(e) => {
          setError(e.target.value === '' && item.required)
          setFormData({
            ...formData,
            [item.key]: e.target.value
          })
        }}
      /> */}
    </>
    //   </div>
  )
}
