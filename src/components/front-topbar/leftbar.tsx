import { GlobalInfo } from '@/state/base'
import { useSnapshot } from 'valtio'
import clsx from 'clsx'
import { Menu } from 'antd'
import { useLocation, useMatches, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import MENU_LIST from '@/routes/front-menu-list'
import styles from './leftbar.module.scss'
import { routes } from '@/routes'

const findCurrentMenu: any = (list: []) => {
  for (const item of list) {
    if (item.children) {
      const result = findCurrentMenu(item.children)
      if (result) return result
    } else if (window.location.pathname.includes(item.key)) {
      return item
    }
  }
}

export default function Leftbar(props: any) {
  const state = useSnapshot(GlobalInfo)
  const navigate = useNavigate()
  const location = useLocation()
  const matchItem = useMatches()[0]
  useEffect(() => {
    const categoryMap = routes.find((e) => e.path === '/front')?.children
    const title = categoryMap.find((item) => {
      if (matchItem?.params?.id !== undefined) {
        const formatPath = item.path.replace(':id', matchItem?.params?.id)
        return formatPath === location.pathname
      }
      return item.path === location.pathname
    })?.title
    document.title = title
  }, [location.pathname])

  const currentMenu = useMemo(() => {
    return findCurrentMenu(MENU_LIST)
  }, [location.pathname])
  return (
    <>
      <aside
        className={clsx(styles.leftbar, {
          [styles.show]: state.isLeftbarOpen,
          [styles.hidden]: !state.isLeftbarOpen
        })}
      >
        <HeadImage data={state.baseInfo} />
        <Menu
          onClick={({ key }) => {
            navigate(key)
            GlobalInfo.isLeftbarOpen = false
          }}
          theme={'light'}
          mode="inline"
          selectedKeys={[currentMenu?.key]}
          // items={MENU_LIST}
        >
          {/* <Menu.Item>1223</Menu.Item> */}
          {MENU_LIST.map((item) => {
            return (
              <Menu.Item
                {...(item.path === '/front/setting' && {
                  'data-step': '2',
                  'data-intro': '在这里可以查看您的账户有关信息'
                })}
                key={item.path}
                icon={item.icon}
              >
                {item.label}
              </Menu.Item>
            )
          })}
        </Menu>
      </aside>
    </>
  )
}
const HeadImage = ({ data }) => {
  return (
    <div
      className={styles['head-image']}
      style={{ backgroundImage: `url(${data?.headImage?.url})` }}
    >
      {/* <img src={data?.headImage?.url} /> */}
      <div className={styles.name}>{data?.name}</div>
      <div className={styles.description}>{data?.description}</div>
    </div>
  )
}
