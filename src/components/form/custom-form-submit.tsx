import { Button, message } from 'antd'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

export default function CustomFormSubmit({
  okText = '确定',
  cancelText = '取消',
  form,
  api,
  className,
  showOk = true,
  showCancel = true,
  extraParams={},
  okRoutePath,
  intercepter = (e: any) => e,
  run,
  ...props
}: {
  className?: string
  okText?: string
  cancelText?: string
  form: any
  api: any
  showOk?: boolean
  showCancel?: boolean
  extraParams?: object
  okRoutePath: string
  intercepter?: Function
  run?: Function
}) {
  const navigate = useNavigate()
  const handleCancel = () => navigate(-1)
  const handleOk = async () => {
    try {
      const formData = intercepter(form.getFieldsValue())
      console.log(formData)
      await form.validateFields()
      const result = await api({ ...formData, ...extraParams })
      console.log(result);
      if (result.code !== 200) {
        throw new Error(result.message)
      }
      form.resetFields()
      message.success(`${okText}成功`)
      if (okRoutePath.endsWith('undefined')) {
        navigate(okRoutePath.replace('undefined', result.data.id))
      } else {
        navigate(okRoutePath)
      }
    } catch (e) {
      console.log(e);
      message.error(`${okText}失败`)
    }
  }
  return (
    <div {...props} className={`flex justify-center ${className}`}>
      <Button
        type={'primary'}
        size="large"
        onClick={handleOk}
        className={clsx({
          hidden: !showOk
        })}
      >
        {okText}
      </Button>
      <Button
        className={clsx('ml-2', {
          hidden: !showCancel
        })}
        size="large"
        onClick={handleCancel}
      >
        {cancelText}
      </Button>
    </div>
  )
}
