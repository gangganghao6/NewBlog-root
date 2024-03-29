import { Button } from 'antd'
import styles from './front-footer.module.scss'
export default function FrontFooter() {
  return (
    <div className={styles['footer-container']}>
      <div className={styles.copyright}>© 2024 All rights reserved.</div>
      <div className={styles.link}>京ICP备17006801号-2</div>
    </div>
  )
}
