import styles from './inner.module.scss'
export default function Inner(props: any) {
  return <div className={styles.inner}>{props.children}</div>
}
