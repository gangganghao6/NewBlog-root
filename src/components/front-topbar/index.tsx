import FrontTopbar from './topbar'
import FrontLeftbar from './leftbar'
import FrontRightbar from './rightbar'
import FrontInner from './inner'
import styles from './index.module.scss'
import FrontFooter from '../front-footer/front-footer'

export default function FrontIndex(props: any) {
  return (
    <div className={styles.main}>
      <FrontTopbar />
      <FrontLeftbar />
      <main className={styles.content}>
        <FrontInner>{props.children}</FrontInner>
        <FrontRightbar isOuter={true} />
        <FrontFooter />
      </main>
    </div>
  )
}
