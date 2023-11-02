import SignInForm from '@/components/(form)/SignInForm/SignInForm'
import WelcomeHeroView from '@/components/(view)/WelcomeHeroView/WelcomeHeroView'
import Link from 'next/link'

export const metadata = {
  title: 'Ivy - Login',
  description: 'Login to your account',
}

export default function Login() {
  return (
    <article className="flex w-full flex-col items-center justify-center gap-6 py-12">
      <WelcomeHeroView prompt="Sign in to your account below." />
      <div>
        <SignInForm />
        <div className="flex flex-row gap-2 font-medium">
          <span>Not a member yet?</span>
          <Link href="/register" className="text-action-primary hover:text-action-primary-active">
            Join the community!
          </Link>
        </div>
      </div>
    </article>
  )
}
