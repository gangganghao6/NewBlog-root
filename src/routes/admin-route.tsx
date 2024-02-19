import AppAdmin from '@/App-admin'
import AdminBlogCreate from '@/views/admin/blog/create'
import AdminBlogEdit from '@/views/admin/blog/edit'
import AdminBlogList from '@/views/admin/blog/list'
import AdminHome from '@/views/admin/home/home'
import AdminLogin from '@/views/admin/login'

export default {
  path: '/admin',
  element: <AppAdmin />,
  children: [
    {
      path: '/admin/login',
      title: '登录',
      element: <AdminLogin />,
      category: 'login'
    },
    {
      path: '/admin/home',
      title: '首页',
      element: <AdminHome />,
      category: 'home'
    },
    // {
    //   path: '/admin/blog/create',
    //   title: '初始化博客'
    // },
    {
      path: '/admin/blog/list',
      title: '博客列表',
      element: <AdminBlogList />,
      category: 'blog'
    },
    {
      path: '/admin/blog/detail/:id',
      title: '博客查看',
      element: <AdminBlogEdit />,
      category: 'blog'
    },
    {
      path: '/admin/blog/edit/:id',
      title: '博客编辑',
      element: <AdminBlogEdit />,
      category: 'blog'
    },
    {
      path: '/admin/blog/create',
      title: '博客新建',
      element: <AdminBlogCreate />,
      category: 'blog'
    }
  ]
}
