import Link from 'next/link'

/* Button icon link */
export function BtnIconLink ({ url, icon, ariaLabel }) {
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

/* Button icon */
export function BtnIcon ({ icon, ariaLabel, onClick }) {
  return (
    <button
      type='button'
      aria-label={ariaLabel}
      className='btn-border-icon'
      onClick={onClick}
    >
      {icon}
    </button>
  )
}
