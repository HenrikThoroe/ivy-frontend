import { EngineConfig, EngineTestConfig } from '@ivy-chess/model'
import Form from '../Form/Base/Form'
import Modal from '../Modal/Modal'
import EngineConfigForm from '../Form/Shared/EngineConfigForm'
import { useState } from 'react'
import FormSubmitButton from '../Form/Base/FormSubmitButton'

interface Props {
  open: boolean
  onClose: () => void
  configs: EngineConfig[]
  onAdd: (conf: EngineTestConfig) => void
}

export default function AddNodeModal(props: Props) {
  const { open, onClose, configs, onAdd } = props
  const [selected, setSelected] = useState<EngineTestConfig | undefined>(undefined)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (selected === undefined) {
      return
    }

    onClose()
    onAdd(selected)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-4">
        <Form onSubmit={handleSubmit}>
          <EngineConfigForm onChange={setSelected} configs={configs} />
          <FormSubmitButton disabled={selected === undefined}>Add</FormSubmitButton>
        </Form>
      </div>
    </Modal>
  )
}
