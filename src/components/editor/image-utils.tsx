import { Transforms, createEditor, Descendant, BaseEditor } from 'slate'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { SlateButton } from './components'
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'
import { Button, Input, Modal, message, Image as AntdImage } from 'antd'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { PostFileChunkUpload } from '@/requests/admin/files/file_chunk'
import { useState } from 'react'
import styles from './editor.module.scss'

export const withImages = (editor: any) => {
  const { insertData, isVoid } = editor

  editor.isVoid = (element: any) => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = async (data: any) => {
    const text = data.getData('text/plain')
    const { files } = data

    if (files && files.length > 0) {
      const data = await PostFileChunkUpload(files)
      for (const item of data) {
        insertImage(editor, item.data)
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, { url: text })
    } else {
      insertData(data)
    }
  }

  return editor
}
export const insertImage = (
  editor: BaseEditor,
  data: { url: string; name?: string; compressUrl?: string }
) => {
  const text = { text: '' }
  const image = { type: 'image', data, children: [text] }
  Transforms.insertNodes(editor, image)
  Transforms.insertNodes(editor, {
    type: 'paragraph',
    children: [{ text: '' }]
  })
}
const isImageUrl = (url: string) => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return imageExtensions.includes(ext)
}
export const InsertImageButton = () => {
  const editor = useSlateStatic()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [url, setUrl] = useState('')
  const handleOk = () => {
    if (url && !isImageUrl(url)) {
      message.error('URL不是图片链接')
    } else if (url) {
      insertImage(editor, { url })
      setIsModalOpen(false)
      setUrl('')
      message.success('插入成功')
    }
  }
  return (
    <>
      <Modal
        title="插入图片"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText={'确定'}
        cancelText={'取消'}
        className={styles['insert-image-modal']}
      >
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-4/5 my-1"
          placeholder="请输入图片URL链接"
        />
      </Modal>
      <SlateButton
        onClick={() => setIsModalOpen(true)}
        icon={'image'}
      ></SlateButton>
    </>
  )
}
export const Image = ({
  attributes,
  children,
  element,
  showImageDeleteButton,
  ...props
}: any) => {
  const editor = useSlateStatic()
  const path = ReactEditor.findPath(editor, element)
  const [showDelete, setShowDelete] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const {
    data: { url, name, compressUrl }
  } = element

  return (
    <div
      {...attributes}
      {...props}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      {children}
      <span contentEditable={false} className="relative inline-block">
        <img
          src={url}
          className="block max-w-full max-h-[20em]"
          style={{
            boxShadow: showDelete ? '0 0 0 1px #B4D5FF' : 'none'
          }}
        />
        <div className="text-center">{name}</div>
        <div className="text-[0px]">
          <AntdImage
            src={url}
            className="hidden"
            preview={{
              visible: showPreview,
              onVisibleChange: () => setShowPreview(false)
            }}
          ></AntdImage>
        </div>
        {showImageDeleteButton && (
          <Button
            onClick={() => Transforms.removeNodes(editor, { at: path })}
            className={`absolute top-2 left-2 bg-white ${
              showDelete ? 'inline' : 'hidden'
            }`}
          >
            <DeleteOutlined />
          </Button>
        )}
        <Button
          onClick={() => setShowPreview(!showPreview)}
          className={`absolute top-2 right-2 bg-white ${
            showDelete ? 'inline' : 'hidden'
          }`}
        >
          <EyeOutlined />
        </Button>
      </span>
    </div>
  )
}
