'use client'

import ReplayBoard from '@/components/(board)/ReplayBoard/ReplayBoard'
import EngineTestConfigCard from '@/components/(card)/EngineTestConfigCard/EngineTestConfigCard'
import GameScoreChart from '@/components/(chart)/GameScoreChart/GameScoreChart'
import Icon from '@/components/(media)/Icon/Icon'
import { Replay, ReplayLog, ReplayStats } from '@ivy-chess/model'
import { ReactNode as Node, useState } from 'react'
import LogView from '../LogView/LogView'
import NoContentView from '../NoContentView/NoContentView'
import Section from '../SectionedView/Section'
import SectionedView from '../SectionedView/SectionedView'
import TabView from '../TabView/TabView'

interface Props {
  /**
   * The replay to display.
   */
  replay: Replay

  /**
   * The stats of the replay.
   */
  stats: ReplayStats

  /**
   * The logs of the replay if available.
   */
  logs?: ReplayLog
}

interface SectionProps {
  title: string
  children: Node
  action?: Node
}

/**
 * A client side view component that displays all information about a replay
 * including the game, stats, logs, and engine configurations.
 */
export default function ReplayView(props: Props) {
  const { replay, logs } = props
  const [startIdx, setStartIdx] = useState(0)

  //* UI

  const DownloadButton = () => (
    <a
      className="flex cursor-pointer flex-row gap-2 rounded-full bg-cyan-900 p-2 text-sm text-on-secondary hover:bg-cyan-600"
      download={`logs-${replay.id}.zip`}
      href={`/replays/${replay.id}/logs/download`}
    >
      <Icon name="download" />
    </a>
  )

  const Entry = ({ label, value }: { label: string; value: string }) => (
    <div className="flex w-full flex-row gap-x-2">
      <span className="w-32 text-base text-on-primary-light">{label}</span>
      <span className="text-base font-medium text-on-primary">{value}</span>
    </div>
  )

  const LogSection = ({ logs }: { logs: ReplayLog }) => (
    <TabView
      tabs={[
        {
          label: 'White',
          component: <LogView logs={logs.white} />,
        },
        {
          label: 'Black',
          component: <LogView logs={logs.black} />,
        },
      ]}
    />
  )

  //* Render

  return (
    <SectionedView>
      <Section title="Info">
        <div className="flex w-full flex-col gap-4">
          <Entry label="Result" value={`${replay.result.winner} (${replay.result.reason})`} />
          <Entry
            label="Date"
            value={replay.date.toLocaleString('en-US', {
              dateStyle: 'long',
              timeStyle: 'medium',
            })}
          />
          <Entry label="Driver" value={replay.driver.name} />
        </div>
      </Section>
      <Section title="Game">
        <ReplayBoard moves={replay.history} start={startIdx} />
      </Section>
      <Section title="Stats">
        <div className="flex w-max flex-col items-center justify-center gap-8 rounded-md p-4 shadow-card">
          <span className="text-xl font-medium text-on-primary-light">Score</span>
          <GameScoreChart stats={props.stats} onSelect={setStartIdx} />
        </div>
      </Section>
      <Section title="Competing Engines">
        <div className="flex w-full flex-row items-center justify-start gap-10">
          <EngineTestConfigCard engine={replay.engines.white} />
          <EngineTestConfigCard engine={replay.engines.black} />
        </div>
      </Section>
      <Section title="Logs" action={logs && <DownloadButton />}>
        {logs ? (
          <LogSection logs={logs} />
        ) : (
          <NoContentView
            title="Logs are no longer available!"
            message={
              'Logs are stored up to one hour after the replay was recorded. ' +
              'If you need the logs for further processing, download them right after the replay has finished.'
            }
          />
        )}
      </Section>
    </SectionedView>
  )
}
