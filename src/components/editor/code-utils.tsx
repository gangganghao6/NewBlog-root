import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-css'
import { useCallback } from 'react'
import { Node, Editor, Range, Element, Transforms, NodeEntry } from 'slate'
import { useSlate, useSlateStatic } from 'slate-react'
import { normalizeTokens } from './normalize-tokens'
import { SlateButton } from './components'
import { Select } from 'antd'
import styles from './image-utils.module.scss'
import '@/asserts/prism-one-dark.css'
// import './code-style.css'
import clsx from 'clsx'
const { Option } = Select

const ParagraphType = 'paragraph'
const CodeBlockType = 'code-block'
const CodeLineType = 'code-line'

export const CodeBlockButton = (props) => {
  const editor = useSlateStatic()
  const handleClick = () => {
    Transforms.wrapNodes(
      editor,
      { type: CodeBlockType, language: 'html', children: [{ text: '' }] },
      {
        match: (n) => Element.isElement(n) && n.type === ParagraphType,
        split: true
      }
    )
    Transforms.setNodes(
      editor,
      { type: CodeLineType },
      { match: (n) => Element.isElement(n) && n.type === ParagraphType }
    )
  }

  return (
    <SlateButton
      {...props}
      data-test-id="code-block-button"
      onMouseDown={(event) => {
        event.preventDefault()
        handleClick()
      }}
      icon={'code_block'}
    ></SlateButton>
  )
}

export const useDecorate = (editor: Editor) => {
  return useCallback(
    ([node, path]) => {
      if (Element.isElement(node) && node.type === CodeLineType) {
        const ranges = editor.nodeToDecorations?.get(node) || []
        return ranges
      }

      return []
    },
    [editor.nodeToDecorations]
  )
}

const getChildNodeToDecorations = ([block, blockPath]: NodeEntry<any>) => {
  const nodeToDecorations = new Map<Element, Range[]>()

  const text = block.children.map((line) => Node.string(line)).join('\n')
  const language = block.language

  const tokens = Prism.tokenize(text, Prism.languages[language])
  const normalizedTokens = normalizeTokens(tokens) // make tokens flat and grouped by line
  const blockChildren = block.children as Element[]

  for (let index = 0; index < normalizedTokens.length; index++) {
    const tokens = normalizedTokens[index]
    const element = blockChildren[index]

    if (!nodeToDecorations.has(element)) {
      nodeToDecorations.set(element, [])
    }

    let start = 0
    for (const token of tokens) {
      const length = token.content.length
      if (!length) {
        continue
      }

      const end = start + length

      const path = [...blockPath, index, 0]
      const range = {
        anchor: { path, offset: start },
        focus: { path, offset: end },
        token: true,
        ...Object.fromEntries(token.types.map((type) => [type, true]))
      }

      nodeToDecorations.get(element)!.push(range)

      start = end
    }
  }

  return nodeToDecorations
}

// precalculate editor.nodeToDecorations map to use it inside decorate function then
export const SetNodeToDecorations = () => {
  const editor = useSlate()

  const blockEntries = Array.from(
    Editor.nodes(editor, {
      at: [],
      mode: 'highest',
      match: (n) => Element.isElement(n) && n.type === CodeBlockType
    })
  )

  const nodeToDecorations = mergeMaps(
    ...blockEntries.map(getChildNodeToDecorations)
  )
  editor.nodeToDecorations = nodeToDecorations

  return null
}

export const LanguageSelect = (props: any) => {
  return (
    <Select
      data-test-id="language-select"
      className={clsx(
        'absolute right-1 top-1 z-10 w-1 h-7',
        styles['languageselect']
      )}
      {...props}
    >
      <Option value="css">CSS</Option>
      <Option value="html">HTML</Option>
      <Option value="java">Java</Option>
      <Option value="javascript">JavaScript</Option>
      <Option value="jsx">JSX</Option>
      <Option value="markdown">Markdown</Option>
      <Option value="php">PHP</Option>
      <Option value="python">Python</Option>
      <Option value="sql">SQL</Option>
      <Option value="tsx">TSX</Option>
      <Option value="typescript">TypeScript</Option>
    </Select>
  )
}

const mergeMaps = <K, V>(...maps: Map<K, V>[]) => {
  const map = new Map<K, V>()

  for (const m of maps) {
    for (const item of m) {
      map.set(...item)
    }
  }

  return map
}

const toChildren = (content: string) => [{ text: content }]
const toCodeLines = (content: string): Element[] =>
  content
    .split('\n')
    .map((line) => ({ type: CodeLineType, children: toChildren(line) }))
