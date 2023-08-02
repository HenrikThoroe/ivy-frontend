import { VerificationGroup } from '@ivy-chess/model'
import List from '../List/List'
import VerificationGroupListRow from './VerificationGroupListRow'
import VerificationGroupListTools from './VerificationGroupListTools'

interface Props {
  groups: VerificationGroup[]
}

export default function VerificationGroupList(props: Props) {
  const { groups } = props

  return (
    <List variant="custom-3" head={['Name', 'Base Engine', <VerificationGroupListTools />]}>
      {groups.map((group) => (
        <VerificationGroupListRow group={group} />
      ))}
    </List>
  )
}
