import clsx from 'clsx'
import styles from './rightbar.module.scss'
import RecommentComments from '@/components/recomment-comments'
import SummaryInfo from '@/components/summary-info'
import TagsShow from '@/components/tags-show'
export default function Rightbar({}: any) {
  return (
    <div className={clsx(styles.rightbar)}>
      <RecommentComments />
      <SummaryInfo />
      <TagsShow />
    </div>
  )
}
