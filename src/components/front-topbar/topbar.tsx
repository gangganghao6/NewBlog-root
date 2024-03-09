import { Button } from 'antd'
import styles from './topbar.module.scss'
import { GlobalInfo } from '@/state/base'
export default function FrontTopbar(props: any) {
  return (
    <header className={styles.topbar}>
      <Button
        type="primary"
        className={styles['switch-button']}
        onClick={() => {
          GlobalInfo.isLeftbarOpen = true
        }}
      >
        Primary Button
      </Button>
    </header>
  )
}
