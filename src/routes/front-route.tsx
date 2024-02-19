import AppAdmin from "@/App-admin";
import AdminBlogEdit from '@/views/admin/blog/edit'
import AdminBlogList from '@/views/admin/blog/list'
import AdminHome from '@/views/admin/home/home'


export default {
  path: '/front',
  element: <AppAdmin />,
  children: [
    {
      path: '/front/home',
      title: '首页',
      element: <AdminHome />,
      category: 'home'
    },
    {
      path: '/front/blog/list',
      title: '博客列表',
      element: <AdminBlogList />,
      category: 'blog'
    },
    {
      path: '/front/blog/detail/:id',
      title: '博客查看',
      element: <AdminBlogEdit />,
      category: 'blog'
    },
    {
      path: '/front/blog/edit/:id',
      title: '博客编辑',
      element: <AdminBlogEdit />,
      category: 'blog'
    }
  ]
}
