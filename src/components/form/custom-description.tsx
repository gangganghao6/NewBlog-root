import { Descriptions } from 'antd'


export const CustomDescription = ({ data, columns }: any) => {
  const items = columns.map((item) => {
    return {
      label: item.label,
      children: item.render ? item.render(data[item.key]) : data[item.key]
    }
  })

  return (
    <Descriptions
      className="my-8 px-4"
      bordered
      title="基本信息"
      items={items}
    />
  )
}
