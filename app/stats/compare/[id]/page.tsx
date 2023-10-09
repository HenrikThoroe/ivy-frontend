import EngineConfigSlider from '@/components/EngineConfigSlider/EngineConfigSlider'
import EngineVerificationStats from '@/components/EngineVerificationStats/EngineVerificationStats'
import { EngineClient } from '@/lib/api/clients/EngineClient'
import { VerificationStatsClient } from '@/lib/api/clients/StatsClient'
import { VerificationGroupState, VerificationResult } from '@ivy-chess/model'

interface Props {
  params: {
    id: string
  }
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="flex-start flex h-1.5 w-full overflow-hidden rounded-lg bg-slate-300 font-sans text-xs font-medium">
      <div
        className="flex h-full items-baseline justify-center overflow-hidden break-all bg-pink-500 text-white"
        style={{
          width: `${progress * 100}%`,
        }}
      ></div>
    </div>
  )
}

function ProgressSection({ state }: { state: VerificationGroupState }) {
  return (
    <div className="flex flex-col items-start justify-center gap-8">
      <span className="text-base font-medium text-on-primary">Progress:</span>
      <div className="flex flex-col gap-4">
        {state.nodes.map((node, i) => (
          <div className="flex w-[30rem] flex-col gap-2">
            <span className="text-base font-light text-on-primary">
              Node {i + 1} ({node.node.name})
            </span>
            <ProgressBar progress={node.progress} />
          </div>
        ))}
      </div>
      <p className="max-w-[30rem] break-normal text-sm text-on-primary-light">
        Waiting until each node has reached the required number of games before displaying the
        results.
      </p>
    </div>
  )
}

export default async function Comparison({ params }: Props) {
  const statsClient = new VerificationStatsClient()
  const engineClient = new EngineClient()
  const group = await statsClient.unsafeGroup(params.id)
  const state = await statsClient.unsafeState(params.id)
  const configs = await engineClient.unsafeEngines()
  let result: VerificationResult | undefined = undefined

  if (state.hasResult) {
    result = await statsClient.unsafeResult(params.id)
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-32 px-8 py-10">
      {!result && <ProgressSection state={state} />}
      <EngineConfigSlider configs={configs} verificationGroup={group} />
      {result && <EngineVerificationStats group={group} results={result} />}
    </div>
  )
}
