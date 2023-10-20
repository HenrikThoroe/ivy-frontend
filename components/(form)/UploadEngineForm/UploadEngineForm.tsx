'use client'

import FileInput from '@/components/(form)/(atoms)/FileInput/FileInput'
import Form from '@/components/(form)/(atoms)/Form/Form'
import LabeledInput from '@/components/(form)/(atoms)/LabeledInput/LabeledInput'
import SelectInput from '@/components/(form)/(atoms)/SelectInput/SelectInput'
import TextInput from '@/components/(form)/(atoms)/TextInput/TextInput'
import AlertModal from '@/components/Modal/AlertModal'
import { clientStrategy } from '@/lib/api/auth/strategy/client'
import { EngineClient } from '@/lib/api/clients/EngineClient'
import { useChangeListener } from '@/lib/hooks/useChangeListener'
import { shared } from '@ivy-chess/api-schema'
import { decodeVersion } from '@ivy-chess/model'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import FormSubmitButton from '../(atoms)/FormSubmitButton/FormSubmitButton'
import LoadingModal from '../../Modal/LoadingModal'

const schema = {
  engine: shared.engine.engineNameSchema,
  capabilities: z.string().transform((val) => val.split(',').map((c) => c.trim().toLowerCase())),
  version: z.string().transform((v, ctx) => {
    try {
      return decodeVersion(v.replaceAll('.', '-'))
    } catch {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid version format' })
      return z.NEVER
    }
  }),
}

/**
 * A form for uploading a new engine binary.
 * The component uses a client side API client instance,
 * to upload the binary and the given meta data to the server.
 */
export default function UploadEngineForm() {
  const defaultOS = 'linux'
  const defaultArch = 'amd64'

  const router = useRouter()
  const client = new EngineClient(clientStrategy())

  const [showLoading, setShowLoading] = useState(false)
  const [binary, setBinary] = useState<File | null>(null)
  const [error, setError] = useState<string | undefined>(undefined)
  const [name, onNameChange, nameErr] = useChangeListener(schema.engine)
  const [version, onVersionChange, versionErr] = useChangeListener(schema.version)
  const [cap, onCapChange, capErr] = useChangeListener(schema.capabilities)
  const [os, setOs] = useState(defaultOS)
  const [arch, setArch] = useState(defaultArch)

  const isValid = () => {
    if (!name || !version || !binary) {
      return false
    }

    if (nameErr || versionErr || capErr) {
      return false
    }

    return true
  }

  //* Event Handler

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isValid()) {
      return
    }

    setShowLoading(true)

    const res = await client.catchNetworkError(
      client.create(binary!, {
        name: name!,
        version: version!,
        os: os,
        arch: arch,
        capabilities: cap ?? [],
      })
    )

    setShowLoading(false)

    if (!res.success) {
      setError(res.error.message)
    } else {
      router.push(`/engines/${name}`)
    }
  }

  //* Render

  return (
    <>
      <AlertModal
        open={error !== undefined}
        onClose={() => setError(undefined)}
        variant="error"
        title="Error"
        description={`Could not create engine due to an unexpected error: ${error}`}
        icon="error"
      />
      <LoadingModal open={showLoading} />
      <Form onSubmit={handleSubmit}>
        <LabeledInput label="Engine Name" error={nameErr} required>
          <TextInput
            placeholder="Engine Name, 3 or more characters"
            type="text"
            onChange={onNameChange}
            required
            clear
          />
        </LabeledInput>
        <LabeledInput label="Version" error={versionErr} required>
          <TextInput placeholder="1.0.0" type="text" required onChange={onVersionChange} clear />
        </LabeledInput>
        <LabeledInput label="Operating System" required>
          <SelectInput
            options={[
              { value: 'windows', label: 'Windows' },
              { value: 'linux', label: 'Linux' },
              { value: 'darwin', label: 'macOS' },
            ]}
            onSelect={setOs}
            defaultValue={defaultOS}
          />
        </LabeledInput>
        <LabeledInput label="Architecture" required>
          <SelectInput
            options={[
              { value: 'amd64', label: 'AMD64' },
              { value: 'arm64', label: 'ARM64' },
            ]}
            onSelect={setArch}
            defaultValue={defaultArch}
          />
        </LabeledInput>
        <LabeledInput label="Required Capabilities" error={capErr}>
          <TextInput
            placeholder="AVX2, SSE4.1, SSE4.2, ..."
            type="text"
            onChange={onCapChange}
            clear
          />
        </LabeledInput>
        <LabeledInput label="Binary" required>
          <FileInput required onUpload={setBinary} />
        </LabeledInput>
        <FormSubmitButton disabled={!isValid()}>Upload</FormSubmitButton>
      </Form>
    </>
  )
}
