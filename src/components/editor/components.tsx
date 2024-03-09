import React, { Ref, useMemo } from 'react'
import clsx from 'clsx'
import { Button, Popover, Tooltip } from 'antd'
// import { blue } from '@ant-design/colors'
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  CodeOutlined,
  CodeSandboxOutlined,
  DeleteOutlined,
  FileImageOutlined,
  ItalicOutlined,
  MenuOutlined,
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
    const Map = useMemo(() => {
      const style = { color: active ? 'white' : 'black' }
      return {
        format_bold: {
          element: <BoldOutlined style={style} />,
          title: '加粗'
        },
        format_italic: {
          element: <ItalicOutlined style={style} />,
          title: '斜体'
        },
        format_underlined: {
          element: <UnderlineOutlined style={style} />,
          title: '下划线'
        },
        code: {
          element: <CodeSandboxOutlined style={style} />,
          title: '代码行'
        },
        looks_one: {
          element: <span style={style}>Ⅰ</span>,
          title: '一号字体'
        },
        looks_two: {
          element: <span style={style}>Ⅱ</span>,
          title: '二号字体'
        },
        format_quote: {
          element: <span style={style}>“</span>,
          title: '引用'
        },
        format_list_numbered: {
          element: <OrderedListOutlined style={style} />,
          title: '有序列表'
        },
        format_list_bulleted: {
          element: <UnorderedListOutlined style={style} />,
          title: '无序列表'
        },
        format_align_left: {
          element: <AlignLeftOutlined style={style} />,
          title: '左对齐'
        },
        format_align_center: {
          element: <AlignCenterOutlined style={style} />,
          title: '居中'
        },
        format_align_right: {
          element: <AlignRightOutlined style={style} />,
          title: '右对齐'
        },
        format_align_justify: {
          element: <MenuOutlined style={style} />,
          title: '两端对齐'
        },
        image: {
          element: <FileImageOutlined style={style} />,
          title: '插入图片（推荐直接粘贴图片）'
        },
        undo: {
          element: <UndoOutlined style={style} />,
          title: '撤销'
        },
        code_block: {
          element: <CodeOutlined style={style} />,
          title: '代码块'
        },
        delete_code_block: {
          element: <DeleteOutlined style={style}/>,
          title: '删除代码行（谨慎使用）'
        }
      }
    }, [active])

    return (
      <Tooltip title={Map[icon]?.title}>
        <Button
          shape="round"
          type={active ? 'primary' : 'default'}
          ref={ref}
          {...props}
          className={clsx(className, 'cursor-pointer mr-1 mb-1')}
        >
          {Map[icon]?.element || <>{children}</>}
        </Button>
      </Tooltip>
    )
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
