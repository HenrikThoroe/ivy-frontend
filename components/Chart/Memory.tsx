'use client'

import { MemoryDistribution } from '@/lib/data/Device'
import { chartColor } from '@/lib/util/colors'
import React, { memo } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Text } from 'recharts'

interface Props {
  mem: MemoryDistribution
}

function MemoryChart(props: Props) {
  const data = props.mem.map((m) => ({
    label: `${m.capacity}`,
    value: m.devices,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 20,
          bottom: 20,
        }}
      >
        <XAxis
          dataKey="label"
          label={
            <Text x={300} y={270} lineHeight={16} textAnchor="middle">
              Memory (GB)
            </Text>
          }
        />
        <YAxis
          label={
            <Text x={-10} y={0} dx={50} dy={150} offset={0} angle={-90}>
              #Devices
            </Text>
          }
        />
        <Line
          type="basis"
          dataKey="value"
          stroke={chartColor(0, 1)}
          isAnimationActive={false}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default memo(MemoryChart)
