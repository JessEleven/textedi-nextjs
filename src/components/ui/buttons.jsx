import Link from 'next/link'

/* Button with background and link */
export function BtnBgLink ({ url, text }) {
  return (
    <Link href={url} className='block px-4 py-[8.5px] btn-bg'>
      {text}
    </Link>
  )
}

/* Button with border and link */
export function BtnBorderLink ({ url, text }) {
  return (
    <Link href={url} className='block px-4 py-2 btn-border'>
      {text}
    </Link>
  )
}

/* Button with background */
export function BtnBg ({ type, text, both }) {
  return (
    <button type={type}>
      {text && (
        <h3 className='px-4 py-[8.5px] btn-bg'>{text}</h3>
      )}
      {both && (
        <div className='flex items-center gap-x-1.5 px-4 py-[7.5px] btn-bg'>
          {both.icon}
          <span>{both.text}</span>
        </div>
      )}
    </button>
  )
}

/* Button with border */
export function BtnBorder ({ text, both }) {
  return (
    <>
      {text && (
        <h3 className='px-4 py-2 btn-border'>{text}</h3>
      )}
      {both && (
        <div className='flex items-center gap-x-1.5 px-4 py-[7px] btn-border'>
          {both.icon}
          <span>{both.text}</span>
        </div>
      )}
    </>
  )
}
