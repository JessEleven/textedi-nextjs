import { HomeIcon, SettingsIcon } from '../assets/dash-icons'
import DocNav from './related-to-doc/doc-nav'
import { Item } from './ui/item'

export default function NavItem () {
  return (
    <nav className='mt-7 space-y-2.5 text-sm'>
      {/* Page navigation */}
      <Item
        href='/dash'
        icon={<HomeIcon />}
        label='Dashboard'
      />

      {/* Navigation container */}
      <DocNav />

      {/* Page navigation */}
      <Item
        href='/dash/account'
        icon={<SettingsIcon />}
        label='Account'
      />
    </nav>
  )
}
