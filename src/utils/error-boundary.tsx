import { Button, Result } from 'antd'
import React from 'react'
import { useRouteError } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export class ClassErrorBoundary extends React.Component {
  state = { hasError: false, error: null, errorInfo: null }
  static getDerivedStateFromError(error: any) {
    return { hasError: true }
  }
  componentDidCatch(error: any, errorInfo: any) {}
  render() {
    if (this.state.hasError) {
      return (
        <ErrorElement
          errorMsg={{
            error: this.state.error,
            errorInfo: this.state.errorInfo
          }}
        />
      )
    }
    return this.props.children
  }
}
export default function FunctionErrorBoundary() {
  const error = useRouteError()  
  return <ErrorElement errorMsg={error} />
}
export function ErrorElement({ errorMsg }: { errorMsg: any }) {
  const navigate = useNavigate()

  return (
    <>
      <Result
        status="error"
        title="发生错误"
        subTitle={errorMsg?.message || JSON.stringify(errorMsg)}
        extra={[
          <Button
            type="primary"
            onClick={() => {
              navigate(-1)
            }}
          >
            返回上一页
          </Button>,
          <Button
            key="buy"
            onClick={() => {
              window.location.reload()
            }}
          >
            刷新
          </Button>
        ]}
      ></Result>
    </>
  )
}
