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
        <Menu
          onClick={({ key }) => {
            navigate(key)
            GlobalInfo.isLeftbarOpen = false
          }}
          theme={'light'}
          mode="inline"
          selectedKeys={[currentMenu?.key]}
          items={MENU_LIST}
        />
      </aside>
    </>
  )
}
