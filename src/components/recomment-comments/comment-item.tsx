import { Avatar, List } from 'antd'
import styles from './comment-item.module.scss'
import sliceEmail from '@/components/comment/slice-email'
import clsx from 'clsx'
export default function RecommendCommentItem({ item }: any) {
  return (
    <div className={styles['item-container']}>
      <List>
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar>{item?.user?.name?.slice(0, 1)}</Avatar>}
            title={
              <div className={styles['title-container']}>
                <div className={clsx(styles.name)}>{item?.user?.name}</div>
                <div className="font-light text-[13px]">
                  {sliceEmail(item?.user?.email)}
                </div>
              </div>
            }
            description={
              <div className={clsx('flex flex-col', styles['title-container'])}>
                <div className={clsx(styles.name)}>{item?.comment}</div>
              </div>
            }
          />
        </List.Item>
      </List>
    </div>
  )
}
