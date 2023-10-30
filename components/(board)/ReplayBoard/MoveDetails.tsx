import { formatMove, formatScore, formatTime } from '@/lib/util/format'
import { Color, MoveInfo } from '@ivy-chess/model'

interface Props {
  /**
   * The color of the player who made the move.
   */
  color: Color

  /**
   * The move information to display.
   */
  move: MoveInfo
}

/**
 * Displays the available information about a move.
 */
export default function MoveDetails(props: Props) {
  const { move: info, color } = props

  //* UI

  const Label = ({ children }: { children: React.ReactNode }) => {
    return (
      <span className="min-w-[50%] text-base font-medium text-on-primary-light">{children}</span>
    )
  }

  const SingleLineText = ({ label, value }: { label: string; value: string }) => {
    return (
      <div className="flex w-full flex-row items-center justify-start">
        <Label>{label}</Label>
        <span className="font-mono text-base text-on-primary">{value}</span>
      </div>
    )
  }

  const MultiLineText = ({ label, value }: { label: string; value: string }) => {
    return (
      <div className="flex w-full flex-col items-start justify-start gap-2 overflow-hidden rounded border p-2 shadow-inner">
        <Label>{label}</Label>
        <span className="w-full overflow-y-scroll pl-6 font-mono text-base text-on-primary">
          {value}
        </span>
      </div>
    )
  }

  //* Render

  return (
    <aside className="flex w-full flex-col items-center justify-center gap-5 p-6">
      <SingleLineText label="Color" value={color} />
      <SingleLineText label="Move" value={formatMove(info.move)} />
      {info.details.score && (
        <SingleLineText label="Score" value={formatScore(info.details.score)} />
      )}
      {info.details.time && (
        <SingleLineText label="Time" value={formatTime(info.details.time * 1e6)} />
      )}
      {info.details.depth && <SingleLineText label="Depth" value={info.details.depth.toString()} />}
      {info.details.selDepth && (
        <SingleLineText label="Selective Depth" value={info.details.selDepth.toString()} />
      )}
      {info.details.nodes && (
        <SingleLineText label="Nodes Searched" value={info.details.nodes.toPrecision(5)} />
      )}
      {info.details.nps && (
        <SingleLineText label="Nodes Per Second" value={info.details.nps.toPrecision(5)} />
      )}
      {info.details.hashFull && (
        <SingleLineText
          label="Hash Utilization"
          value={(info.details.hashFull / 10).toString() + '%'}
        />
      )}
      {info.details.tbHits && (
        <SingleLineText label="Tablebase Hits" value={info.details.tbHits.toString()} />
      )}
      {info.details.sbhits && (
        <SingleLineText label="Shredder Hits" value={info.details.sbhits.toString()} />
      )}
      {info.details.cpuLoad && (
        <SingleLineText label="CPU Load" value={(info.details.cpuLoad / 10).toString() + '%'} />
      )}
      {info.details.currentMove && (
        <SingleLineText label="Current Move" value={info.details.currentMove} />
      )}
      <MultiLineText label="FEN" value={info.fen} />
      {info.details.pv && (
        <MultiLineText label="Principal Variation" value={info.details.pv.join(' → ')} />
      )}
      {info.details.refutation && (
        <MultiLineText label="Principal Variation" value={info.details.refutation.join(' → ')} />
      )}
      {info.details.string && (
        <MultiLineText label="Principal Variation" value={info.details.string} />
      )}
    </aside>
  )
}
