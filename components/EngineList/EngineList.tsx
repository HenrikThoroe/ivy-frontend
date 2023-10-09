import { EngineHelper } from '@/lib/data/EngineHelper'
import { EngineConfig } from '@ivy-chess/model'
import List from '../List/List'
import EngineListRow from './EngineListRow'

interface Props {
  engine: EngineConfig
}

export default function EngineList(props: Props) {
  const { engine } = props
  const helper = new EngineHelper(engine)

  return (
    <List variant="custom-1" head={['Version', 'OS', 'Architecture', 'Required Capabilities']}>
      {helper.executables.map((instance) => (
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
