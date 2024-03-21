import { GetPersonalInfoDetail } from '@/requests/personal/personal'
import { useRequest } from 'ahooks'
import styles from './personal.module.scss'
import { formatTime } from '@/utils/utils'
import ContentEditor from '@/components/editor/content-editor'
import FrontPersonalProject from './project'
import FrontPersonalExperience from './experience'

export default function FrontPersonal() {
  const { data, run } = useRequest(() =>
    GetPersonalInfoDetail({ increase: true })
  )
  const {
    birthday,
    content,
    githubName,
    githubUrl,
    home,
    name,
    sex,
    qq,
    wechat,
    university,
    universityEndTime,
    visitedCount,
    createdTime,
    lastModifiedTime,
    projects,
    experiences
  } = data?.data || {}
  console.log(projects?.result?.length);
  
  return (
    <div className={styles['personal-container']}>
      <div className={styles.title}>关于我</div>
      <div className={styles['common-item']}>姓名：{name}</div>
      <div className={styles['common-item']}>性别：{sex}</div>
      <div className={styles['common-item']}>
        生日：{formatTime(birthday, false)}
      </div>
      <div className={styles['common-item']}>微信：{wechat}</div>
      <div className={styles['common-item']}>QQ：{qq}</div>
      <div className={styles['common-item']}>GitHub：{githubName}</div>
      <div className={styles['common-item']}>GitHub链接：{githubUrl}</div>
      <div className={styles['common-item']}>家乡：{home}</div>
      <div className={styles['common-item']}>最高学历：{university}</div>
      <div className={styles['common-item']}>
        毕业时间：{formatTime(universityEndTime, false)}
      </div>
      <div className={styles.content}>
        <div className={styles.title}>自述：</div>
        <ContentEditor value={content} type={'detail'} />
      </div>
      <div className={styles.title}>个人项目：</div>
      <div className={styles['project-container']}>
        {projects &&
          projects?.result?.map((item: any) => (
            <FrontPersonalProject data={item} />
          ))}
      </div>
      <div className={styles.title}>个人经历：</div>
      <div className={styles['experience-container']}>
      {experiences &&
          experiences?.result?.map((item: any) => (
            <FrontPersonalExperience data={item} />
          ))}
      </div>
    </div>
  )
}
