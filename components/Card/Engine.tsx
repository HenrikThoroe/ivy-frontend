import Link from 'next/link'
import Icon from '../Icon/Icon'

type Variant = 'template' | 'engine'

interface BaseProps<T extends Variant> {
  variant: T
}

interface TemplateProps extends BaseProps<'template'> {}

interface EngineProps extends BaseProps<'engine'> {
  name: string
  os: string[]
  arch: string[]
}

export default function EngineCard<T extends Variant>(
  props: T extends 'template' ? TemplateProps : EngineProps
) {
  if (props.variant === 'template') {
    return (
      <Link href="/engines/upload">
        <div className="group flex h-[177px] w-[386px] cursor-pointer flex-row items-center justify-center gap-[20px] rounded-[18px] border-[1px] border-dashed border-primary-accent-border hover:border-action-primary-active">
          <div className="flex h-[1.75rem] w-[1.75rem] items-center justify-center rounded-full border-[1px] border-dashed border-on-primary text-on-primary group-hover:border-action-primary-active group-hover:text-action-primary-active">
            <Icon name="add" />
          </div>
          <span className="font-semibold text-on-primary group-hover:text-action-primary-active">
            Upload Engine
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/engines/${props.name}`}>
      <div className="flex h-[177px] w-[386px] cursor-pointer flex-col items-start justify-center gap-[1.25rem] rounded-[1.125rem] border-2 border-solid border-primary-accent-border px-[1.25rem] py-[1.875rem] hover:border-action-primary-active">
        <h3 className="text-[1.5rem] font-semibold text-on-primary">{props.name}</h3>
        <div className="flex flex-col gap-[0.625rem]">
          <div className="flex flex-row items-center justify-start text-on-primary-light">
            <div className="flex w-[160px] flex-row items-center gap-[0.625rem]">
              <Icon name="desktop" />
              <span className="text-[0.75rem] font-medium">Operating System:</span>
            </div>
            <span className="text-[0.75rem]">{props.os.join(', ')}</span>
          </div>
          <div className="flex flex-row items-center justify-start text-on-primary-light">
            <div className="flex w-[160px] flex-row items-center gap-[0.625rem]">
              <Icon name="memory" />
              <span className="text-[0.75rem] font-medium">Architecture:</span>
            </div>
            <span className="text-[0.75rem]">{props.arch.join(', ')}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
