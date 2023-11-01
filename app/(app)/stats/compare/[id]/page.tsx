import EngineCompareView from '@/components/(view)/EngineCompareView/EngineCompareView'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { EngineClient } from '@/lib/api/clients/EngineClient'
import { VerificationStatsClient } from '@/lib/api/clients/StatsClient'
import { VerificationResult } from '@ivy-chess/model'
import { Metadata } from 'next'

interface Props {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: 'Ivy - Compare',
  description: 'Compare a set of engines',
}

export default async function Comparison({ params }: Props) {
  const statsClient = new VerificationStatsClient(serverStrategy())
  const engineClient = new EngineClient(serverStrategy())
  const group = await statsClient.unsafeGroup(params.id)
  const state = await statsClient.unsafeState(params.id)
  const configs = await engineClient.unsafeEngines()
  let result: VerificationResult | undefined = undefined

  if (state.hasResult) {
    result = await statsClient.unsafeResult(params.id)
  }

  return <EngineCompareView group={group} result={result} configs={configs} />
}
