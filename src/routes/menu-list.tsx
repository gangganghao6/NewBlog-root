import {
  HomeRounded as MuiHomeRoundedIcon,
  ArticleRounded as MuiArticleRoundedIcon,
  InsertDriveFileRounded as MuiInsertDriveFileRoundedIcon,
  AccountCircleRounded as MuiAccountCircleRoundedIcon,
  MessageRounded as MuiMessageRoundedIcon,
  PollRounded as MuiPollRoundedIcon
} from '@mui/icons-material'
import { title } from 'process'
export default [
  {
    title: '首页',
    icon: <MuiHomeRoundedIcon />,
    path: '/home'
  },
  {
    title : '博客',
    icon: <MuiPollRoundedIcon />,
    path: '/blog/list'
  },
  {
    title: '说说',
    icon: <MuiArticleRoundedIcon />,
    path: '/shuoshuo/list'
  },
  {
    title: '文件',
    icon: <MuiInsertDriveFileRoundedIcon />,
    path: '/file/list'
  },
  {
    title: '关于',
    icon: <MuiAccountCircleRoundedIcon />,
    path: '/about'
  },
  {
    title: '聊天',
    icon: <MuiMessageRoundedIcon />,
    path: '/chat'
  }
]
