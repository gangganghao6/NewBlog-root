import { UserConfirmPayOrder, UserCreatePayOrder } from '@/requests/users/user'
import { PayCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Modal, Result, message } from 'antd'
import { useState } from 'react'
import CustomFormItem from '@/components/form/custom-form-item'

export default function FrontPayButton({ blogId, run }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showConf, setShowConf] = useState({
    showForm: true,
    showPaying: false,
    showConfirm: false,
    showResult: false,
    loading: false,
    error: null
  })
  const [payResult, setPayResult] = useState('')
  const [form] = Form.useForm()
  const onOk = async () => {
    await form.validateFields()
    const values = form.getFieldsValue()
    if (blogId) {
      const result = await handleOk({
        blogId,
        payType: 'alipay',
        ...values,
        type: 'blog'
      })
      setPayResult(result)
    } else {
      const result = await handleOk({
        blogId,
        payType: 'alipay',
        ...values,
        type: 'personal'
      })
      setPayResult(result)
    }
    setShowConf({ ...showConf, showForm: false, showPaying: true })
  }
  const onCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
    setShowConf((pre) => ({
      ...showConf,
      showForm: true,
      showPaying: false,
      showConfirm: false,
      showResult: false
    }))
  }
  const onReOpen = () => {
    window.open(payResult?.orderUrl, '_blank')
  }
  const onSearch = async () => {
    setShowConf((pre) => ({
      ...pre,
      loading: true,
      showPaying: false,
      showConfirm: true,
      showResult: false
    }))
    try {
      await handleConfirm({
        payResult
      })
      setShowConf((pre) => ({
        ...pre,
        error: null
      }))
    } catch (e: any) {
      setShowConf((pre) => ({
        ...pre,
        error: e
      }))
    }
    setShowConf((pre) => ({
      ...pre,
      showConfirm: false,
      showPaying: false,
      showResult: true,
      loading: false
    }))
  }
  const FooterComp = (_: any, { OkBtn, CancelBtn }: any) => (
    <>
      {!showConf.showForm && (
        <Button onClick={onReOpen}>重新打开支付页面</Button>
      )}
      {!showConf.showForm && (
        <Button loading={showConf.loading} onClick={onSearch}>
          查询结果
        </Button>
      )}
      <CancelBtn />
      {showConf.showForm && <OkBtn />}
    </>
  )
  return (
    <>
      <Button
        type="default"
        shape="round"
        className="mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        <PayCircleOutlined />
        打赏
      </Button>
      <Modal
        title="打赏金额"
        open={isModalOpen}
        okText="确认支付"
        cancelText="关闭"
        onOk={onOk}
        onCancel={onCancel}
        footer={FooterComp}
      >
        {showConf.showForm && <SubmitComp form={form} />}
        {showConf.showConfirm && <ConfirmComp />}
        {showConf.showPaying && <PayingComp />}
        {showConf.showResult && (
          <ResultComp error={showConf.error} run={run} onCancel={onCancel} />
        )}
      </Modal>
    </>
  )
}
const handleOk = async ({ blogId, payType, money, type, message }: any) => {
  const result = await UserCreatePayOrder({
    blogId,
    payType,
    money,
    type,
    message
  })
  window.open(result?.data?.orderUrl, '_blank')
  return result?.data
}
const handleConfirm = async ({ payResult }: any) => {
  const result = await UserConfirmPayOrder({
    outTradeNo: payResult?.orderId
  })
  return result
}
const SubmitComp = ({ form }: any) => {
  return (
    <Form form={form}>
      <CustomFormItem
        label="金额"
        name="money"
        labelCol={{ span: 3, offset: 1 }}
      >
        <InputNumber min={0.1} step={0.1} />
      </CustomFormItem>
      <CustomFormItem
        label="备注"
        name="message"
        required={false}
        labelCol={{ span: 3, offset: 1 }}
      >
        <Input />
      </CustomFormItem>
    </Form>
  )
}
const PayingComp = () => {
  return <Result status="info" title="请在新打开的页面完成支付哦" />
}
const ConfirmComp = () => {
  return <Result status="info" title="正在查询支付结果..." />
}
const ResultComp = ({ error, run, onCancel }: any) => {
  if (error) {
    return <Result status="error" title="支付失败" subTitle={error.message} />
  } else {
    setTimeout(() => {
      onCancel()
      run()
    }, 1000)
    return <Result status="success" title="支付成功,1秒后自动关闭弹窗并刷新" />
  }
}
