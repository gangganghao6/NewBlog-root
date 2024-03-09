import AppAdmin from '@/App-admin'
import AdminBlogCreate from '@/views/admin/blog/create'
import AdminBlogList from '@/views/admin/blog/list'
import AdminShuoshuoList from '@/views/admin/shuoshuo/list'
import AdminShuoshuoCreate from '@/views/admin/shuoshuo/create'
import AdminHome from '@/views/admin/home/home'
import AdminLogin from '@/views/admin/login'
import AdminSharefileList from '@/views/admin/sharefile/list'
import AdminSharefileCreate from '@/views/admin/sharefile/create'
import AdminExperienceList from '@/views/admin/experience/list'
import AdminExperienceCreate from '@/views/admin/experience/create'
import AdminProjectList from '@/views/admin/project/list'
import AdminProjectCreate from '@/views/admin/project/create'
import AdminPersonal from '@/views/admin/personal/create'
import AdminTodolistList from '@/views/admin/todolist/list'
import AdminTodolistCreate from '@/views/admin/todolist/create'
import AdminUserList from '@/views/admin/user/list'
import AdminUserCreate from '@/views/admin/user/create'
import AdminSetting from '@/views/admin/setting/create'

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
    {
      path: '/admin/blog/list',
      title: '博客列表',
      element: <AdminBlogList />,
      category: 'blog'
    },
    {
      path: '/admin/blog/detail/:id',
      title: '博客查看',
      element: <AdminBlogCreate type="detail" />,
      category: 'blog'
    },
    {
      path: '/admin/blog/edit/:id',
      title: '博客编辑',
      element: <AdminBlogCreate type="edit" />,
      category: 'blog'
    },
    {
      path: '/admin/blog/create',
      title: '博客新建',
      element: <AdminBlogCreate type="create" />,
      category: 'blog'
    },
    {
      path: '/admin/shuoshuo/list',
      title: '说说列表',
      element: <AdminShuoshuoList />,
      category: 'shuoshuo'
    },
    {
      path: '/admin/shuoshuo/detail/:id',
      title: '说说查看',
      element: <AdminShuoshuoCreate type="detail" />,
      category: 'shuoshuo'
    },
    {
      path: '/admin/shuoshuo/edit/:id',
      title: '说说编辑',
      element: <AdminShuoshuoCreate type="edit" />,
      category: 'shuoshuo'
    },
    {
      path: '/admin/shuoshuo/create',
      title: '说说新建',
      element: <AdminShuoshuoCreate type="create" />,
      category: 'shuoshuo'
    },
    {
      path: '/admin/sharefile/list',
      title: '文件列表',
      element: <AdminSharefileList />,
      category: 'sharefile'
    },
    {
      path: '/admin/sharefile/detail/:id',
      title: '文件查看',
      element: <AdminSharefileCreate type="detail" />,
      category: 'sharefile'
    },
    {
      path: '/admin/sharefile/edit/:id',
      title: '文件编辑',
      element: <AdminSharefileCreate type="edit" />,
      category: 'sharefile'
    },
    {
      path: '/admin/sharefile/create',
      title: '文件新建',
      element: <AdminSharefileCreate type="create" />,
      category: 'sharefile'
    },
    {
      path: '/admin/personal',
      title: '编辑个人主页',
      element: <AdminPersonal type="edit" />,
      category: 'personal'
    },
    {
      path: '/admin/experience/list',
      title: '个人经历列表',
      element: <AdminExperienceList />,
      category: 'experience'
    },
    {
      path: '/admin/experience/detail/:id',
      title: '个人经历查看',
      element: <AdminExperienceCreate type="detail" />,
      category: 'experience'
    },
    {
      path: '/admin/experience/edit/:id',
      title: '个人经历编辑',
      element: <AdminExperienceCreate type="edit" />,
      category: 'experience'
    },
    {
      path: '/admin/experience/create',
      title: '个人经历新建',
      element: <AdminExperienceCreate type="create" />,
      category: 'experience'
    },
    {
      path: '/admin/project/list',
      title: '个人项目列表',
      element: <AdminProjectList />,
      category: 'project'
    },
    {
      path: '/admin/project/detail/:id',
      title: '个人项目查看',
      element: <AdminProjectCreate type="detail" />,
      category: 'project'
    },
    {
      path: '/admin/project/edit/:id',
      title: '个人项目编辑',
      element: <AdminProjectCreate type="edit" />,
      category: 'project'
    },
    {
      path: '/admin/project/create',
      title: '个人项目新建',
      element: <AdminProjectCreate type="create" />,
      category: 'project'
    },
    {
      path:'/admin/todolist/list',
      title: 'TODO List列表',
      element: <AdminTodolistList />,
      category: 'todolist'
    },
    {
      path:'/admin/todolist/detail/:id',
      title: 'TODO List查看',
      element: <AdminTodolistCreate type="detail" />,
      category: 'todolist'
    },
    {
      path:'/admin/todolist/edit/:id',
      title: 'TODO List编辑',
      element: <AdminTodolistCreate type="edit" />,
      category: 'todolist'
    },{
      path:'/admin/todolist/create',
      title: 'TODO List新建',
      element: <AdminTodolistCreate type="create" />,
      category: 'todolist'
    },
    {
      path:'/admin/user/list',
      title: '用户列表',
      element: <AdminUserList />,
      category: 'user'
    },
    {
      path:'/admin/user/detail/:id',
      title: '用户查看',
      element: <AdminUserCreate type="detail" />,
      category: 'user'
    },
    {
      path:'/admin/user/edit/:id',
      title: '用户编辑',
      element: <AdminUserCreate type="edit" />,
      category: 'user'
    },
    {
      path:'/admin/user/create',
      title: '用户新建',
      element: <AdminUserCreate type="create" />,
      category: 'user'
    },
    {
      path: '/admin/setting',
      title: '博客设置',
      element: <AdminSetting type="edit" />,
      category: 'setting'
    },
  ]
}
