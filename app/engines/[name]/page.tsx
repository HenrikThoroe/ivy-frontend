import EngineList from '@/components/EngineList/EngineList'
import { fetchEngineConfig } from '@/lib/data/Engine'

interface Props {
  params: {
    name: string
  }
}

export const revalidate = 1

export function generateMetadata({ params }: Props) {
  return {
    title: `Ivy - ${params.name}`,
    description: `Versions of engine '${params.name}'`,
  }
}

export default async function Engine({ params }: Props) {
  const engine = await fetchEngineConfig(params.name)

  return <EngineList engine={engine} />
}
