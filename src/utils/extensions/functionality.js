import {
  AlignCenterIcon,
  AlignJustifiedIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ArrowBackUpIcon,
  ArrowForwardUpIcon
} from '@/app/(protected)/assets/menu-bar-icons'

// TextAlign
export const getTextAlign = (editor) => [
  {
    label: 'left',
    action: () => editor.chain().focus().setTextAlign('left').run(),
    isActive: () => editor.isActive('paragraph', { textAlign: 'left' }),
    icon: <AlignLeftIcon />
  },
  {
    label: 'center',
    action: () => editor.chain().focus().setTextAlign('center').run(),
    isActive: () => editor.isActive('paragraph', { textAlign: 'center' }),
    icon: <AlignCenterIcon />
  },
  {
    label: 'right',
    action: () => editor.chain().focus().setTextAlign('right').run(),
    isActive: () => editor.isActive('paragraph', { textAlign: 'right' }),
    icon: <AlignRightIcon />
  },
  {
    label: 'justify',
    action: () => editor.chain().focus().setTextAlign('justify').run(),
    isActive: () => editor.isActive('paragraph', { textAlign: 'justify' }),
    icon: <AlignJustifiedIcon />
  }
]

// Undo/Redo
export const getUndoRedo = (editor, hasEdited) => [
  {
    label: 'Undo',
    action: () => editor.chain().focus().undo().run(),
    disabled: !hasEdited || !editor?.can().undo(),
    icon: <ArrowBackUpIcon />
  },
  {
    label: 'Redo',
    action: () => editor.chain().focus().redo().run(),
    disabled: !editor.can().redo(),
    icon: <ArrowForwardUpIcon />
  }
]
