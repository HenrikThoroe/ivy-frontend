'use client'

import { NodeResult } from '@ivy-chess/model'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'

interface Data {
  name: string
  total: number
  white: number
  black: number
}

interface Props {
  target: 'wr' | 'w2dr'
  results: NodeResult[]
}

export default function WinRateChart(props: Props) {
  const key = props.target === 'wr' ? 'winRatio' : 'win2DefeatRatio'
  const data = props.results.map((result, i) => ({
    name: `Node ${i + 1}`,
    total: result.performance.accumulated[key],
    white: result.performance.white[key],
    black: result.performance.black[key],
  }))

  return (
    <BarChart data={data} width={300 * props.results.length} height={500} barCategoryGap={40}>
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
}
