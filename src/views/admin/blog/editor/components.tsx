import React, { ReactNode, Ref, PropsWithChildren } from 'react'
import clsx from 'clsx'
import { Button } from 'antd'
// import { blue } from '@ant-design/colors'
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  CodeOutlined,
  FileImageOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  UnderlineOutlined,
  UndoOutlined,
  UnorderedListOutlined
} from '@ant-design/icons'

export const SlateButton = React.forwardRef(
  (
    { className, active, reversed, children, icon, ...props }: any,
    ref: Ref<any>
  ) => {
    return (
      <Button
        shape="round"
        type={active ? 'primary' : 'default'}
        ref={ref}
        {...props}
        className={clsx(className, 'cursor-pointer mr-1 mb-1')}
      >
        <Icon active={active}>{icon}</Icon>
      </Button>
    )
  }
)

export const Icon = React.forwardRef(
  ({ className, children, active }: any, ref: Ref<any>) => {
    const style = { color: active ? 'white' : 'black' }
    const Map = {
      format_bold: <BoldOutlined className={className} style={style} />,
      format_italic: <ItalicOutlined className={className} style={style} />,
      format_underlined: (
        <UnderlineOutlined className={className} style={style} />
      ),
      code: <CodeOutlined className={className} style={style} />,
      looks_one: (
        <span className={className} style={style}>
          1号
        </span>
      ),
      looks_two: (
        <span className={className} style={style}>
          2号
        </span>
      ),
      format_quote: (
        <span className={className} style={style}>
          引用
        </span>
      ),
      format_list_numbered: (
        <OrderedListOutlined className={className} style={style} />
      ),
      format_list_bulleted: (
        <UnorderedListOutlined className={className} style={style} />
      ),
      format_align_left: (
        <AlignLeftOutlined className={className} style={style} />
      ),
      format_align_center: (
        <AlignCenterOutlined className={className} style={style} />
      ),
      format_align_right: (
        <AlignRightOutlined className={className} style={style} />
      ),
      format_align_justify: (
        <span className={className} style={style}>
          两端对齐
        </span>
      ),
      image: <FileImageOutlined className={className} style={style} />,
      undo: <UndoOutlined className={className} style={style} />
    }

    return Map[children] || <>{children}</>
  }
)

export const Toolbar = React.forwardRef(
  ({ className, ...props }: any, ref: Ref<any>) => (
    <div
      data-test-id="menu"
      {...props}
      ref={ref}
      className={clsx(className, 'sticky top-0 z-10')}
    />
  )
)
