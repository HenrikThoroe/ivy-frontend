'use client'

import Icon from '@/components/(media)/Icon/Icon'
import AlertModal from '@/components/(modal)/AlertModal/AlertModal'
import LoadingModal from '@/components/(modal)/LoadingModal/LoadingModal'
import { clientStrategy, setupCredentials } from '@/lib/api/auth/strategy/client'
import { AuthClient } from '@/lib/api/clients/AuthClient'
import { useChangeListener } from '@/lib/hooks/useChangeListener'
import { customHandler } from '@/lib/util/handler'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import Form from '../(atoms)/Form/Form'
import FormSubmitButton from '../(atoms)/FormSubmitButton/FormSubmitButton'
import LabeledInput from '../(atoms)/LabeledInput/LabeledInput'
import TextInput from '../(atoms)/TextInput/TextInput'

const schema = {
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long.')
    .regex(/^[a-zA-Z0-9]+$/, 'Username must only contain alphanumeric characters.'),
}

/**
 * Client side sign up form.
 *
 * Asks the user for their email, freely choosen username and password.
 * When the credentials given, match the requirements the auth
 * API is called and a new account is requested. Depending on the server
 * settings, the user might need to confirm their email address.
 * If needed, the user is redirected to the waiting page.
 * Otherwise, the user is redirected to the home page and neccessary
 * credentials are stored in the browser.
 */
export default function SignUpForm() {
  const [email, onEmailChange, emailErr] = useChangeListener(schema.email)
  const [username, onUsernameChange, usernameErr] = useChangeListener(schema.username)
  const [password, onPasswordChange, passwordErr] = useChangeListener(schema.password)
  const [passRepeat, onPassRepeatChange, passRepeatErr] = useChangeListener(
    schema.password.refine((p) => p === password, 'Passwords do not match.')
  )

  const [showError, setShowError] = useState(false)
  const [error, setError] = useState<string>()
  const [showLoading, setShowLoading] = useState(false)
  const router = useRouter()

  const isValid = () =>
    email &&
    username &&
    password &&
    passRepeat &&
    !emailErr &&
    !usernameErr &&
    !passwordErr &&
    !passRepeatErr
      ? true
      : false

  //* Event Handler

  const handleSubmit = customHandler(async () => {
    if (!email || !password || !passRepeat || !username) {
      return
    }

    setShowLoading(true)

    const strategy = clientStrategy()
    const client = new AuthClient(strategy)
    const resp = await client.signUp(email, username, password)

    if (!resp.success) {
      setShowLoading(false)
      setError(resp.error.message)
      setShowError(true)
      return
    }

    if (resp.result.credentials) {
      await setupCredentials({ client, strategy, credentials: resp.result.credentials })
      router.push('/')
      router.refresh()
    } else {
      router.push('/waiting')
      router.refresh()
    }
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
        <LabeledInput label="Username" error={usernameErr} required>
          <TextInput placeholder="Name" type="text" required onChange={onUsernameChange} />
        </LabeledInput>
        <LabeledInput label="Password" error={passwordErr} required>
          <TextInput placeholder="••••••" type="password" required onChange={onPasswordChange} />
        </LabeledInput>
        <LabeledInput label="Password Repeat" error={passRepeatErr} required>
          <TextInput placeholder="••••••" type="password" required onChange={onPassRepeatChange} />
        </LabeledInput>
        <FormSubmitButton disabled={!isValid()}>
          <div className="flex flex-row items-center justify-center gap-2">
            <Icon name="login" />
            <span>Sign Up</span>
          </div>
        </FormSubmitButton>
      </Form>
    </>
  )
}
