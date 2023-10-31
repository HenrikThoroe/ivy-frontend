'use client'

import LabeledEngineCard from '@/components/(card)/LabeledEngineCard/LabeledEngineCard'
import { EngineTestConfig } from '@ivy-chess/model'

interface Props {
  /**
   * The base engine configuration.
   * Cannot be removed.
   */
  base: EngineTestConfig

  /**
   * The nodes to display.
   * When more than one node is present, a remove button is displayed.
   */
  nodes: EngineTestConfig[]

  /**
   * Called when a node should be removed.
   */
  onRemoveNode?: (node: EngineTestConfig) => void
}

/**
 * A horizontal gallery of engine configurations.
 * Each node in the gallery is labeled. The base node is labeled "Base"
 * and the nodes are labeled "Node 1", "Node 2", etc.
 *
 * When more than one node is present, a remove button is displayed for each node.
 *
 * The view is scrollable horizontally and restricted to a maximum width of `65vw`.
 */
export default function EngineGalleryView(props: Props) {
  const { base, nodes, onRemoveNode } = props

  //* Event Handler

  const handleRemove = (index: number) => onRemoveNode && onRemoveNode(nodes[index])

  //* Render

  return (
    <section className="w-full max-w-[65vw] overflow-x-scroll">
      <div className="flex w-max flex-row items-center justify-center gap-6 bg-gradient-radial from-slate-200 via-slate-50 to-transparent p-6">
        <LabeledEngineCard label="Base" config={base} />
        {nodes.map((node, i) => (
          <LabeledEngineCard
            label={`Node ${i + 1}`}
            config={node}
            onRemove={nodes.length > 1 ? () => handleRemove(i) : undefined}
          />
        ))}
      </div>
    </section>
  )
}
