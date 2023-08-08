import { VerificationGroup, VerificationResult } from '@ivy-chess/model'
import GamesChart from './GamesChart'
import WinRateChart from './WinRateChart'

interface Props {
  group: VerificationGroup
  results: VerificationResult
}

function ChartLabel(props: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-base font-medium text-on-primary">{props.label}</span>
      {props.children}
    </div>
  )
}

function SectionLabel(props: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full max-w-full flex-col items-center gap-8">
      <span className="text-3xl font-bold text-on-primary">{props.label}</span>
      {props.children}
    </div>
  )
}

export default function EngineVerificationStats(props: Props) {
  return (
    <div className="flex w-full flex-col gap-20">
      <SectionLabel label="Games">
        <div className="flex w-full flex-row flex-wrap justify-start gap-6">
          {props.results.results.map((result, i) => (
            <ChartLabel label={`Node ${i + 1}`}>
              <GamesChart result={result} />
            </ChartLabel>
          ))}
        </div>
      </SectionLabel>
      <SectionLabel label="Win Rate">
        <div className="flex w-full max-w-[70vw] flex-row items-start justify-start overflow-x-scroll px-6">
          <WinRateChart target="wr" results={props.results.results} />
        </div>
      </SectionLabel>
      <SectionLabel label="Win To Defeat Rate">
        <div className="flex w-full max-w-[70vw] flex-row items-start justify-start overflow-x-scroll px-6">
          <WinRateChart target="w2dr" results={props.results.results} />
        </div>
      </SectionLabel>
    </div>
  )
}
