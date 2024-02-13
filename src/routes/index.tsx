import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import FunctionErrorBoundary from '@/utils/error-boundary'
import Home from '@/views/home/home'
import BlogList from '@/views/blog/blog-list'
import BlogEdit from '@/views/blog/blog-edit'

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

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/blog/list',
        element: <BlogList />,
      },
      {
        path: '/blog/edit/:id',
        element: <BlogEdit />
      }
    ]
  }
]
export default createBrowserRouter(addErrorBoundaryToRoutes(routes))
