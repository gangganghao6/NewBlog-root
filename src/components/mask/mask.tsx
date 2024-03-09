import { GlobalInfo } from '@/state/base'
import clsx from 'clsx'
import styles from './mask.module.scss'
import { useState, useEffect } from 'react'
import { useSnapshot } from 'valtio'


export default function Mask(props: any) {
  const state = useSnapshot(GlobalInfo)
  const [maskShow, setMaskShow] = useState(false)
  useEffect(() => {
    if (state.isLeftbarOpen) {
      setMaskShow(true)
    }
  }, [state.isLeftbarOpen])
  return (
    <div
      className={clsx(styles.mask, {
        [styles.show]: state.isLeftbarOpen,
        [styles.hidden]: !state.isLeftbarOpen
      })}
      style={{ zIndex: maskShow ? 10 : -1 }}
      onClick={() => {
        GlobalInfo.isLeftbarOpen = false
      }}
      onTransitionEnd={() => {
        if (!state.isLeftbarOpen) {
          setMaskShow(false)
        }
      }}
    ></div>
  )
}
