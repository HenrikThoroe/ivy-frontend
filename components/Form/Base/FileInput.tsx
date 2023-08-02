'use client'

import { useEffect, useRef, useState } from 'react'
import Icon from '../../Icon/Icon'
import classNames from 'classnames'

interface Props {
  required?: boolean
  onUpload?: (file: File) => void
}

export default function FileInput(props: Props) {
  const ref = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<string | null>(null)
  const [invalid, setInvalid] = useState<boolean>(props.required ? true : false)

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

  const buildFilePreview = () => {
    return (
      <div className="flex flex-row items-center justify-center gap-2 rounded-lg bg-gray-200 p-3 text-action-primary hover:text-action-primary-active">
        <Icon name={file ? 'attach' : 'upload'} />
        {file && <span className="text-base font-medium">{file}</span>}
      </div>
    )
  }

  return (
    <label
      htmlFor="file-input"
      className={classNames(
        'flex w-full cursor-pointer flex-col items-center justify-center gap-4 rounded border-4 border-dashed border-gray-300 px-6 py-12',
        {
          'border-action-invalid': invalid,
        }
      )}
    >
      {buildFilePreview()}
      <div className="flex flex-col items-center justify-center gap-2 text-base text-on-primary">
        <span>Drag and drop your binary here, or</span>
        <span className="text-blue-800 hover:text-blue-600">click to select a file.</span>
      </div>
      <input type="file" className="hidden" id="file-input" ref={ref} required={props.required} />
    </label>
  )
}
