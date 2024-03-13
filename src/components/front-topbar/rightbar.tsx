import clsx from 'clsx'
import styles from './rightbar.module.scss'
export default function Rightbar({ isOuter }: any) {
  return <div className={clsx(styles.rightbar,{
    [styles.switch1]: isOuter,
    [styles.switch2]: !isOuter
  })}>rightbar</div>
}
