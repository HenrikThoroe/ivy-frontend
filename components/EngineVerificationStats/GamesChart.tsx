'use client'

import { NodeResult } from '@ivy-chess/model'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'

interface Data {
  name: string
  wins: number
  draws: number
  defeats: number
}

interface Props {
  result: NodeResult
}

export default function GamesChart(props: Props) {
  const data: Data[] = [
    {
      name: 'White',
      wins: props.result.performance.white.wins,
      draws: props.result.performance.white.draws,
      defeats: props.result.performance.white.defeats,
    },
    {
      name: 'Black',
      wins: props.result.performance.black.wins,
      draws: props.result.performance.black.draws,
      defeats: props.result.performance.black.defeats,
    },
    {
      name: 'Total',
      wins: props.result.performance.accumulated.wins,
      draws: props.result.performance.accumulated.draws,
      defeats: props.result.performance.accumulated.defeats,
    },
  ]

  return (
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
}
