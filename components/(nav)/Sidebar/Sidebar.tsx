import Logo from '../../(media)/Logo/Logo'
import SidebarActions from './SidebarActions'

/**
 * The sidebar is used as main navigation element.
 * It is always visible and contains the logo and
 * navigation buttons to the main top-level pages.
 */
export default function Sidebar() {
  //* UI

  const Header = () => (
    <section className="flex flex-row items-center justify-start gap-x-4">
      <div className="rounded-lg border bg-white p-1 shadow-sm">
        <Logo />
      </div>
      <h1 className="text-3xl font-semibold tracking-wider text-on-primary">Ivy</h1>
    </section>
  )

  //* Render

  return (
    <aside className="sticky top-0 h-full py-[0.875rem]">
      <section className="flex h-full w-fit flex-col gap-y-[3.125rem] border-r-2 bg-primary px-[1.375rem] py-[1.875rem]">
        <Header />
        <SidebarActions />
      </section>
    </aside>
  )
}
