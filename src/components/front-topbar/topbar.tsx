import { Select } from 'antd'
import styles from './topbar.module.scss'
import { GlobalInfo } from '@/state/base'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { GetBlogList } from '@/requests/blogs/blog'
import { serialize } from '@/views/front/blog/blog-card'
import { useEffect, useState } from 'react'
export default function FrontTopbar(props: any) {
  const navigate = useNavigate()
  const [value, setValue] = useState(null)
  const { data, loading, run } = useRequest(
    (data) =>
      GetBlogList({
        size: 10,
        page: 1,
        sort: 'desc',
        title: data,
        content: data,
        isFuzzy: true
      }),
    {
      manual: true
    }
  )
  useEffect(() => {
    value && run(value)
  }, [value])
  return (
    <header className={styles.topbar}>
      <div
        className={styles['button-container']}
        onClick={() => {
          GlobalInfo.isLeftbarOpen = true
        }}
      >
        <MenuUnfoldOutlined className={styles['switch-button']} />
      </div>
      <Select
        data-step="1" 
        data-intro="在这里可以搜索博客"
        showSearch
        value={value}
        className={styles.search}
        allowClear={true}
        defaultActiveFirstOption={true}
        suffixIcon={null}
        onChange={(id) => {
          if (!id) {
            setValue(null)
            data.data.result = []
          } else {
            navigate(`/front/blog/detail/${id}`)
          }
        }}
        placeholder="搜索博客"
        notFoundContent={null}
        filterOption={false}
        onSearch={(e) => {
          e && setValue(e)
        }}
        options={data?.data?.result?.map((d) => {
          return {
            value: d.id,
            label: d.title,
            content: d.content,
            title: d.title
          }
        })}
        optionRender={(option) => {
          return (
            <>
              <div>{option?.data?.title}</div>
              <div>{serialize(JSON.parse(option?.data?.content || '[]'))}</div>
            </>
          )
        }}
      />
    </header>
  )
}
