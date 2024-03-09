import {
  SettingOutlined,
  UserOutlined,
  FireOutlined,
  HighlightOutlined,
  BookOutlined,
  HomeOutlined,
  FileOutlined,
  HeartOutlined,
  ProjectOutlined,
  FundProjectionScreenOutlined,
  CarryOutOutlined,
  AliwangwangOutlined
} from '@ant-design/icons'
export default [
  {
    label: '首页',
    key: '/admin/home',
    icon: <HomeOutlined />,
    path: '/admin/home'
  },
  {
    label: '博客',
    key: '/admin/blog/list',
    icon: <BookOutlined />,
    path: '/admin/blog/list'
  },
  {
    label: '说说',
    key: '/admin/shuoshuo/list',
    icon: <HighlightOutlined />,
    path: '/admin/shuoshuo/list'
  },
  {
    label: '文件',
    key: '/admin/sharefile/list',
    icon: <FileOutlined />,
    path: '/admin/sharefile/list'
  },
  {
    label: '聊天（待完成）',
    key: '/admin/chat',
    icon: <FireOutlined />,
    path: '/admin/chat'
  },
  {
    label: 'TODO List',
    key: '/admin/todolist/list',
    icon: <CarryOutOutlined />,
    path: '/admin/todolist/list'
  },
  {
    label: '个人',
    icon: <UserOutlined />,
    children: [
      {
        label: '个人主页',
        key: '/admin/personal',
        path: '/admin/personal'
      },
      {
        label: '个人经历',
        key: '/admin/experience/list',
        path: '/admin/experience/list'
      },
      {
        label: '个人项目',
        key: '/admin/project/list',
        path: '/admin/project/list'
      }
    ]
  },

  {
    label: '用户',
    icon: <AliwangwangOutlined />,
    children: [
      {
        label: '用户信息',
        key: '/admin/user/list',
        path: '/admin/user/list'
      },
      {
        label: '聊天记录（待完成）',
        key: '/admin/chat/list',
        path: '/admin/chat/list'
      },
      {
        label: '访问记录（待完成）',
        key: '/admin/uservisit/list',
        path: '/admin/uservisit/list'
      },
      {
        label: '打赏记录（待完成）',
        key: '/admin/pay/list',
        path: '/admin/pay/list'
      }
    ]
  },

  {
    label: '设置',
    key: '/admin/setting',
    icon: <SettingOutlined />,
    path: '/admin/setting'
  },
  {
    label: '关于',
    key: '/admin/about',
    icon: <HeartOutlined />,
    path: '/admin/about'
  }
]
