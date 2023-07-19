'use client'

import { EngineVersion, Replay, ReplayStats } from '@ivy-chess/model'
import ReplayBoard from '../ChessBoard/ReplayBoard'
import PerformanceChart from './PerformanceCharts'
import { useState } from 'react'
import Link from 'next/link'
import Icon from '../Icon/Icon'

interface Props {
  replay: Replay
  stats: ReplayStats
}

function EngineInfo(props: { name: string; version: EngineVersion }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <span className="text-2xl font-bold">{props.name}</span>
      <span className="text-base font-light">
        {props.version.major}.{props.version.minor}.{props.version.patch}
      </span>
    </div>
  )
}

function Stats(props: { replay: Replay }) {
  const Row = ({ label, content }: { label: string; content: string }) => (
    <div className="flex w-full flex-row gap-4">
      <span className="mr-3 w-32 text-right text-xl font-bold">{label}:</span>
      <span className="text-xl">{content}</span>
    </div>
  )

  return (
    <div className="flex flex-col items-center gap-4">
      <Row
        label="Winner"
        content={`${props.replay.result.winner} (${props.replay.result.reason})`}
      />
      <Row
        label="Date"
        content={props.replay.date.toLocaleString('en-US', {
          dateStyle: 'long',
          timeStyle: 'medium',
        })}
      />
      <Row label="Driver" content={props.replay.driver.name} />
    </div>
  )
}

function Competitors(props: { replay: Replay }) {
  return (
    <div className="flex flex-row items-center gap-12">
      <EngineInfo
        name={props.replay.engines.white.name}
        version={props.replay.engines.white.version}
      />
      <span className="text-2xl"> vs. </span>
      <EngineInfo
        name={props.replay.engines.black.name}
        version={props.replay.engines.black.version}
      />
    </div>
  )
}

export default function ReplayInfo(props: Props) {
  const [selectedMove, setSelectedMove] = useState(0)

  return (
    <div className="flex w-full flex-col items-center justify-center gap-20 py-12">
      <Competitors replay={props.replay} />
      <Stats replay={props.replay} />
      <ReplayBoard moves={props.replay.history} start={selectedMove} />
      <PerformanceChart stats={props.stats} onSelectMove={setSelectedMove} />
      <Link
        className="flex flex-row gap-4 rounded-lg bg-action-primary px-8 py-4 text-base text-on-secondary hover:bg-action-primary-active"
        href={`/replays/${props.replay.id}/logs`}
      >
        <Icon name="assignment" />
        Show UCI Logs
      </Link>
    </div>
  )
}
