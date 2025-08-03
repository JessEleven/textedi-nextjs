import { LayoutListIcon, SettingsIcon, StarIcon } from '../assets/record-icons'
import RecordDropdown from './record/record-dropdown'
import { Item } from './ui/item'

export default function NavItem () {
  return (
    <nav className='mt-7 space-y-2.5 text-sm'>
      {/* Page navigation */}
      <Item
        href='/home'
        icon={<LayoutListIcon />}
        label='Home'
      />

      {/* Options menu */}
      <RecordDropdown />

      {/* Page navigation */}
      <Item
        href='/favorites'
        icon={<StarIcon />}
        label='Favorites'
      />

      {/* Page navigation */}
      <Item
        href='/account'
        icon={<SettingsIcon />}
        label='Account'
      />
    </nav>
  )
}
