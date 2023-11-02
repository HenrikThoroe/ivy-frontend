'use client'

import AddNodeModal from '@/components/(form)/CreateVerificationGroupForm/AddNodeModal'
import Icon from '@/components/(media)/Icon/Icon'
import LoadingModal from '@/components/(modal)/LoadingModal/LoadingModal'
import { useEditorMode } from '@/lib/api/auth/access/hooks'
import { clientStrategy } from '@/lib/api/auth/strategy/client'
import { VerificationStatsClient } from '@/lib/api/clients/StatsClient'
import {
  EngineConfig,
  EngineTestConfig,
  VerificationGroup,
  VerificationResult,
} from '@ivy-chess/model'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import EngineGalleryView from '../EngineGalleryView/EngineGalleryView'
import NoContentView from '../NoContentView/NoContentView'
import Section from '../SectionedView/Section'
import SectionedView from '../SectionedView/SectionedView'
import { parseGameCountData, parseWinRateData } from './parse'

interface Props {
  /**
   * The group to display.
   */
  group: VerificationGroup

  /**
   * The configurations of available engines.
   * Used to allow adding new nodes to the group.
   */
  configs: EngineConfig[]

  /**
   * The result of the verification.
   *
   * If undefined, the view will display an
   * alternative view to indicate that the
   * results are not yet available.
   */
  result?: VerificationResult
}

/**
 * A view that displays the results of a verification
 * group in a graphical format. Provides the
 * user with an easy to understand summary of the performance of
 * each node. Allows for adding and removal of existsing nodes.
 *
 * The view is split into four sections:
 * - Engine Configurations
 * - Games
 * - Win Rate
 * - Win/Defeat Rate
 */
export default function EngineCompareView(props: Props) {
  const { group, result, configs } = props
  const resultCount = result?.results.length ?? 0
  const [showAddModal, setShowAddModal] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const client = new VerificationStatsClient(clientStrategy())
  const router = useRouter()
  const editor = useEditorMode()

  //* Event Handler

  const handleAdd = async (config: EngineTestConfig) => {
    setShowLoading(true)
    await client.add(group.id, config)
    setShowLoading(false)
    router.refresh()
  }

  const handleRemove = async (config: EngineTestConfig) => {
    setShowLoading(true)
    await client.remove(group.id, config)
    setShowLoading(false)
    router.refresh()
  }

  //* UI

  const GameCountChart = <T,>({ data }: { data: T[] }) => (
    <BarChart data={data} width={500} height={250}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="wins" fill="#81dbd0" />
      <Bar dataKey="draws" fill="#fe936f" />
      <Bar dataKey="defeats" fill="#f16481" />
    </BarChart>
  )

  const OverflowContainer = ({ children }: { children: ReactNode }) => (
    <div className="w-full overflow-x-scroll">{children}</div>
  )

  const WinRateChart = <T,>({ data }: { data: T[] }) => (
    <BarChart data={data} width={300 * resultCount} height={500} barCategoryGap={40}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis unit="%" tickFormatter={(val) => `${(val * 100).toFixed(0)}`} />
      <Tooltip formatter={(val) => `${(+val * 100).toFixed(0)}%`} />
      <Legend />
      <Bar dataKey="white" fill="#cdc1ff" />
      <Bar dataKey="black" fill="#7371fc" />
      <Bar dataKey="total" fill="#aecbeb" />
    </BarChart>
  )

  const ChartCard = ({ title, children }: { title?: string; children: ReactNode }) => (
    <div className="h-max w-max p-2">
      <div className="flex w-max flex-col items-center justify-center gap-4 rounded-md py-6 pl-6 pr-12 shadow-card">
        {title && <span className="text-xl font-medium text-on-primary-light">{title}</span>}
        {children}
      </div>
    </div>
  )

  const DataView = ({ result }: { result: VerificationResult }) => (
    <>
      <Section title="Games">
        <OverflowContainer>
          <div className="flex flex-row items-center justify-start gap-6">
            {parseGameCountData(result).map((data, i) => (
              <ChartCard key={`game-count-chart-${i}`} title={`Node ${i + 1}`}>
                <GameCountChart data={data} />
              </ChartCard>
            ))}
          </div>
        </OverflowContainer>
      </Section>
      <Section title="Win Rate">
        <OverflowContainer>
          <ChartCard>
            <WinRateChart data={parseWinRateData(result, 'winRatio')} />
          </ChartCard>
        </OverflowContainer>
      </Section>
      <Section title="Win/Defeat Rate">
        <OverflowContainer>
          <ChartCard>
            <WinRateChart data={parseWinRateData(result, 'win2DefeatRatio')} />
          </ChartCard>
        </OverflowContainer>
      </Section>
    </>
  )

  const NoDataView = () => (
    <Section title="State">
      <NoContentView
        title="Waiting for results to come in..."
        message={`Engines can first be compared after the results of at least ${group.threshold} games for each node-base pair are available.`}
      />
    </Section>
  )

  const AddButton = () => (
    <button
      onClick={() => setShowAddModal(true)}
      className="flex cursor-pointer flex-row gap-2 rounded-full bg-cyan-900 p-2 text-sm text-on-secondary hover:bg-cyan-600"
    >
      <Icon name="add" />
    </button>
  )

  //* Render

  return (
    <>
      <LoadingModal open={showLoading} />
      <AddNodeModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAdd}
        configs={configs}
      />
      <SectionedView>
        <Section title="Engine Configurations" action={editor && <AddButton />}>
          <EngineGalleryView base={group.base} nodes={group.nodes} onRemoveNode={handleRemove} />
        </Section>
        {result ? <DataView result={result} /> : <NoDataView />}
      </SectionedView>
    </>
  )
}
