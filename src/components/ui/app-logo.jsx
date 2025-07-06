import Image from 'next/image'
import Logo from '../../../public/logo.svg'
import clsx from 'clsx'

const displayMap = {
  flex: 'flex items-center gap-x-1.5',
  block: 'flex flex-col items-center gap-y-1.5'
}

const iconSizeMap = {
  18: 'w-[18px] h-[18px]',
  26: 'w-[26px] h-[26px]',
  40: 'w-[40px] h-[40px]',
  54: 'w-[54px] h-[54px]'
}

const fontSizeMap = {
  12: 'text-sm',
  20: 'text-xl'
}

export default function AppLogo ({
  display,
  showText = false,
  iconSize,
  fontSize
}) {
  return (
    <div className={clsx(displayMap[display])}>
      <Image
        src={Logo}
        alt='Logo'
        className={clsx(iconSizeMap[iconSize])}
        priority
      />
      {showText && (
        <h3 className={clsx('font-medium', fontSizeMap[fontSize])}>
          textedi
        </h3>
      )}
    </div>
  )
}
