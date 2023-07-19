'use client'

import { ReplayStats, mateScore } from '@ivy-chess/model'
import ColorChart, { Data } from './ColorChart'

interface Props {
  stats: ReplayStats
  onSelectMove?: (move: number) => void
}

interface WithMate extends Data {
  isMate?: {
    white: boolean
    black: boolean
  }
}

function createNormalizedData(stats: ReplayStats): Data[] {
  const len = Math.min(
    stats.performance.normalized.white?.length ?? 0,
    stats.performance.normalized.black?.length ?? 0
  )

  return Array.from({ length: len }, (_, i) => ({
    name: i.toString(),
    white: stats.performance.normalized.white![i],
    black: stats.performance.normalized.black![i],
  }))
}

function createCentipawnData(stats: ReplayStats): WithMate[] {
  const len = Math.min(
    stats.performance.centipawn.white?.length ?? 0,
    stats.performance.centipawn.black?.length ?? 0
  )

  const data = Array.from({ length: len }, (_, i) => ({
    name: i.toString(),
    white: stats.performance.centipawn.white![i],
    black: stats.performance.centipawn.black![i],
    isMate: {
      white: Math.abs(stats.performance.centipawn.white![i]) === mateScore,
      black: Math.abs(stats.performance.centipawn.black![i]) === mateScore,
    },
  }))

  const max = data
    .flatMap((d) => [d.white, d.black])
    .map((d) => Math.abs(d))
    .filter((d) => d < mateScore)
    .reduce((a, b) => Math.max(a, b))

  return data.map((d) => ({
    ...d,
    white: Math.abs(d.white) === mateScore ? Math.sign(d.white) * max : d.white,
    black: Math.abs(d.black) === mateScore ? Math.sign(d.black) * max : d.black,
  }))
}

export default function PerformanceChart(props: Props) {
  const selectMove = (idx: number) => {
    const move = Math.max(Math.min(idx * 2 + 1, props.stats.moves - 1), 0)

    if (props.onSelectMove) {
      props.onSelectMove(move)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <ColorChart
        onClick={selectMove}
        label="Score"
        data={createCentipawnData(props.stats)}
        tooltip={(data, color) => {
          if (data.isMate && data.isMate[color]) {
            return `#`
          } else {
            return `${data[color]} CP`
          }
        }}
      />
      <ColorChart
        onClick={selectMove}
        label="Normalized Score"
        data={createNormalizedData(props.stats)}
        tooltip={(data, color) => {
          return data[color]
            .toFixed(4)
            .toString()
            .replace(/[.]{0,1}0+$/, '')
        }}
      />
    </div>
  )
}
