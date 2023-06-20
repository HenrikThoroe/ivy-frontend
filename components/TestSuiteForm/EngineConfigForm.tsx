'use client'

import {
  EngineConfig,
  compareEngineVersions,
  parseEngineVersion,
  versionToString,
} from '@/lib/data/Engine'
import LabeledInput from '../Form/LabeledInput'
import SelectInput from '../Form/SelectInput'
import TextInput from '../Form/TextInput'
import { useState } from 'react'
import { EngineTestConfig } from '@/lib/data/Test'

interface Props {
  configs: EngineConfig[]
  default: EngineTestConfig
  onChange?: (config: EngineTestConfig) => void
}

export default function EngineConfigForm(props: Props) {
  const names = props.configs.map((c) => c.name)
  const [config, setConfig] = useState(props.default)

  const versions = () => {
    const conf = props.configs.find((c) => c.name === config.name)

    if (conf) {
      const versions = conf.variations.flatMap((v) => v.version)
      versions.sort(compareEngineVersions)
      return versions
    }

    return []
  }

  const update = (config: EngineTestConfig) => {
    setConfig(config)
    props.onChange && props.onChange(config)
  }

  return (
    <>
      <LabeledInput label="Name" required>
        <SelectInput
          options={names.map((n) => ({ label: n, value: n }))}
          onSelect={(v) => update({ ...config, name: v })}
          defaultValue={props.default.name}
        />
      </LabeledInput>
      <LabeledInput label="Version" required>
        <SelectInput
          defaultValue={versionToString(props.default.version)}
          onSelect={(val) => update({ ...config, version: parseEngineVersion(val) })}
          options={versions().map((v) => ({
            label: versionToString(v),
            value: versionToString(v),
          }))}
        />
      </LabeledInput>
      <LabeledInput label="Time Control Type" required>
        <SelectInput
          defaultValue={props.default.timeControl.type}
          onSelect={(val) =>
            update({
              ...config,
              timeControl: { ...config.timeControl, type: val },
            })
          }
          options={[
            { label: 'Time', value: 'movetime' },
            { label: 'Depth', value: 'depth' },
          ]}
        />
      </LabeledInput>
      <LabeledInput label="Time Control Value" required>
        <TextInput
          type="number"
          placeholder="10"
          defaultValue={props.default.timeControl.value}
          pattern="^[0-9]{1,}$"
          onChange={(e) =>
            update({
              ...config,
              timeControl: { ...config.timeControl, value: e.target.valueAsNumber },
            })
          }
        />
      </LabeledInput>
      <LabeledInput label="Threads">
        <TextInput
          type="number"
          placeholder="2"
          pattern="^[0-9]{1,}$"
          defaultValue={props.default.options.threads}
          onChange={(e) =>
            update({
              ...config,
              options: { ...config.options, threads: e.target.valueAsNumber },
            })
          }
        />
      </LabeledInput>
      <LabeledInput label="Hash Table Size">
        <TextInput
          type="number"
          placeholder="Number of MBs to use for hash table"
          pattern="^[0-9]{1,}$"
          defaultValue={props.default.options.hash}
          onChange={(e) =>
            update({
              ...config,
              options: { ...config.options, hash: e.target.valueAsNumber },
            })
          }
        />
      </LabeledInput>
    </>
  )
}
