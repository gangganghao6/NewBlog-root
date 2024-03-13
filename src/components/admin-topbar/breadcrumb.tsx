import { Breadcrumb } from 'antd'
import { Link, useMatches } from 'react-router-dom'
import { routes } from '@/routes'
const typeMap = [
  {
    type: 'list',
    title: '列表'
  },
  {
    type: 'detail',
    title: '详情'
  },
  {
    type: 'edit',
    title: '编辑'
  },
  {
    type: 'create',
    title: '新建'
  }
]
export default function CompBreadCrumb() {
  const matchPath = useMatches()?.[1]?.pathname
  //blog|home|file|shuoshuo...
  const category = matchPath?.split('/')?.[2]
  const type: 'list' | 'detail' | 'edit' | 'create' = matchPath?.split(
    '/'
  )?.[3] as any
  const item = []
  const categoryMap = routes.find((e)=>e.path==='/admin')?.children

  item.push({
    path: `${category}/list`,
    title: categoryMap.find((item) => item.category === category)?.title
  })
  if (['detail', 'edit', 'create'].includes(type)) {
    item.push({
      title: typeMap.find((item) => item.type === type)?.title
    })
  }

  function itemRender(item, params, items, paths) {
    const last = items.indexOf(item) === items.length - 1
    return last ? (
      <span>{item.title}</span>
    ) : (
      <Link to={paths[0]}>{item.title}</Link>
    )
  }
  document.title = item.map((item) => item.title).join('-')

  return <Breadcrumb itemRender={itemRender} items={item} separator=">" />
}
