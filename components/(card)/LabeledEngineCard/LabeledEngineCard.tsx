'use client'

import Icon from '@/components/(media)/Icon/Icon'
import ActionModal from '@/components/(modal)/ActionModal/ActionModal'
import WithModal from '@/components/(modal)/WithModal/WithModal'
import { EngineTestConfig } from '@ivy-chess/model'
import EngineTestConfigCard from '../EngineTestConfigCard/EngineTestConfigCard'

interface Props {
  /**
   * The label to display above the engine configuration.
   */
  label: string

  /**
   * The engine configuration to display.
   */
  config: EngineTestConfig

  /**
   * Called when the user clicks the remove button.
   * If not provided, the remove button will not be displayed.
   */
  onRemove?: () => void
}

/**
 * Adds a label to an `EngineTestConfigCard`.
 *
 * Allows to optionally add a remove button, which will display a confirmation modal.
 */
export default function LabeledEngineCard(props: Props) {
  const { label, config, onRemove } = props

  //* UI

  const Prompt = (
    <ActionModal
      title="Remove Engine?"
      description="Are you sure you want to remove the engine configuration?"
      action={{
        label: 'Remove',
        variant: 'danger',
        onClick: onRemove ?? (() => {}),
      }}
      icon="delete"
    />
  )

  //* Render

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-row gap-3">
        <span className="text-xl font-medium text-on-primary-light">{label}</span>
        {onRemove && (
          <WithModal modal={Prompt}>
            <button className="text-action-destructive hover:text-action-destructive-active">
              <Icon name="delete" />
            </button>
          </WithModal>
        )}
      </div>
      <EngineTestConfigCard textSize="md" engine={config} />
    </section>
  )
}
