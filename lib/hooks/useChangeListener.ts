import { ChangeEvent, useState } from 'react'
import { z } from 'zod'

/**
 * Hook, that returns a tuple of the current value, a change handler and an error message.
 * The change handler will parse the input value with the given schema and update the value and error message accordingly.
 * If the input value is not valid, the value will be set to `undefined` and the error message will be set to the error message of the schema.
 * If the input value is valid, the value will be set to the parsed value and the error message will be set to `undefined`.
 *
 * @param schema The schema to parse the input value with. Should provide useful error messages.
 * @param defaultValue The default value to use.
 * @returns A tuple of the current value, a change handler and an error message.
 */
export function useChangeListener<T extends z.ZodType>(schema: T, defaultValue?: z.infer<T>) {
  const [value, setValue] = useState<z.infer<T> | undefined>(defaultValue)
  const [error, setError] = useState<string | undefined>(undefined)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value === '') {
      setValue(undefined)
      setError(undefined)
      return
    }

    const result = schema.safeParse(value)

    if (result.success) {
      setValue(result.data)
      setError(undefined)
    } else {
      setValue(undefined)
      setError(result.error.issues[0].message)
    }
  }

  return [value, onChange, error] as const
}
