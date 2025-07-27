'use client'

import { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import MenuBar from './menu-bar'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import PlainCodeBlock from '@/utils/plain-codeblock'
import { all, createLowlight } from 'lowlight'
import 'highlight.js/styles/github-dark.css'

export default function TipTap ({ value, onChange, hasEdited, initialContent }) {
  const [, setUpdate] = useState(0)

  const lowlight = createLowlight(all)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        bulletList: {},
        orderedList: {},
        listItem: {},
        codeBlock: false,
        code: {
          HTMLAttributes: {
            class: ' px-4 py-2 rounded-[5px] text-sm font-mono bg-slate-700/25 text-amber-400',
            spellcheck: 'false'
          }
        }
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight,
      Underline,
      Placeholder.configure({
        placeholder: 'Start writing...',
        emptyEditorClass: 'is-editor-empty'
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'w-fit px-4 py-2 rounded-[5px] text-sm font-mono bg-slate-700/25',
          spellcheck: 'false'
        }
      }).extend({
        parseHTML () {
          return [
            {
              tag: 'pre:not([data-type="plain"])'
            }
          ]
        }
      }),
      PlainCodeBlock
    ],
    autofocus: true,
    editable: true,
    content: initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
    },
    onSelectionUpdate: () => {
      // Force a render to update active buttons (TextAlign)
      setUpdate((prev) => prev + 1)
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none mt-2 px-4 mb-8 outline-none text-neutral-50'
      }
    },
    // Avoids rendering issues in SSR
    immediatelyRender: false
  })

  /**
   * If the value changes externally (when you load it),
   * you apply it to the editor
   */
  useEffect(() => {
    if (!editor) return

    const currentHTML = editor.getHTML()
    if (value && value !== currentHTML) {
      editor.commands.setContent(value, false, 'html')
      editor.view.dispatch(
        editor.state.tr.setMeta('addToHistory', true)
      )
    }
  }, [value, editor])

  if (!editor) {
    return null
  }

  return (
    <>
      <MenuBar editor={editor} hasEdited={hasEdited} />
      <EditorContent editor={editor} />
    </>
  )
}
