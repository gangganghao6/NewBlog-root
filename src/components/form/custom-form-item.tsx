import { formatTime } from '@/utils/utils'
import { Descriptions, Form } from 'antd'

export default ({
  label,
  name,
  required = true,
  children,
  className,
  normalize,
  labelCol = { span: 2, offset: 1 },
  ...props
}: {
  label?: string
  name: string
  required?: boolean
  children: React.ReactNode
  className?: string
  normalize?: (item: any) => any
  labelCol?: { span: number; offset: number }
}) => {
  return (
    <Form.Item
      labelAlign={'right'}
      labelCol={labelCol}
      className={`w-5/6 ${className}`}
      label={label}
      name={name}
      rules={[{ required, message: `请输入${label}` }] as any}
      normalize={normalize}
    >
      {children}
    </Form.Item>
  )
}
