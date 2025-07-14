export function PgButton ({ onClick, disabled, text }) {
  return (
    <button
      type='button'
      className='px-4 py-1.5 rounded-[5px] text-neutral-900 bg-neutral-300 hover:bg-neutral-300/80 transition-colors duration-200 ease-in-out disabled:bg-neutral-300/60 cursor-pointer disabled:cursor-not-allowed'
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
