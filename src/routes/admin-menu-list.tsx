import {
  HomeFilled,
  BookFilled,
  HighlightFilled,
  FileFilled,
  FireFilled,
  HeartFilled
} from '@ant-design/icons'
export default [
  {
    label: '首页',
    key: '/admin/home',
    icon: <HomeFilled />,
    path: '/admin/home'
  },
  {
    label: '博客',
    key: '/admin/blog/list',
    icon: <BookFilled />,
    path: '/admin/blog/list'
  },
  {
    label: '说说',
    key: '/admin/shuoshuo/list',
    icon: <HighlightFilled />,
    path: '/admin/shuoshuo/list'
  },
  {
    label: '文件',
    key: '/admin/file/list',
    icon: <FileFilled />,
    path: '/admin/file/list'
  },
  {
    label: '聊天',
    key: '/admin/chat',
    icon: <FireFilled />,
    path: '/admin/chat'
  },
  {
    label: '关于',
    key: '/admin/about',
    icon: <HeartFilled />,
    path: '/admin/about'
  }
]
