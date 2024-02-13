import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import React from 'react'
import { useRouteError } from 'react-router-dom'
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
function ErrorElement({ errorMsg }: { errorMsg: any }) {
  return (
    <div className="flex">
      <Alert severity="error">
        <AlertTitle>{'Error'}</AlertTitle>
        {errorMsg?.message || JSON.stringify(errorMsg)}
      </Alert>
    </div>
  )
}
