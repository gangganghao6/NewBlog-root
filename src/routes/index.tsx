import { createBrowserRouter } from 'react-router-dom'
import FunctionErrorBoundary, { ErrorElement } from '@/utils/error-boundary'
import adminRoute from './admin-route'
import frontRoute from './front-route'

function addErrorBoundaryToRoutes(routes: any) {
  return routes.map((route: any) => {
    if (route.element) {
      route.errorElement = <FunctionErrorBoundary />
    }
    if (route.children) {
      route.children = addErrorBoundaryToRoutes(route.children)
    }
    return route
  })
}

export const routes = [
  adminRoute,
  frontRoute,
  {
    path: '*',
    element: (
      <ErrorElement errorMsg={{ message: '路由不存在,请输入正确的路由' }} />
    )
  }
]
export default createBrowserRouter(addErrorBoundaryToRoutes(routes))
