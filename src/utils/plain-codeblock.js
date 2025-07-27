import { Node } from '@tiptap/core'

const PlainCodeBlock = Node.create({
  name: 'plainCodeBlock',

  group: 'block',
  content: 'text*',
  marks: '',
  code: true,
  defining: true,

  addAttributes () {
    return {
      class: {
        default: 'w-fit px-4 py-2 rounded-[5px] text-sm font-mono bg-slate-700/25'
      }
    }
  },

  parseHTML () {
    return [
      {
        tag: 'pre[data-type="plain"]'
      }
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return [
      'pre',
      {
        ...HTMLAttributes,
        'data-type': 'plain',
        class: HTMLAttributes.class,
        spellcheck: false
      },
      ['code', 0]
    ]
  }
})

export default PlainCodeBlock
