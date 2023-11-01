import NavCard from '@/components/(card)/NavCard/NavCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ivy - Stats',
  description: 'Different statistics about engines and replays',
}

export default async function Stats() {
  return (
    <article className="flex flex-row items-center justify-center gap-10 py-10">
      <NavCard
        label="Compare Engines"
        href="/stats/compare"
        description={
          'The place where you can compare different sets of engines. ' +
          'A useful tool for regression testing!'
        }
      />
    </article>
  )
}
