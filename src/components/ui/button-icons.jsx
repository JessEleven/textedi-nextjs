import Link from 'next/link'

/* Button border icon link */
export function BtnIconLink ({ url, ariaLabel, icon }) {
  return (
    <Link
      href={url}
      aria-label={ariaLabel}
      className='block btn-border-icon'
    >
      {icon}
    </Link>
  )
}

/* Button border icon */
export function BtnBorderIcon ({ type, ariaLabel, disabled, onClick, icon }) {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className='btn-border-icon'
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
    </button>
  )
}
