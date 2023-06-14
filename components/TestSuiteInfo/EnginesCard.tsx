import { versionToString } from '@/lib/data/Engine'
import { EngineTestConfig } from '@/lib/data/Test'
import React from 'react'

interface Props {
  engine1: EngineTestConfig
  engine2: EngineTestConfig
}

function LabelCol({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-end gap-y-8">
      <span className="cursor-default opacity-0">_</span>
      {React.Children.map(children, (child) => (
        <span className="text-on-primary-light">{child}</span>
      ))}
    </div>
  )
}

function Col({ children, head }: { head: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-y-8 pl-12">
      <span className="self-center font-bold text-on-primary">{head}</span>
      {React.Children.map(children, (child) => (
        <span className="font-medium text-on-primary">{child}</span>
      ))}
    </div>
  )
}

export default function EnginesCard(props: Props) {
  const { engine1, engine2 } = props

  return (
    <div className="grid grid-cols-2-by-2 rounded-lg p-8 shadow-defined">
      <LabelCol>
        <span>Version</span>
        <span>Time Control Type</span>
        <span>Time Control Value</span>
        <span>Threads</span>
        <span>Hash</span>
      </LabelCol>
      <Col head={engine1.name}>
        {versionToString(engine1.version)}
        {engine1.timeControl.type}
        {engine1.timeControl.value}
        {engine1.options.threads}
        {engine1.options.hash}
      </Col>
      <Col head={engine2.name}>
        {versionToString(engine2.version)}
        {engine2.timeControl.type}
        {engine2.timeControl.value}
        {engine2.options.threads}
        {engine2.options.hash}
      </Col>
    </div>
  )
}
