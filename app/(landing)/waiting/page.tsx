import Icon from '@/components/(media)/Icon/Icon'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Email Confirmation',
  description: 'Waiting for the email address to be confirmed.',
}

export default function Waiting() {
  const strategy = serverStrategy()

  //? If jwt is available, redirect to home page
  if (strategy.store.jwt.available) {
    redirect('/')
  }

  return (
    <article className="flex min-h-screen w-screen flex-col items-center justify-center gap-12">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex max-w-md flex-row items-center gap-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-blue-500 p-2 text-blue-500">
            <Icon name="email-read" />
          </div>
          <h1 className="text-2xl font-medium text-blue-700">
            Please check your emails, to confirm your new account.
          </h1>
        </div>
        <p className="max-w-xl text-center text-lg font-medium text-on-primary-light">
          We are happy to have you here! You received an email with a confirmation link. It will
          redirect you back to Ivy Chess Manager. When you are already logged in on another tab,
          simply refresh this page.
        </p>
      </div>
      <div className="flex flex-row gap-0 text-base font-normal text-on-primary-light">
        <span>You don&apos;t want to be here? Go back to&nbsp;</span>
        <Link href="/login" className="text-action-primary hover:text-action-primary-active">
          the login page.
        </Link>
      </div>
    </article>
  )
}
