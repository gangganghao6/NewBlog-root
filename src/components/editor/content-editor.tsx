import { useCallback, useEffect, useMemo } from 'react'
import isHotkey from 'is-hotkey'
import {
  Editable,
  withReact,
  useSlate,
  Slate,
  ReactEditor,
  useSlateStatic
} from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
  BaseEditor,
  Node
} from 'slate'
import { withHistory } from 'slate-history'
import { InsertImageButton, withImages, Image } from './image-utils'
import {
  CodeBlockButton,
  LanguageSelect,
  SetNodeToDecorations,
  useDecorate
} from './code-utils'
import { SlateButton, Toolbar } from './components'
import clsx from 'clsx'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code'
}

const LIST_TYPES = ['numbered-list', 'bulleted-list', 'code-block']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

export default function RichTextWarpper(props) {
  const { value, type } = props
  switch (type) {
    case 'create':
      return <RichText {...props} readOnly={false} />
    case 'edit':
      return value !== undefined && <RichText {...props} readOnly={false} />
    case 'detail':
      return value ? (
        <RichText {...props} readOnly={true} showImageDeleteButton={false} />
      ) : (
        '加载中'
      )
  }
}

function RichText({
  value,
  onChange,
  readOnly = false,
  className,
  showImageDeleteButton = true
}: any) {
  const renderElement = useCallback((props: any) => <Element {...props} />, [])
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, [])
  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  )
  const decorate = useDecorate(editor)

  return (
    <>
      <Slate
        editor={editor}
        initialValue={value ? JSON.parse(value) : initialValue}
        onChange={(e) => onChange?.(JSON.stringify(e))}
      >
        <Toolbar
          className={clsx({
            hidden: readOnly
          })}
        >
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <BlockButton format="heading-one" icon="looks_one" />
          <BlockButton format="heading-two" icon="looks_two" />
          <BlockButton format="block-quote" icon="format_quote" />
          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />
          <BlockButton format="left" icon="format_align_left" />
          <BlockButton format="center" icon="format_align_center" />
          <BlockButton format="right" icon="format_align_right" />
          <BlockButton format="justify" icon="format_align_justify" />
          <MarkButton format="code" icon="code" />
          <CodeBlockButton />
          <InsertImageButton />
          <SlateButton
            icon={'undo'}
            onClick={() => editor.undo(editor)}
          ></SlateButton>
        </Toolbar>
        <SetNodeToDecorations />
        <Editable
          decorate={decorate}
          renderElement={(props) =>
            renderElement({ showImageDeleteButton, ...props })
          }
          renderLeaf={renderLeaf}
          placeholder="在这里输入"
          className={clsx('focus:outline-dotted text-[15px]', className)}
          readOnly={readOnly}
          onKeyDown={(event) => {
            if (isHotkey('tab', event)) {
              event.preventDefault()
              Editor.insertText(editor, '  ')
            } else {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as any)) {
                  event.preventDefault()
                  const mark = HOTKEYS[hotkey]
                  toggleMark(editor, mark)
                }
              }
            }
          }}
        />
        {/* <style>{prismThemeCss}</style> */}
      </Slate>
    </>
  )
}
const toggleBlock = (editor: BaseEditor, format: string) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true
  })
  let newProperties: Partial<SlateElement>
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format
    }
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (
  editor: BaseEditor,
  format: string,
  blockType = 'type'
) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => {
        return (
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n[blockType] === format
        )
      }
    })
  )

  return !!match
}

const isMarkActive = (editor: BaseEditor, format: string | number) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = (props: any) => {
  const { attributes, children, element } = props
  const editor = useSlateStatic()
  const style = { textAlign: element.align }

  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
    case 'image':
      return <Image style={style} {...props} />
    case 'code-block': {
      const setLanguage = (language: string) => {
        const path = ReactEditor.findPath(editor, element)
        Transforms.setNodes(editor, { language }, { at: path })
      }
      return (
        <div
          {...attributes}
          className="font-mono mb- text-sm leading-5 bg-[#F7F8F9] py-1 px-3 relative"
          spellCheck={false}
        >
          <LanguageSelect value={element.language} onChange={setLanguage} />
          {children}
        </div>
      )
    }
    case 'code-line':
      return (
        <div {...attributes} className="relative my-1">
          {children}
        </div>
      )
    default:
      return (
        <p style={style} {...props}>
          {children}
        </p>
      )
  }
}

const Leaf = ({ attributes, children, leaf }: any) => {
  const { text, ...rest } = leaf
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }
  return (
    <span {...attributes} className={Object.keys(rest).join(' ')}>
      {children}
    </span>
  )
}

const BlockButton = ({ format, icon }: any) => {
  const editor = useSlate()
  return (
    <SlateButton
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
      icon={icon}
    ></SlateButton>
  )
}

const MarkButton = ({ format, icon }: any) => {
  const editor = useSlate()
  return (
    <SlateButton
      active={isMarkActive(editor, format)}
      onMouseDown={(event: Event) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
      icon={icon}
    ></SlateButton>
  )
}
const serialize = (value) => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map((n) => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join('\n')
  )
}
const initialValue = [
  { type: 'paragraph', align: 'left', children: [{ text: '' }] }
]
