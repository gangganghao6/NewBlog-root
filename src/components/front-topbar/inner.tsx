import { useLocation } from 'react-router-dom'
import styles from './inner.module.scss'
import FrontRightbar from './rightbar'
export default function Inner(props: any) {
  const location = useLocation()
  return (
    <div className={styles.inner}  data-step="5" data-intro="愉快地玩耍吧！">
      <div className={styles['inner-border']}>
        {props.children}
      </div>
      {/* {location.pathname !== '/front/chat' && <FrontRightbar isOuter={false} />} */}
    </div>
  )
}
