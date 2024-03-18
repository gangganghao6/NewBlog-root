import ShareFilePng from '@/asserts/sharefile.png'
import styles from './sharefile.module.scss'
import { useState } from 'react'
import { useRequest } from 'ahooks'
import { GetRandomShareFile } from '@/requests/share_files/share_file'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export default function ShareFile(props: any) {
  const [currentFile, setCurrentFile] = useState({} as any)
  const { data, loading, run } = useRequest(GetRandomShareFile)

  return (
    <div className={styles.sharefile}>
      <div className={styles['left-right']}>
        <div className={styles.button} onClick={run}>
          <Button type="text" shape="circle" icon={<CaretLeftOutlined />} className='w-4'/>
        </div>
      </div>
      <div className={styles.center}>
        <img src={ShareFilePng} alt="sharefile" />
        <div className={styles['file-name']}>{data?.data[0]?.name}</div>
      </div>
      <div className={styles['left-right']}>
        <div className={styles.button} onClick={run}>
          <Button type="text" shape="circle" icon={<CaretRightOutlined />} />
        </div>
      </div>
    </div>
  )
}
