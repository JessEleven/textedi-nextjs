'use client'

import { useMemo, useState } from 'react'
import { getTextAlign, getUndoRedo } from '@/utils/extensions/functionality'
import { getInlineFormatting } from '@/utils/extensions/marks'
import { getBleeding, getBulletList, getHeandig, getNodes } from '@/utils/extensions/nodes'
import { AlignLeftIcon, HIcon, ListIcon } from '../../assets/menu-bar-icons'

export default function MenuBar ({ editor, hasEdited }) {
  const [text, setText] = useState(false)
  const [heading, setHeading] = useState(false)
  const [bulletList, setBulletList] = useState(false)

  // Nodes
  const h = useMemo(() => getHeandig(editor), [editor])
  const nodes = getNodes(editor)
  const bL = useMemo(() => getBulletList(editor), [editor])
  const bleeding = getBleeding(editor)

  // Marks
  const inlineFormatting = getInlineFormatting(editor)

  // Functionality
  const textAlign = getTextAlign(editor)
  const undoRedo = getUndoRedo(editor, hasEdited)

  const baseClass = 'p-2 rounded-[5px] cursor-pointer'
  const activeClass = 'bg-fuchsia-500/30'
  const inactiveClass = 'bg-neutral-500/15 transition-colors duration-300 ease-in-out'

  const getClass = (isActive) => `${baseClass} ${isActive ? activeClass : inactiveClass}`

  return (
    <div className='mt-2 mb-[50px]'>
      <div className='flex justify-center gap-x-1.5 divide-x divide-neutral-600'>

        {/* Undo/Redo options */}
        <div className='flex gap-x-1.5 pr-1.5'>
          {undoRedo?.map(({ label, action, disabled, icon }, index) => (
            <button
              key={label + index}
              type='button'
              aria-label={label}
              onClick={action}
              disabled={disabled}
              className={getClass(!disabled)}
            >
              {icon}
            </button>
          ))}
        </div>

        <div className='flex gap-x-1.5 pr-1.5'>
          {/* Heading options */}
          <div className='relative'>
            <button
              type='button'
              onClick={() => setHeading(!heading)}
              className='p-2 rounded-[5px] bg-neutral-500/15 transition-colors duration-300 ease-in-out cursor-pointer'
            >
              {(h.find(option => option.isActive())?.icon || <HIcon />)}
            </button>

            {heading && (
              <div className='absolute z-40 flex gap-x-1.5 mt-1.5'>
                {h?.map(({ label, icon, action, isActive }, index) => (
                  <button
                    key={label + index}
                    type='button'
                    aria-label={label}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      action()
                      setTimeout(() => {
                        setHeading(false)
                      }, 200)
                    }}
                    className={getClass(isActive())}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Nodes option */}
          {nodes?.map(({ label, action, isActive, disabled, icon }, index) => (
            <button
              key={label + index}
              type='button'
              aria-label={label}
              onClick={action}
              className={getClass(isActive?.() || false)}
              disabled={disabled}
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Inline formatting options */}
        <div className='flex gap-x-1.5 pr-1.5'>
          {inlineFormatting?.map(({ label, action, isActive, disabled, icon }, index) => (
            <button
              key={label + index}
              type='button'
              aria-label={label}
              onClick={action}
              disabled={disabled}
              className={getClass(isActive?.() || false)}
            >
              {icon}
            </button>
          ))}
        </div>

        {/* TextAlign options */}
        <div className='relative pr-1.5'>
          <button
            type='button'
            onClick={() => setText(!text)}
            className='p-2 rounded-[5px] bg-neutral-500/15 transition-colors duration-300 ease-in-out cursor-pointer'
          >
            {(textAlign.find(option => option.isActive())?.icon || <AlignLeftIcon />)}
          </button>

          {text && (
            <div className='absolute z-40 flex gap-x-1.5 mt-1.5'>
              {textAlign?.map(({ label, icon }, index) => (
                <button
                  key={label + index}
                  type='button'
                  aria-label={label}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    editor.chain().focus().setTextAlign(label).run()
                    setTimeout(() => {
                      setText(false)
                    }, 200)
                  }}
                  className={getClass(editor.isActive({ textAlign: label }))}
                >
                  {icon}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* BulletList options */}
        <div className='relative pr-1.5'>
          <button
            type='button'
            onClick={() => setBulletList(!bulletList)}
            className='p-2 rounded-[5px] bg-neutral-500/15 transition-colors duration-300 ease-in-out cursor-pointer'
          >
            {(bL.find(option => option.isActive?.())?.icon || <ListIcon />)}
          </button>

          {bulletList && (
            <div className='absolute z-40 flex gap-x-1.5 mt-1.5'>
              {bL?.map(({ label, icon, action, isActive }, index) => (
                <button
                  key={label + index}
                  type='button'
                  aria-label={label}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    action()
                    setTimeout(() => {
                      setBulletList(false)
                    }, 200)
                  }}
                  className={getClass(isActive?.())}
                >
                  {icon}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bleeding options */}
        <div className='flex gap-x-1.5 pr-1.5'>
          {bleeding?.map(({ label, action, disabled, icon }, index) => (
            <button
              key={label + index}
              type='button'
              aria-label={label}
              onClick={action}
              disabled={disabled}
              className={getClass(!disabled)}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
