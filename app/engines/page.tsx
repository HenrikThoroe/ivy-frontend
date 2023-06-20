import EngineCard from '@/components/Card/Engine'
import { fetchEngineConfigs, getSupportedArch, getSupportedOS } from '@/lib/data/Engine'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ivy - Engine List',
  description: 'List of available engines',
}

export const revalidate = 0

export default async function Engines() {
  const engines = await fetchEngineConfigs()

  const buildCards = () => {
    return engines.map((engine) => {
      return (
        <EngineCard
          variant="engine"
          name={engine.name}
          os={getSupportedOS(engine)}
          arch={getSupportedArch(engine)}
        />
      )
    })
  }

  return (
    <div className="grid w-full grid-cols-auto-fill-card-md justify-center gap-10 p-10">
      <EngineCard variant="template" />
      {buildCards()}
    </div>
  )
}
