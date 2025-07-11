import { HomeIcon, SettingsIcon } from '../assets/dash-icons'
import { Item } from './ui/item'

export default function NavItem () {
  return (
    <nav className='mt-7 space-y-2.5 text-sm'>
      <Item
        href='/dash'
        icon={<HomeIcon />}
        label='Dashboard'
      />

      <Item
        href='/dash/account'
        icon={<SettingsIcon />}
        label='Account'
      />
    </nav>
  )
}
