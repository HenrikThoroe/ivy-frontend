import TextCard from '@/components/Card/Text'

export default async function Stats() {
  return (
    <div className="div flex flex-row items-center justify-center gap-10 py-10">
      <TextCard
        href="/stats/compare"
        icon="stats"
        title="Regression Testing"
        description={
          'Create comparision groups and compare engine configurations against base config. ' +
          'Can be used to compare new versions or flags against previous version.'
        }
      />
    </div>
  )
}
