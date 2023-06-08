import SidebarActions from './SidebarActions'
import Logo from '../Icon/Logo'

function Header() {
  return (
    <div className="flex flex-row items-center justify-start gap-x-[1.875rem]">
      <Logo />
      <h1 className="text-3xl font-extrabold text-on-primary">Ivy</h1>
    </div>
  )
}

export default function Sidebar() {
  return (
    <div className="sticky top-0 h-full py-[0.875rem]">
      <div className="flex h-full w-fit flex-col gap-y-[3.125rem] rounded-2xl bg-primary px-[1.375rem] py-[1.875rem] shadow-defined">
        <Header />
        <SidebarActions />
      </div>
    </div>
  )
}
