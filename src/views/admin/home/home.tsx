import {
  GetBaseSummaryInfo
} from '@/requests/base/info'
import { CustomDescription } from '@/components/form/custom-description'
import { useRequest } from 'ahooks'
const descriptionColums = [
  {
    key: 'blogCount',
    label: '博客文章数量'
  },
  {
    key: 'blogVisitedCount',
    label: '博客访问数量'
  },
  {
    key: 'commentCount',
    label: '评论数量'
  },
  {
    key: 'githubCount',
    label: 'Github数量'
  },
  {
    key: 'githubVisitedCount',
    label: 'Github访问数量'
  },
  {
    key: 'payCount',
    label: '打赏订单数量'
  },
  {
    key: 'payMoneyCount',
    label: '打赏总金额'
  },
  {
    key: 'githubCount',
    label: 'Github数量'
  },
  {
    key: 'shareFileCount',
    label: '文件盲盒数量'
  },

  {
    key: 'shareFileDownloadCount',
    label: '文件盲盒下载数量'
  },
  {
    key: 'shuoshuoCount',
    label: '说说数量'
  },
  {
    key: 'shuoshuoVisitedCount',
    label: '说说访问数量'
  },
  {
    key: 'todoListCount',
    label: 'TodoList数量'
  },
  {
    key: 'chatCount',
    label: '聊天记录数量'
  },
  {
    key: 'userCount',
    label: '用户数量'
  },
  {
    key: 'visitedCount',
    label: '用户总访问次数'
  }
]
export default function Home() {
  const { data } = useRequest(GetBaseSummaryInfo)
  return (
    <CustomDescription data={data?.data || {}} columns={descriptionColums} />
  )
}
