'use client'

import moment from 'moment'
import Form from '../Form/Form'
import FormSubmitButton from '../Form/FormSubmitButton'
import LabeledInput from '../Form/LabeledInput'
import SelectInput from '../Form/SelectInput'
import TextInput from '../Form/TextInput'
import { encodeReplayFilterOptions, useReplayFilterOptions } from '@/lib/data/Replay'
import { usePathname, useRouter } from 'next/navigation'
import { decodeTime, formatTime } from '@/lib/util/format'
import { FormEvent, useCallback } from 'react'

interface Props {
  onChanged?: () => void
}

function formatDate(date?: Date) {
  if (!date) {
    return undefined
  }

  return moment(date).format('YYYY-MM-DD')
}

function parseDate(str: string) {
  const date = moment(str)

  if (date.isValid()) {
    return date.toDate()
  }

  return undefined
}

export default function ReplayFilterForm(props: Props) {
  const filterOptions = useReplayFilterOptions()
  const router = useRouter()
  const pathname = usePathname()

  const defaultValues = useCallback(
    () => ({
      limit: filterOptions.limit?.toString() ?? '',
      engine: filterOptions.engine ?? '',
      winner: filterOptions.winner ?? ('' as const),
      date: formatDate(filterOptions.date),
      since: formatDate(filterOptions.since),
      age: filterOptions.age ? formatTime(filterOptions.age * 1000 * 1000 * 1000) : '',
    }),
    [filterOptions]
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const encoded = encodeReplayFilterOptions(filterOptions)
    const params = new URLSearchParams(Array.from(encoded))
    let url = pathname

    if (encoded.size > 0) {
      url += '?' + params.toString()
    }

    router.replace(url)

    if (props.onChanged) {
      props.onChanged()
    }
  }

  const setAge = (val: string) => {
    const time = decodeTime(val)

    if (!isNaN(time) && time > 0) {
      filterOptions.age = time / 1000 / 1000 / 1000
    } else {
      filterOptions.age = undefined
    }
  }

  const setLimit = (val: string) => {
    const limit = parseInt(val)

    if (!isNaN(limit) && limit > 0) {
      filterOptions.limit = limit
    } else {
      filterOptions.limit = undefined
    }
  }

  return (
    <div className="px-4 py-2">
      <Form onSubmit={handleSubmit}>
        <LabeledInput label="Limit">
          <TextInput
            type="number"
            placeholder="Maximum number of replays"
            defaultValue={defaultValues().limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </LabeledInput>
        <LabeledInput label="Engine">
          <TextInput
            type="text"
            placeholder="Engine Name"
            defaultValue={defaultValues().engine}
            onChange={(e) => (filterOptions.engine = e.target.value)}
          />
        </LabeledInput>
        <LabeledInput label="Winner">
          <SelectInput
            defaultValue={defaultValues().winner}
            options={[
              { value: '', label: 'Any' },
              { value: 'white', label: 'White' },
              { value: 'black', label: 'Black' },
              { value: 'draw', label: 'Draw' },
            ]}
            onSelect={(val) => {
              if (val !== '') {
                filterOptions.winner = val
              } else {
                filterOptions.winner = undefined
              }
            }}
          />
        </LabeledInput>
        <LabeledInput label="Date">
          <TextInput
            type="date"
            placeholder="Date of recording"
            defaultValue={defaultValues().date}
            onChange={(e) => (filterOptions.date = parseDate(e.target.value))}
          />
        </LabeledInput>
        <LabeledInput label="Since">
          <TextInput
            type="date"
            placeholder="Date since recording"
            defaultValue={defaultValues().since}
            onChange={(e) => (filterOptions.since = parseDate(e.target.value))}
          />
        </LabeledInput>
        <LabeledInput label="Age">
          <TextInput
            type="text"
            placeholder="Time since recording (2h3m4s)"
            pattern="([0-9]+h){0,1}([0-9]+m){0,1}([0-9]+s){0,1}"
            defaultValue={defaultValues().age}
            onChange={(e) => setAge(e.target.value)}
          />
        </LabeledInput>
        <FormSubmitButton>Apply Filter Rules</FormSubmitButton>
      </Form>
    </div>
  )
}
