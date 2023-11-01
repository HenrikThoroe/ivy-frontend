import Icon from '@/components/(media)/Icon/Icon'
import classNames from 'classnames'
import Link from 'next/link'
import Breadcrumbs from './Breadcrumbs'

/**
 * A navigation bar is a user interface element within the webpage that contains
 * a breadcrumb trail and a link to the user's profile.
 *
 * The navigation bar is always visible at the top of the page with sticky positioning.
 * It is always visible, even when the user scrolls down the page.
 * The user can use the navigation bar to navigate to pages higher up in the hierarchy
 * or to navigate to their profile. For other navigation, the user can use the sidebar.
 */
export default function Navbar() {
  return (
    <nav
      className={classNames(
        'sticky top-0 z-50 flex w-full flex-row items-center justify-between border-b-[1px] border-solid border-on-primary',
        'bg-primary bg-opacity-40 px-[1.25rem] pb-[1.25rem] pt-[0.875rem] backdrop-blur-[6px]'
      )}
    >
      <Breadcrumbs />
      <Link
        href="/profile"
        className="flex flex-row gap-1 rounded-md bg-cyan-900 px-3 py-2 text-on-secondary shadow-md hover:bg-cyan-600 hover:shadow-none"
      >
        <Icon name="person" />
        <span className="text-base font-medium tracking-wider">Profile</span>
      </Link>
    </nav>
  )
}
