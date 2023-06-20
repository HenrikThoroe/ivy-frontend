'use client'

import FileInput from '@/components/Form/FileInput'
import Form from '@/components/Form/Form'
import LabeledInput from '@/components/Form/LabeledInput'
import SelectInput from '@/components/Form/SelectInput'
import TextInput from '@/components/Form/TextInput'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import LoadingModal from '../Modal/LoadingModal'
import FormSubmitButton from '../Form/FormSubmitButton'
import { parseEngineVersion, uploadEngine } from '@/lib/data/Engine'

const options = {
  os: [
    { value: 'windows', label: 'Windows' },
    { value: 'linux', label: 'Linux' },
    { value: 'darwin', label: 'macOS' },
  ],
  arch: [
    { value: 'amd64', label: 'AMD64' },
    { value: 'arm64', label: 'ARM64' },
  ],
}

const defaultValues = {
  os: options.os[0].value,
  arch: options.arch[0].value,
}

export default function UploadEngineForm() {
  const [showLoading, setShowLoading] = useState(false)
  const [engineName, setEngineName] = useState<string | null>(null)
  const [version, setVersion] = useState<string | null>(null)
  const [os, setOs] = useState(defaultValues.os)
  const [arch, setArch] = useState(defaultValues.arch)
  const [capabilities, setCapabilities] = useState<string | null>(null)
  const [binary, setBinary] = useState<File | null>(null)
  const router = useRouter()

  const isValid = () => {
    return engineName && version && os && arch && binary ? true : false
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isValid()) {
      return
    }

    setShowLoading(true)

    await uploadEngine(
      {
        name: engineName!,
        version: parseEngineVersion(version!),
        flavour: {
          id: '',
          os: os!,
          arch: arch!,
          capabilities: capabilities
            ? capabilities.split(',').map((c) => c.trim().toLowerCase())
            : [],
        },
      },
      binary!
    )

    router.push(`/engines/${engineName}`)
  }

  return (
    <>
      <LoadingModal open={showLoading} />
      <Form onSubmit={handleSubmit}>
        <LabeledInput label="Engine Name" required>
          <TextInput
            placeholder="Engine Name, 3 or more characters"
            type="text"
            onChange={(e) => setEngineName(e.target.value)}
            required
            pattern="^[a-zA-Z]{1}[a-zA-Z0-9-_]{2,}$"
          />
        </LabeledInput>
        <LabeledInput label="Version" required>
          <TextInput
            placeholder="1.0.0"
            type="text"
            required
            onChange={(e) => setVersion(e.target.value)}
            pattern="^[0-9]{1,}\.[0-9]{1,}\.[0-9]{1,}$"
          />
        </LabeledInput>
        <LabeledInput label="Operating System" required>
          <SelectInput options={options.os} onSelect={setOs} defaultValue={defaultValues.os} />
        </LabeledInput>
        <LabeledInput label="Architecture" required>
          <SelectInput
            options={options.arch}
            onSelect={setArch}
            defaultValue={defaultValues.arch}
          />
        </LabeledInput>
        <LabeledInput label="Required Capabilities">
          <TextInput
            placeholder="AVX2, SSE4.1, SSE4.2, ..."
            type="text"
            onChange={(e) => setCapabilities(e.target.value)}
          />
        </LabeledInput>
        <LabeledInput label="Binary" required>
          <FileInput required onUpload={(file) => setBinary(file)} />
        </LabeledInput>
        <FormSubmitButton disabled={!isValid()}>Upload</FormSubmitButton>
      </Form>
    </>
  )
}
