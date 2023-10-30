'use client'

import { Color, ReplayStats, mateScore } from '@ivy-chess/model'
import { useMemo } from 'react'
import { Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts'

interface Props {
  /**
   * The stats from which to generate the chart.
   */
  stats: ReplayStats

  /**
   * Called when a move is selected.
   * `move` is the selected plie index.
   */
  onSelect?: (move: number) => void
}

interface Data {
  name: string
  white: number
  black: number
  isMate: {
    white: boolean
    black: boolean
  }
}

const colors = {
  white: '#075985',
  black: '#082f49',
}

/**
 * A client side chart component that displays a game score over time.
 *
 * Displays the centipawn results of the given game stats over the course of the game.
 * Allows for selecting a move. If a move is selected, the onSelect callback is called
 * with the plie number.
 */
export default function GameScoreChart(props: Props) {
  const { stats, onSelect } = props

  const data = useMemo(() => {
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
  }, [props.stats])

  const formatTooltip = (color: Color, data: Data) => {
    if (data.isMate && data.isMate[color]) {
      return '#'
    } else {
      return `${data[color]} CP`
    }
  }

  //* Event Handler

  const select = (idx: number) => {
    if (onSelect) {
      const move = Math.max(Math.min(idx * 2 + 1, props.stats.moves - 1), 0)
      onSelect(move)
    }
  }

  //* Render

  return (
    <AreaChart
      onClick={(e) => e.activeTooltipIndex !== undefined && select(e.activeTooltipIndex)}
      width={730}
      height={250}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
    >
      <XAxis dataKey="name" minTickGap={20} />
      <YAxis />
      <Tooltip
        labelFormatter={(label) => `Move ${label}`}
        formatter={(val, name, _, idx, payload) => {
          const color = name as Color
          const data = payload[idx]?.payload

          if (data && color) {
            return formatTooltip(color, data)
          }

          return val
        }}
      />
      <Area
        type="monotone"
        dataKey="white"
        stroke={colors.white}
        fillOpacity={1}
        fill={colors.white}
        isAnimationActive={false}
      />
      <Area
        type="monotone"
        dataKey="black"
        stroke={colors.black}
        fillOpacity={1}
        fill={colors.black}
        isAnimationActive={false}
      />
    </AreaChart>
  )
}
