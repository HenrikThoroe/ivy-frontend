import Icon from '../Icon/Icon'
import Breadcrumbs from './Breadcrumbs'

export default function Navbar() {
  return (
    <div className="sticky top-0 flex w-full flex-row items-center justify-between border-b-[1px] border-solid border-on-primary px-[1.25rem] pb-[1.25rem] pt-[0.875rem] backdrop-blur-[6px]">
      <Breadcrumbs />
      <button className="flex flex-row gap-x-[0.625rem] rounded-[10px] border border-solid border-on-primary bg-primary px-[1.125rem] py-[0.4375rem] font-semibold text-on-primary hover:border-transparent hover:bg-primary-hover">
        <Icon name="login" />
        Login
      </button>
    </div>
  )
}
