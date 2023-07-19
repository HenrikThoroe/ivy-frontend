'use client'

import { Color } from '@ivy-chess/model'
import { AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts'

export interface Data {
  name: string
  white: number
  black: number
}

interface Props<T extends Data> {
  onClick: (idx: number) => void
  label: string
  data: T[]
  tooltip?: (data: T, color: Color) => string
}

const colors = {
  white: '#075985',
  black: '#082f49',
}

export default function ColorChart<T extends Data>(props: Props<T>) {
  const { onClick, label, data, tooltip } = props

  return (
    <div className="flex flex-col items-start justify-center gap-4">
      <span className="text-lg text-on-primary">{label}</span>
      <AreaChart
        onClick={(e) => e.activeTooltipIndex && onClick(e.activeTooltipIndex)}
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

            if (data && color && tooltip) {
              return tooltip(data, color)
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
    </div>
  )
}
