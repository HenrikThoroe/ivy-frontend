import { VerificationGroup } from '@ivy-chess/model'
import List from '../List/List'
import VerificationGroupListRow from './VerificationGroupListRow'
import VerificationGroupListTools from './VerificationGroupListTools'

interface Props {
  groups: VerificationGroup[]
}

/**
 * A list of {@link VerificationGroup verification groups}.
 * Provides controls for the user to create a new verification group.
 * Each verification group can be viewed or deleted.
 *
 * For each verification group the following information is displayed:
 * - Name
 * - Base Engine
 */
export default function VerificationGroupList(props: Props) {
  const { groups } = props

  return (
    <List
      variant="custom-5"
      head={['Name', 'Base Engine', <VerificationGroupListTools key="verification-list-tools" />]}
    >
      {groups.map((group, idx) => (
        <VerificationGroupListRow group={group} key={`verification-group-row-${idx}`} />
      ))}
    </List>
  )
}
