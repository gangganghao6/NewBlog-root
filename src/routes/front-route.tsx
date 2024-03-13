import AppFront from '@/App-front'
import FrontBlog from '@/views/front/blog/blog'
import FrontBlogDetail from '@/views/front/blog/blog-detail'
import FrontChat from '@/views/front/chat/chat'
import FrontLogin from '@/views/front/login'

export default {
  path: '/front',
  element: <AppFront />,
  children: [
    // {
    //   path: '/front/blog',
    //   title: '首页',
    //   element: <FrontHome />,
    //   category: 'home'
    // },
    {
      path: '/front/blog/list',
      title: '博客列表',
      element: <FrontBlog />
    },
    {
      path: '/front/blog/detail/:id',
      title: '博客详情',
      element: <FrontBlogDetail />
    },
    {
      path: '/front/chat',
      title: '博客聊天室',
      element: <FrontChat />
    },
    {
      path: '/front/login',
      title: '博客登录',
      element: <FrontLogin />
    }
  ]
}
