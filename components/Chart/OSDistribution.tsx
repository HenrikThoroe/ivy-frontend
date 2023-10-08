'use client'

import { OSDistribution } from '@/lib/data/DeviceInfo'
import { chartColor } from '@/lib/util/colors'
import { memo } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

interface Props {
  os: OSDistribution
}

function OSDistributionChart(props: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="amount"
          isAnimationActive={false}
          data={props.os}
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={50}
          label={(entry) => `${entry.name} (${entry.amount})`}
          labelLine={false}
        >
          {props.os.map((_, index) => (
            <Cell key={`cell-${index}`} fill={chartColor(index, props.os.length)} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default memo(OSDistributionChart)
