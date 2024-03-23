import {
  EyeOutlined,
  ForkOutlined,
  GithubOutlined,
  StarOutlined
} from '@ant-design/icons'
import styles from './github-card.module.scss'
import { Tag } from 'antd'
import { formatTime } from '@/utils/utils'
const getColor = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  Python: '#3572A5',
  Shell: '#89e051',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#2c3e50',
  Go: '#00ADD8',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  Rust: '#dea584',
  Vue: '#178600',
  React: '#61dafb',
  Angular: '#dd0031',
  Node: '#215732',
  Dart: '#00B4AB',
  Flutter: '#02569B',
  Sass: '#c6538c',
  Less: '#1d365d',
  Stylus: '#ff6347',
  EJS: '#a91e50'
}

export default function GithubCard({ data }: any) {
  return (
    <div
      className={styles.github}
      onClick={() => {
        window.open(data?.pageUrl, '_blank')
      }}
    >
      <div className={styles['title-container']}>
        <GithubOutlined className="mx-3" />
        <div className={styles.title}>{data?.title}</div>
        {data?.languages && (
          <Tag color={getColor[data?.languages]} className="ml-2">
            {data?.languages}
          </Tag>
        )}
      </div>
      <div className={styles['content-container']}>
        <div className={styles.content}>{data?.description}</div>
      </div>
      <div className={styles['footer-container']}>
        <div className={styles['group-container']}>
          <div className={styles.footer}>
            <StarOutlined className="mr-1" />
            {data?.starsCount + ' '}
            Stars
          </div>
          <div className={styles.footer}>
            <EyeOutlined className="mr-1" />
            {data?.watchersCount + ' '}
            Watchers
          </div>
          <div className={styles.footer}>
            <ForkOutlined className="mr-1" />
            {data?.forksCount + ' '}
            Forks
          </div>
        </div>
        <div className={styles['group-container']}>
          <div className={styles.footer}>
            创建时间:
            {formatTime(data?.createdTime, false)}
          </div>
          <div className={styles.footer}>
            最后更新:
            {formatTime(data?.lastModifiedTime, false)}
          </div>
        </div>
      </div>
    </div>
  )
}
