'use client'

import { ReplayFilterOptions } from '@/lib/api/clients/ReplayClient'
import { useChangeListener } from '@/lib/hooks/useChangeListener'
import { useReplayFilterOptions } from '@/lib/hooks/useReplayFilterOptions'
import { buildSearchParams } from '@/lib/util/buildSearchParams'
import { decodeTime, formatTime } from '@/lib/util/format'
import { customHandler } from '@/lib/util/handler'
import { shared } from '@ivy-chess/api-schema'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import Form from '../../(form)/(atoms)/Form/Form'
import FormSubmitButton from '../../(form)/(atoms)/FormSubmitButton/FormSubmitButton'
import LabeledInput from '../../(form)/(atoms)/LabeledInput/LabeledInput'
import SelectInput from '../../(form)/(atoms)/SelectInput/SelectInput'
import TextInput from '../../(form)/(atoms)/TextInput/TextInput'
import { formatDate } from './format'

interface Props {
  /**
   * Called when the user submits the form
   * after changing the filter options.
   */
  onChanged?: () => void
}

const schema = {
  limit: z.coerce.number().int().positive().max(100),
  engine: shared.engine.engineNameSchema,
  date: z.coerce.date(),
  since: z.coerce.date(),
  age: z
    .string()
    .regex(/^([0-9]+h){0,1}([0-9]+m){0,1}([0-9]+s){0,1}$/g, 'Value must be in the format "1h2m3s"')
    .transform(decodeTime)
    .transform((ns) => ns / 1000 / 1000 / 1000),
}

/**
 * A prompt that allows the user to filter the replay list.
 *
 * The filter options are stored in the URL query string.
 * When the user submits the form, the URL is updated with the new filter options.
 */
export default function ReplayFilterPrompt(props: Props) {
  const filterOptions = useReplayFilterOptions()
  const router = useRouter()
  const pathname = usePathname()

  const [date, onDateChange, dateErr] = useChangeListener(schema.date, filterOptions.date)
  const [since, onSinceChange, sinceErr] = useChangeListener(schema.since, filterOptions.since)
  const [age, onAgeChange, ageErr] = useChangeListener(schema.age, filterOptions.age)
  const [winner, setWinner] = useState(filterOptions.winner)
  const [limit, onLimitChange, limitErr] = useChangeListener(schema.limit, filterOptions.limit)
  const [engine, onEngineChange, engineErr] = useChangeListener(schema.engine, filterOptions.engine)

  const isValid = () => (dateErr || sinceErr || ageErr || limitErr || engineErr) === undefined

  //* Event Handler

  const handleSubmit = customHandler(() => {
    const options: ReplayFilterOptions = { limit, engine, date, since, age, winner }
    const params = buildSearchParams(options)
    const encoded = params.toString()

    let url = pathname

    if (encoded.length > 0) {
      url += '?' + params.toString()
    }

    router.replace(url)

    if (props.onChanged) {
      props.onChanged()
    }
  })

  //* Render

  return (
    <aside className="px-4 py-2">
      <Form onSubmit={handleSubmit}>
        <LabeledInput label="Limit" error={limitErr}>
          <TextInput
            type="number"
            placeholder="Maximum number of replays"
            defaultValue={filterOptions.limit}
            onChange={onLimitChange}
            clear
          />
        </LabeledInput>
        <LabeledInput label="Engine" error={engineErr}>
          <TextInput
            type="text"
            placeholder="Engine Name"
            defaultValue={filterOptions.engine}
            onChange={onEngineChange}
            clear
          />
        </LabeledInput>
        <LabeledInput label="Winner">
          <SelectInput
            defaultValue={filterOptions.winner}
            options={[
              { value: '', label: 'Any' },
              { value: 'white', label: 'White' },
              { value: 'black', label: 'Black' },
              { value: 'draw', label: 'Draw' },
            ]}
            onSelect={(val) => setWinner(val === '' ? undefined : val)}
          />
        </LabeledInput>
        <LabeledInput label="Date" error={dateErr}>
          <TextInput
            type="date"
            placeholder="Date of recording"
            defaultValue={formatDate(filterOptions.date)}
            onChange={onDateChange}
            clear
          />
        </LabeledInput>
        <LabeledInput label="Since" error={sinceErr}>
          <TextInput
            type="date"
            placeholder="Date since recording"
            defaultValue={formatDate(filterOptions.since)}
            onChange={onSinceChange}
            clear
          />
        </LabeledInput>
        <LabeledInput label="Age" error={ageErr}>
          <TextInput
            type="text"
            placeholder="Time since recording (2h3m4s)"
            pattern="([0-9]+h){0,1}([0-9]+m){0,1}([0-9]+s){0,1}"
            defaultValue={filterOptions.age && formatTime(filterOptions.age * 1000 * 1000 * 1000)}
            onChange={onAgeChange}
            clear
          />
        </LabeledInput>
        <FormSubmitButton disabled={!isValid()}>Apply Filter Rules</FormSubmitButton>
      </Form>
    </aside>
  )
}
