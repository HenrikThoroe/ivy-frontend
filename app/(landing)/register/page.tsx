import SignUpForm from '@/components/(form)/SignUpForm/SignUpForm'
import WelcomeHeroView from '@/components/(view)/WelcomeHeroView/WelcomeHeroView'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Ivy - Register',
  description: 'Register a new account.',
}

export default function Register() {
  const strategy = serverStrategy()

  //? If jwt is available, redirect to home page
  if (strategy.store.jwt.available) {
    redirect('/')
  }

  return (
    <article className="flex w-full flex-col items-center justify-center gap-6 py-12">
      <WelcomeHeroView prompt="Create a new account below." />
      <div>
        <SignUpForm />
        <div className="flex flex-row gap-2 font-medium">
          <span>Already been here?</span>
          <Link href="/login" className="text-action-primary hover:text-action-primary-active">
            Log into your account!
          </Link>
        </div>
      </div>
    </article>
  )
}
