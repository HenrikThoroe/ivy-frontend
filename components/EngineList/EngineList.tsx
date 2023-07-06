import { getInstances } from '@/lib/data/Engine'
import EngineListRow from './EngineListRow'
import List from '../List/List'
import { EngineConfig } from '@ivy-chess/model'

interface Props {
  engine: EngineConfig
}

export default function EngineList(props: Props) {
  const { engine } = props

  return (
    <List variant="custom-1" head={['Version', 'OS', 'Architecture', 'Required Capabilities']}>
      {getInstances(engine).map((instance) => (
        <EngineListRow
          engine={engine.name}
          id={instance.flavour.id}
          arch={instance.flavour.arch}
          os={instance.flavour.os}
          capabilities={instance.flavour.capabilities}
          version={instance.version}
          key={instance.flavour.id}
        />
      ))}
    </List>
  )
}
