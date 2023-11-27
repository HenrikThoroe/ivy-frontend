'use client'

import AlertModal from '@/components/(modal)/AlertModal/AlertModal'
import LoadingModal from '@/components/(modal)/LoadingModal/LoadingModal'
import { clientStrategy } from '@/lib/api/auth/strategy/client'
import { GameClient } from '@/lib/api/clients/GameClient'
import { customHandler } from '@/lib/util/handler'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Form from '../(atoms)/Form/Form'
import FormSeparator from '../(atoms)/FormSeparator/FormSeparator'
import FormSubmitButton from '../(atoms)/FormSubmitButton/FormSubmitButton'
import PlayerConfigForm, { PlayerConfig } from '../(compositions)/PlayerConfigForm/PlayerConfigForm'

/**
 * A form for creating a game.
 *
 * Renders a form for configuring parameters to create a new live game.
 * When the user submitts the form, the backend API will be called from the client
 * side component. On success, the user is redirected to the dedicated game page.
 */
export default function CreateGameForm() {
  const [white, setWhite] = useState<PlayerConfig | undefined>({ type: 'human' })
  const [black, setBlack] = useState<PlayerConfig | undefined>({ type: 'human' })
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState<string>()
  const [showLoading, setShowLoading] = useState(false)
  const router = useRouter()

  //* Event Handler

  const handleSubmit = customHandler(async () => {
    if (!white || !black) {
      return
    }

    setShowLoading(true)

    const client = new GameClient(clientStrategy())
    const res = await client.catchNetworkError(client.create({ players: { white, black } }))

    setShowLoading(false)

    if (!res.success) {
      setError(res.error.message)
      setShowError(true)
      return
    }

    router.push(`/games/${res.result.id}`)
  })

  //* Render

  return (
    <>
      <LoadingModal open={showLoading} />
      <AlertModal
        open={showError}
        onClose={() => setShowError(false)}
        icon="error"
        variant="error"
        title="Failed to create game!"
        description={error ?? ''}
      />
      <Form onSubmit={handleSubmit}>
        <FormSeparator label="White Player" />
        <PlayerConfigForm default={{ type: 'human' }} onChange={setWhite} />
        <FormSeparator label="Black Player" />
        <PlayerConfigForm default={{ type: 'human' }} onChange={setBlack} />
        <FormSubmitButton disabled={!white || !black}>Create Game</FormSubmitButton>
      </Form>
    </>
  )
}
