'use client'

import { useChangeListener } from '@/lib/hooks/useChangeListener'
import { LiveGame } from '@ivy-chess/model'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import LabeledInput from '../../(atoms)/LabeledInput/LabeledInput'
import SelectInput from '../../(atoms)/SelectInput/SelectInput'
import TextInput from '../../(atoms)/TextInput/TextInput'

type PlayerType = LiveGame['players']['white']['type']

/**
 * The configuration for a player.
 */
export interface PlayerConfig {
  /**
   * The type of player.
   */
  type: PlayerType

  /**
   * The time per move in milliseconds.
   */
  time?: number
}

interface Props {
  /**
   * Called when the player data changes.
   */
  onChange: (config?: PlayerConfig) => void

  /**
   * The default player data.
   */
  default: PlayerConfig
}

/**
 * A form composition for configuring a player.
 * Expected to be used inside a `Form` component.
 */
export default function PlayerConfigForm(props: Props) {
  const [type, setType] = useState<PlayerType>(props.default.type)
  const [time, onTimeChange, timeErr] = useChangeListener(
    z.coerce.number().int().positive().optional(),
    props.default.time
  )

  //* Event Handler

  useEffect(() => {
    if (type === 'engine' && (!time || timeErr)) {
      props.onChange(undefined)
    } else if (type === 'human') {
      props.onChange({ type })
    } else {
      props.onChange({ type, time })
    }
  }, [type, time])

  //* Render

  return (
    <>
      <LabeledInput label="Type" required>
        <SelectInput
          options={[
            { value: 'human', label: 'Human' },
            { value: 'engine', label: 'Engine' },
          ]}
          defaultValue="human"
          onSelect={setType}
        />
      </LabeledInput>
      <div className={classNames('w-full', { 'opacity-20': type === 'human' })}>
        <LabeledInput label="Time" required={type === 'engine'} error={timeErr}>
          <TextInput
            type="number"
            placeholder="Time per move in milliseconds"
            readonly={type === 'human'}
            required={type === 'engine'}
            onChange={onTimeChange}
            clear={type === 'engine'}
          />
        </LabeledInput>
      </div>
    </>
  )
}
