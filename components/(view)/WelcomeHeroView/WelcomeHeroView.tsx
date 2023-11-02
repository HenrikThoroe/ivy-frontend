'use client'

import BishopDarkSVG from '@/components/(media)/(figures)/bishop-dark.svg'
import KingDarkSVG from '@/components/(media)/(figures)/king-dark.svg'
import KnightDarkSVG from '@/components/(media)/(figures)/knight-dark.svg'
import PawnDarkSVG from '@/components/(media)/(figures)/pawn-dark.svg'
import QueenDarkSVG from '@/components/(media)/(figures)/queen-dark.svg'
import RookDarkSVG from '@/components/(media)/(figures)/rook-dark.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Props {
  /**
   * The prompt to display.
   */
  prompt: string
}

const figures = [KingDarkSVG, QueenDarkSVG, RookDarkSVG, BishopDarkSVG, KnightDarkSVG, PawnDarkSVG]

/**
 * A hero view for landing pages.
 *
 * Displays a welcome message and a prompt.
 * The prompt should indicate, what action is expected
 * next from the user. Like "Sign in to your account."
 */
export default function WelcomeHeroView({ prompt }: Props) {
  const [idx, setIdx] = useState(0)

  //* Event Handler

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((old) => (old + 1) % figures.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  //* Render

  return (
    <section className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <div className="flex flex-row items-center gap-4">
          <Image src={figures[idx]} alt="Chess Figure" width={50} height={50} />
          <h1 className="text-5xl font-semibold text-on-primary">Welcome Back to</h1>
        </div>
        <h2 className="text-5xl font-extrabold text-sky-600">Ivy Chess Manager</h2>
      </div>
      <p className="text-center text-lg font-medium text-on-primary-light">{prompt}</p>
    </section>
  )
}
