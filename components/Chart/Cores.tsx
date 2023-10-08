'use client'

import { CPUDistribution } from '@/lib/data/DeviceInfo'
import { chartColor } from '@/lib/util/colors'
import { memo } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

interface Props {
  cpus: CPUDistribution
}

function CoresChart(props: Props) {
  const data = props.cpus.map((cpu) => ({
    name: `${cpu.cores}C/${cpu.threads}T`,
    value: cpu.amount,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={50}
          label={(entry) => entry.name}
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={chartColor(index, data.length)} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default memo(CoresChart)
