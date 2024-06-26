import React, { useMemo, useState } from 'react'
import { GlobalInfo } from '@/state/base'
import MENU_LIST from '@/routes/admin-menu-list'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout, Menu, Button, Spin, Avatar, Popover } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import CompBreadCrumb from './breadcrumb'
import AvatarDropdown from './avatar-dropdown'

const { Header, Sider, Content } = Layout

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

const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const currentMenu = useMemo(() => {
    return findCurrentMenu(MENU_LIST)
  }, [location.pathname])

  return (
    <Layout className="h-full">
      <Sider
        className="overflow-y-auto"
        theme={GlobalInfo.theme}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="h-8 m-3 rounded-md bg-[rgba(255,255,255,.2)]" />
        <Menu
          onClick={({ key }) => {
            navigate(key)
          }}
          theme={'dark'}
          mode="inline"
          selectedKeys={[currentMenu?.key]}
          items={MENU_LIST}
        />
      </Sider>
      <Layout className="overflow-y-hidden">
        <Header className="p-0 bg-white h-10 leading-10 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-base"
              style={{
                width: 40, //优先级最高
                height: 40
              }}
            />
            <CompBreadCrumb />
          </div>
          <AvatarDropdown />
        </Header>
        <Content
          className={`overflow-y-auto mx-2 my-2 py-2 px-4 h-full bg-white rounded-md min-w-[1000px]`}
        >

          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
