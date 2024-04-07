import AppFront from '@/App-front'
import FrontBlogList from '@/views/front/blog/blog-list'
import FrontBlogDetail from '@/views/front/blog/blog-detail'
import FrontChat from '@/views/front/chat/chat'
import FrontLogin from '@/views/front/login'
import FrontGithub from '@/views/front/github/github'
import FrontShareFile from '@/views/front/sharefile/sharefile'
import FrontTodoList from '@/views/front/todolist/todolist'
import FrontPersonal from '@/views/front/personal/personal'
import FrontAbout from '@/views/front/about/about'
import FrontShuoshuo from '@/views/front/shuoshuo/shuoshou'
import FrontShuoshuoDetail from '@/views/front/shuoshuo/shuoshuo-detail'
import FrontSetting from '@/views/front/setting'

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
      element: <FrontBlogList />
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
    },
    {
      path: '/front/github',
      title: '博客Github',
      element: <FrontGithub />
    },
    {
      path: '/front/sharefile',
      title: '文件盲盒',
      element: <FrontShareFile />
    },
    {
      path: '/front/todolist',
      title: 'TODO List',
      element: <FrontTodoList />
    },
    {
      path: '/front/personal',
      title: '个人主页',
      element: <FrontPersonal />
    },
    {
      path: '/front/about',
      title: '关于',
      element: <FrontAbout />
    },
    {
      path: '/front/shuoshuo/list',
      title: '说说列表',
      element: <FrontShuoshuo />
    },
    {
      path: '/front/shuoshuo/detail/:id',
      title: '说说详情',
      element: <FrontShuoshuoDetail />
    },
    {
      path: '/front/setting',
      title: '设置',
      element: <FrontSetting />
    }
  ]
}
