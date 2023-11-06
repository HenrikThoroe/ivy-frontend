'use client'

import Icon, { IconName } from '@/components/(media)/Icon/Icon'
import AlertModal from '@/components/(modal)/AlertModal/AlertModal'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

interface ButtonProps {
  label: string
  style: 'error' | 'primary'
  onClick: () => void
  icon: IconName
}

export default function Error({ error, reset }: Props) {
  const router = useRouter()
  const [showError, setShowError] = useState(false)
  const [message, setMessage] = useState<string>()

  //* Event Handler

  const handleRetry = () => {
    reset()
    router.refresh()
    window.location.reload()
  }

  const handleShowError = () => {
    setMessage(error.message)
    setShowError(true)
  }

  //* UI

  const Button = ({ label, style, onClick, icon }: ButtonProps) => (
    <button
      onClick={onClick}
      className={classNames(
        'flex flex-row justify-start gap-1 rounded-md px-4 py-2 font-medium text-on-secondary shadow-md hover:shadow-none',
        {
          'bg-action-destructive hover:bg-action-destructive-active': style === 'error',
          'bg-action-primary hover:bg-action-primary-active': style === 'primary',
        }
      )}
    >
      <Icon name={icon} />
      {label}
    </button>
  )

  //* Render

  return (
    <>
      <AlertModal
        title="Error"
        description={message ?? 'Unknown error'}
        icon="error"
        variant="error"
        open={showError}
        onClose={() => setShowError(false)}
      />
      <article className="flex h-screen w-screen flex-col items-center justify-center gap-8 p-12">
        <h1 className="bg-gradient-to-br from-orange-400 to-red-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
          Whoopsie!
        </h1>
        <p className="w-[40rem] max-w-full text-center text-lg font-medium text-on-primary">
          Something happened that should not have happened... But how are you doing today?
          Everything alright? Here&apos;s a duck for you: 🦆
        </p>
        <div className="mt-12 flex flex-row gap-4">
          <Button label="Show Error" style="error" onClick={handleShowError} icon="error" />
          <Button label="Retry" style="primary" onClick={handleRetry} icon="replay" />
        </div>
      </article>
    </>
  )
}
