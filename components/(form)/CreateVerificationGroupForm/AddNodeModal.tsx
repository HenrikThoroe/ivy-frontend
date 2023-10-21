import { customHandler } from '@/lib/util/handler'
import { EngineConfig, EngineTestConfig } from '@ivy-chess/model'
import { useState } from 'react'
import Form from '../(atoms)/Form/Form'
import FormSubmitButton from '../(atoms)/FormSubmitButton/FormSubmitButton'
import EngineConfigForm from '../(compositions)/EngineConfigForm/EngineConfigForm'
import Modal from '../../Modal/Modal'

interface Props {
  /**
   * Whether the modal is open.
   */
  open: boolean

  /**
   * Called when the modal is closed.
   */
  onClose: () => void

  /**
   * A list of engine configurations to select from.
   */
  configs: EngineConfig[]

  /**
   * Called when a new node is added.
   */
  onAdd: (conf: EngineTestConfig) => void
}

/**
 * A modal for adding a new node to a verification group.
 */
export default function AddNodeModal(props: Props) {
  const { open, onClose, configs, onAdd } = props
  const [selected, setSelected] = useState<EngineTestConfig | undefined>(undefined)

  //* Event Handler

  const handleSubmit = customHandler(() => {
    if (!selected) {
      return
    }

    onClose()
    onAdd(selected)
  })

  //* Render

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-4">
        <Form onSubmit={handleSubmit}>
          <EngineConfigForm onChange={setSelected} configs={configs} />
          <FormSubmitButton disabled={!selected}>Add</FormSubmitButton>
        </Form>
      </div>
    </Modal>
  )
}
