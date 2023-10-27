'use client'

import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Icon from '../../../(media)/Icon/Icon'

interface Props {
  /**
   * Id to use for the input element.
   * When using multiple file uploads,
   * different IDs must be used. Otherwise
   * only the first input will receive the
   * files, while the other act like proxies.
   *
   * @default 'file-input'
   */
  id?: string

  /**
   * Whether the input is required.
   */
  required?: boolean

  /**
   * Called when the user uploads a file.
   */
  onUpload?: (file: File) => void
}

/**
 * A styled, type-safe file input field.
 */
export default function FileInput(props: Props) {
  const ref = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<string | null>(null)
  const [invalid, setInvalid] = useState<boolean>(props.required ? true : false)
  const id = props.id ?? 'file-input'

  //* Event Handler

  useEffect(() => {
    const input = ref.current

    if (input) {
      input.addEventListener('change', async () => {
        const file = input.files?.item(0)

        if (file) {
          setInvalid(false)
          setFile(file.name)
          props.onUpload && props.onUpload(file)
        }
      })
    }
  }, [])

  //* UI

  const Preview = () => (
    <div className="flex flex-row items-center justify-center gap-2 rounded-lg bg-gray-200 p-3 text-action-primary hover:text-action-primary-active">
      <Icon name={file ? 'attach' : 'upload'} />
      {file && <span className="text-base font-medium">{file}</span>}
    </div>
  )

  //* Render

  return (
    <label
      htmlFor={id}
      className={classNames(
        'flex w-full cursor-pointer flex-col items-center justify-center gap-4 rounded border-4 border-dashed  px-6 py-12',
        {
          'border-action-invalid': invalid,
          'border-gray-300': !invalid,
        }
      )}
    >
      <Preview />
      <div className="flex flex-col items-center justify-center gap-2 text-base text-on-primary">
        <span>Drag and drop your binary here, or</span>
        <span className="text-blue-800 hover:text-blue-600">click to select a file.</span>
      </div>
      <input
        type="file"
        multiple={false}
        className="hidden"
        id={id}
        ref={ref}
        required={props.required}
      />
    </label>
  )
}
