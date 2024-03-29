import { Input } from 'antd'
import styles from './topbar.module.scss'
import { GlobalInfo } from '@/state/base'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Search } = Input
export default function FrontTopbar(props: any) {
  const [loading, setLoading] = useState(false)
  return (
    <header className={styles.topbar}>
      <div
        className={styles['button-container']}
        onClick={() => {
          GlobalInfo.isLeftbarOpen = true
        }}
      >
        <MenuUnfoldOutlined className={styles['switch-button']} />
      </div>
      <Search
        className={styles.search}
        placeholder="input search loading default"
        loading={loading}
        onSearch={(value) => {
          
          console.log(value)
        }}
      />
    </header>
  )
}
