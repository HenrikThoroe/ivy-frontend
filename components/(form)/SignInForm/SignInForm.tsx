'use client'

import Icon from '@/components/(media)/Icon/Icon'
import AlertModal from '@/components/(modal)/AlertModal/AlertModal'
import LoadingModal from '@/components/(modal)/LoadingModal/LoadingModal'
import { clientStrategy, setupCredentials } from '@/lib/api/auth/strategy/client'
import { AuthClient, Credentials } from '@/lib/api/clients/AuthClient'
import { useChangeListener } from '@/lib/hooks/useChangeListener'
import { customHandler } from '@/lib/util/handler'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import Form from '../(atoms)/Form/Form'
import FormSubmitButton from '../(atoms)/FormSubmitButton/FormSubmitButton'
import LabeledInput from '../(atoms)/LabeledInput/LabeledInput'
import TextInput from '../(atoms)/TextInput/TextInput'

const schema = {
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
}

/**
 * Client side login form.
 *
 * Prompts the user to enter their email and password.
 * When credentials are valid, the user is redirected to the home page
 * and neccessary credentials are stored in the browser.
 *
 * When the user is navigating to the page containing the form
 * with a redirect hash, the credentials are parsed from the hash
 * and stored in the browser. The hash is commonly used, when the user
 * follows a link from an email after confirming their email address.
 */
export default function SignInForm() {
  const [email, onEmailChange, emailErr] = useChangeListener(schema.email)
  const [password, onPasswordChange, passwordErr] = useChangeListener(schema.password)
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState<string>()
  const [showLoading, setShowLoading] = useState(false)
  const router = useRouter()

  const isValid = () => (email && password && !emailErr && !passwordErr ? true : false)

  const parseHash = (): Credentials | undefined => {
    const hash = window.location.hash.replace('#', '')
    const parts = hash.split('&')
    const credentials: Partial<Credentials> = {}

    for (const part of parts) {
      const [key, value] = part.split('=')

      if (key === 'access_token') {
        credentials.jwt = value
      }

      if (key === 'refresh_token') {
        credentials.refreshToken = value
      }
    }

    if (credentials.jwt && credentials.refreshToken) {
      return {
        jwt: credentials.jwt,
        refreshToken: credentials.refreshToken,
      }
    }

    return undefined
  }

  //* Event Handler

  useEffect(() => {
    const credentials = parseHash()

    if (credentials) {
      const strategy = clientStrategy()

      setupCredentials({
        client: new AuthClient(strategy),
        strategy,
        credentials,
      }).then(() => {
        router.push('/')
        router.refresh()
      })
    }
  }, [])

  const handleSubmit = customHandler(async () => {
    if (!email || !password) {
      return
    }

    setShowLoading(true)

    //? Send sign in request and setup credentials

    const strategy = clientStrategy()
    const client = new AuthClient(strategy)
    const credentials = await client.signIn(email, password)

    if (!credentials.success) {
      setShowLoading(false)
      setError(credentials.error.message)
      setShowError(true)
      return
    }

    await setupCredentials({ client, strategy, credentials: credentials.result })

    //? Redirect to home page

    router.push('/')
    router.refresh()
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
        title="Not there yet!"
        description={error ?? ''}
      />
      <Form onSubmit={handleSubmit}>
        <LabeledInput label="Email" error={emailErr} required>
          <TextInput placeholder="my@email.com" type="email" required onChange={onEmailChange} />
        </LabeledInput>
        <LabeledInput label="Password" error={passwordErr} required>
          <TextInput placeholder="••••••" type="password" required onChange={onPasswordChange} />
        </LabeledInput>
        <FormSubmitButton disabled={!isValid()}>
          <div className="flex flex-row items-center justify-center gap-2">
            <Icon name="login" />
            <span>Sign In</span>
          </div>
        </FormSubmitButton>
      </Form>
    </>
  )
}
