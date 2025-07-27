import {
  BoldIcon,
  CodeIcon,
  HighlightIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon
} from '@/app/(protected)/assets/menu-bar-icons'

// Inline formatting
export const getInlineFormatting = (editor) => [
  {
    label: 'Bold',
    action: () => editor.chain().focus().toggleBold().run(),
    isActive: () => editor.isActive('bold'),
    icon: <BoldIcon />
  },
  {
    label: 'Italic',
    action: () => editor.chain().focus().toggleItalic().run(),
    isActive: () => editor.isActive('italic'),
    icon: <ItalicIcon />
  },
  {
    label: 'Underline',
    action: () => editor.chain().focus().toggleUnderline().run(),
    isActive: () => editor.isActive('underline'),
    icon: <UnderlineIcon />
  },
  {
    label: 'Strike',
    action: () => editor.chain().focus().toggleStrike().run(),
    isActive: () => editor.isActive('strike'),
    icon: <StrikethroughIcon />
  },
  {
    label: 'Code',
    action: () => editor.chain().focus().toggleCode().run(),
    isActive: () => editor.isActive('code'),
    icon: <CodeIcon />
  }
]

// Highlight
export const getHighlight = (editor) => [
  {
    label: 'Highlight',
    action: () => editor.chain().focus().toggleHighlight().run(),
    isActive: () => editor.isActive('highlight'),
    icon: <HighlightIcon />
  }
]
