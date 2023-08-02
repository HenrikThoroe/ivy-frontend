'use client'

import { compareEngineVersions, parseEngineVersion, versionToString } from '@/lib/data/Engine'
import LabeledInput from '../Base/LabeledInput'
import SelectInput from '../Base/SelectInput'
import TextInput from '../Base/TextInput'
import { useState } from 'react'
import { EngineConfig, EngineTestConfig } from '@ivy-chess/model'

interface Props {
  configs: EngineConfig[]
  default?: EngineTestConfig
  onChange?: (config: EngineTestConfig) => void
}

export default function EngineConfigForm(props: Props) {
  const genericEngineConfig: EngineTestConfig = {
    name: props.configs[0].name,
    version: props.configs[0].variations[0].version,
    timeControl: {
      type: 'movetime',
      value: 100,
    },
    options: {
      threads: 1,
      hash: 128,
    },
  }

  const defaultConfig = props.default ?? genericEngineConfig
  const names = props.configs.map((c) => c.name)
  const [config, setConfig] = useState(defaultConfig)

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
          defaultValue={defaultConfig.name}
        />
      </LabeledInput>
      <LabeledInput label="Version" required>
        <SelectInput
          defaultValue={versionToString(defaultConfig.version)}
          onSelect={(val) => update({ ...config, version: parseEngineVersion(val) })}
          options={versions().map((v) => ({
            label: versionToString(v),
            value: versionToString(v),
          }))}
        />
      </LabeledInput>
      <LabeledInput label="Time Control Type" required>
        <SelectInput
          defaultValue={defaultConfig.timeControl.type}
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
          defaultValue={defaultConfig.timeControl.value}
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
          defaultValue={defaultConfig.options.threads}
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
          defaultValue={defaultConfig.options.hash}
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
