import { Transforms, createEditor, Descendant, BaseEditor } from 'slate'
import {
  ReactEditor,
  useFocused,
  useSelected,
  useSlateStatic
} from 'slate-react'
import { SlateButton } from './components'
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { RequestFileChunkUpload } from '@/requests/admin/files/file_chunk'
import { useState } from 'react'

export const insertImage = (
  editor: BaseEditor,
  url: string | ArrayBuffer | null
) => {
  const text = { text: '' }
  const image = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)
  //   Transforms.insertNodes(editor, {
  //     type: 'paragraph',
  //     children: [{ text: '' }]
  //   })
}
export const withImages = (editor: any) => {
  const { insertData, isVoid } = editor

  editor.isVoid = (element: any) => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = async (data: any) => {
    const text = data.getData('text/plain')
    const { files } = data

    if (files && files.length > 0) {
      const data = await RequestFileChunkUpload(files)
      for (const item of data) {
        insertImage(editor, item.data.url)
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}
const isImageUrl = (url) => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return imageExtensions.includes(ext)
}
export const InsertImageButton = () => {
  const editor = useSlateStatic()

  return (
    <SlateButton
      onMouseDown={(event) => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the image:')
        if (url && !isImageUrl(url)) {
          alert('URL is not an image')
          return
        }
        url && insertImage(editor, url)
      }}
      icon={'image'}
    ></SlateButton>
  )
}
export const Image = ({ attributes, children, element, ...props }: any) => {
  const editor = useSlateStatic()
  const path = ReactEditor.findPath(editor, element)
  const [showDelete, setShowDelete] = useState(false)

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
          src={element.url}
          className="block max-w-full max-h-[20em]"
          style={{
            boxShadow: showDelete ? '0 0 0 3px #B4D5FF' : 'none'
          }}
        />
        <Button
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          className={`absolute top-2 left-2 bg-white ${
            showDelete ? 'inline' : 'hidden'
          }`}
        >
          <DeleteOutlined />
        </Button>
      </span>
    </div>
  )
}
