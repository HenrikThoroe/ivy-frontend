'use client'

import { useChangeListener } from '@/lib/hooks/useChangeListener'
import { EngineConfig, EngineTestConfig, decodeVersion, encodeVersion } from '@ivy-chess/model'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import LabeledInput from '../../(atoms)/LabeledInput/LabeledInput'
import SelectInput from '../../(atoms)/SelectInput/SelectInput'
import TextInput from '../../(atoms)/TextInput/TextInput'

interface Props {
  /**
   * The engine configurations to choose from.
   */
  configs: EngineConfig[]

  /**
   * Called when the configuration changes to
   * a valid state.
   */
  onChange?: (config: EngineTestConfig) => void
}

const schema = {
  timeValue: z.coerce.number().positive(),
  threads: z.coerce.number().min(1),
  hash: z.coerce.number().min(16),
}

/**
 * A drop-in collection of form inputs for
 * creating an engine test configuration.
 *
 * The component is stateful and will call the
 * `onChange` callback when the configuration
 * changes and is valid.
 *
 * Built to be used in a `Form` component.
 */
export default function EngineConfigForm(props: Props) {
  const defaultEngine = props.configs[0]
  const defaultVersion = defaultEngine.variations[0].version
  const defaultTimeType = 'movetime' as const

  const [engine, setEngine] = useState<EngineConfig>(props.configs[0])
  const [version, setVersion] = useState(defaultVersion)
  const [timeValue, onTimeValueChange, valueErr] = useChangeListener(schema.timeValue)
  const [timeType, setTimeType] = useState<'movetime' | 'depth'>(defaultTimeType)
  const [threads, onThreadsChange, threadsErr] = useChangeListener(schema.threads)
  const [hash, onHashChange, hashErr] = useChangeListener(schema.hash)

  const names = props.configs.map((c) => c.name)
  const versions = () => engine.variations.map((v) => v.version)
  const getEngine = (name: string) => props.configs.find((c) => c.name === name)!

  //* Event Handler

  useEffect(() => {
    if (timeValue && threads && hash && props.onChange) {
      props.onChange({
        name: engine.name,
        version,
        options: {
          hash,
          threads,
        },
        timeControl: {
          type: timeType,
          value: timeValue,
        },
      })
    }
  }, [engine, version, timeValue, timeType, threads, hash])

  //* Render

  return (
    <>
      <LabeledInput label="Name" required>
        <SelectInput
          options={names.map((n) => ({ label: n, value: n }))}
          onSelect={(val) => setEngine(getEngine(val))}
          defaultValue={defaultEngine.name}
        />
      </LabeledInput>
      <LabeledInput label="Version" required>
        <SelectInput
          defaultValue={encodeVersion(defaultVersion, false)}
          onSelect={(val) => setVersion(decodeVersion(val))}
          options={versions().map((v) => ({
            label: encodeVersion(v, false),
            value: encodeVersion(v, true),
          }))}
        />
      </LabeledInput>
      <LabeledInput label="Time Control Type" required>
        <SelectInput
          defaultValue={defaultTimeType}
          onSelect={setTimeType}
          options={[
            { label: 'Time', value: 'movetime' },
            { label: 'Depth', value: 'depth' },
          ]}
        />
      </LabeledInput>
      <LabeledInput label="Time Control Value" error={valueErr} required>
        <TextInput
          type="number"
          placeholder="Time in milliseconds or search depth"
          onChange={onTimeValueChange}
          required
          clear
        />
      </LabeledInput>
      <LabeledInput label="Threads" error={threadsErr} required>
        <TextInput
          type="number"
          placeholder="Number of threads used for move calculation"
          pattern="^[0-9]{1,}$"
          onChange={onThreadsChange}
          required
          clear
        />
      </LabeledInput>
      <LabeledInput label="Hash Table Size" error={hashErr} required>
        <TextInput
          type="number"
          placeholder="Size of the hash table in MB"
          pattern="^[0-9]{1,}$"
          onChange={onHashChange}
          required
          clear
        />
      </LabeledInput>
    </>
  )
}
