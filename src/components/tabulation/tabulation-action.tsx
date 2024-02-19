import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function CompAction({ operation }: { operation: any[] }) {
  return <div className="flex justify-end">{operationCreator(operation)}</div>
}
function operationCreator(operation: any[]) {
  const navigate = useNavigate()
  return operation.map((item) => {
    let MapComponent
    switch (item.type) {
      case 'create':
        MapComponent = (
          <Button type={item.buttonType} onClick={() => navigate(item.path)}>
            新建
          </Button>
        )
        break
      default:
        MapComponent = item.component
    }
    return <div className="ml-2 mb-2">{MapComponent}</div>
  })
}
