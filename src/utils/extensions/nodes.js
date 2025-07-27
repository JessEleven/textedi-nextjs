import {
  BlockquoteIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  H4Icon,
  IndentDescreaseIcon,
  IndentIncreaseIcon,
  ListIcon,
  ListNumbersIcon,
  PilcrowIcon,
  PlaylistAddIcon,
  SourceCodeIcon
} from '@/app/(protected)/assets/menu-bar-icons'

// Heading
export const getHeandig = (editor) => [
  {
    label: 'H1',
    action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => editor.isActive('heading', { level: 1 }),
    icon: <H1Icon />
  },
  {
    label: 'H2',
    action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => editor.isActive('heading', { level: 2 }),
    icon: <H2Icon />
  },
  {
    label: 'H3',
    action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: () => editor.isActive('heading', { level: 3 }),
    icon: <H3Icon />
  },
  {
    label: 'H4',
    action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    isActive: () => editor.isActive('heading', { level: 4 }),
    icon: <H4Icon />
  }
]

// Nodes Paragraph, CodeBlock, CodeBlock Lowlight, Blockquote
export const getNodes = (editor) => [
  {
    label: 'Paragraph',
    action: () => editor.chain().focus().setParagraph().run(),
    isActive: () => editor.isActive('paragraph'),
    icon: <PilcrowIcon />
  },
  {
    label: 'Quote',
    action: () => editor.chain().focus().toggleBlockquote().run(),
    isActive: () => editor.isActive('blockquote'),
    icon: <BlockquoteIcon />
  },
  {
    label: 'CodeBlock',
    action: () => editor.chain().focus().toggleNode('plainCodeBlock', 'paragraph').run(),
    isActive: () => editor.isActive('plainCodeBlock'),
    icon: <SourceCodeIcon />
  },
  {
    label: 'CodeBlockLowlight',
    action: () => editor.chain().focus().toggleCodeBlock().run(),
    isActive: () => editor.isActive('codeBlock'),
    icon: <SourceCodeIcon className='text-indigo-500' />
  }
]

// BulletList
export const getBulletList = (editor) => [
  {
    label: 'ToggleBulletList',
    action: () => editor.chain().focus().toggleBulletList().run(),
    isActive: () => editor.isActive('bulletList'),
    icon: <ListIcon />
  },
  {
    label: 'OrderedList',
    action: () => editor.chain().focus().toggleOrderedList().run(),
    isActive: () => editor.isActive('orderedList'),
    icon: <ListNumbersIcon />
  },
  {
    label: 'SplitListItem',
    action: () => editor.chain().focus().splitListItem('listItem').run(),
    disabled: !editor.can().splitListItem('listItem'),
    icon: <PlaylistAddIcon />
  },
  {
    label: 'SinkLisItem',
    action: () => editor.chain().focus().sinkListItem('listItem').run(),
    disabled: !editor.can().sinkListItem('listItem'),
    icon: <IndentIncreaseIcon />
  },
  {
    label: 'LiftListItem',
    action: () => editor.chain().focus().liftListItem('listItem').run(),
    disabled: !editor.can().liftListItem('listItem'),
    icon: <IndentDescreaseIcon />
  }
]

// Bleeding
export const getBleeding = (editor) => [
  {
    label: 'SinkLisItem',
    action: () => editor.chain().focus().sinkListItem('listItem').run(),
    disabled: !editor.can().sinkListItem('listItem'),
    icon: <IndentIncreaseIcon />
  },
  {
    label: 'LiftListItem',
    action: () => editor.chain().focus().liftListItem('listItem').run(),
    disabled: !editor.can().liftListItem('listItem'),
    icon: <IndentDescreaseIcon />
  }
]
