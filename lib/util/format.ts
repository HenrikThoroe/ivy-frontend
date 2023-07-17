import { Move, Piece, UCILog } from '@ivy-chess/model'

export function formatMemSize(bytes: number, decimals: number = 2) {
  const k = 1000
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${units[i]}`
}

export function formatPosition(position: number) {
  const row = Math.floor(position / 8)
  const column = position % 8

  return `${String.fromCharCode(97 + column)}${8 - row}`
}

export function formatPiece(piece: Piece) {
  const type = piece.type === 'knight' ? 'n' : piece.type[0]
  return piece.color === 'white' ? type.toUpperCase() : type.toLowerCase()
}

export function formatMove(move: Move) {
  return `${formatPosition(move.source)}${formatPosition(move.target)}${
    move.promotion ? formatPiece(move.promotion) : ''
  }`
}

export function formatTime(nanoseconds: number): string {
  if (nanoseconds === 0) {
    return ''
  }

  const hour = 60 * 60 * 1000 * 1000 * 1000
  const minute = 60 * 1000 * 1000 * 1000
  const second = 1000 * 1000 * 1000
  const millisecond = 1000 * 1000
  const microsecond = 1000

  if (nanoseconds >= hour) {
    return `${Math.floor(nanoseconds / hour)}h${formatTime(nanoseconds % hour)}`
  }

  if (nanoseconds >= minute) {
    return `${Math.floor(nanoseconds / minute)}m${formatTime(nanoseconds % minute)}`
  }

  if (nanoseconds >= second) {
    return `${Math.floor(nanoseconds / second)}s${formatTime(nanoseconds % second)}`
  }

  if (nanoseconds >= millisecond) {
    return `${Math.floor(nanoseconds / millisecond)}ms${formatTime(nanoseconds % millisecond)}`
  }

  if (nanoseconds >= microsecond) {
    return `${Math.floor(nanoseconds / microsecond)}µs${formatTime(nanoseconds % microsecond)}`
  }

  return `${nanoseconds}ns`
}

export function formatScore(score: {
  value: number
  type: 'cp' | 'mate'
  lowerbound: boolean
  upperbound: boolean
}) {
  if (score.type === 'mate') {
    return `#${score.value}`
  }

  let res = `${score.value} cp`

  if (score.lowerbound) {
    res += ' (lowerbound)'
  }

  if (score.upperbound) {
    res += ' (upperbound)'
  }

  return res
}

export function decodeTime(time: string) {
  const readPart = (unit: string) => {
    const index = time.indexOf(unit)

    if (index === -1) {
      return 0
    }

    const value = Number.parseInt(time.slice(0, index))
    time = time.slice(index + 1)

    return value
  }

  const hour = readPart('h')
  const minute = readPart('m')
  const second = readPart('s')
  const millisecond = readPart('ms')
  const microsecond = readPart('µs')
  const nanosecond = readPart('ns')

  return (
    hour * 60 * 60 * 1000 * 1000 * 1000 +
    minute * 60 * 1000 * 1000 * 1000 +
    second * 1000 * 1000 * 1000 +
    millisecond * 1000 * 1000 +
    microsecond * 1000 +
    nanosecond
  )
}

export function formatLog(log: UCILog) {
  return log.messages
    .map((entry) => {
      if (entry.type === 'send') {
        return `> ${entry.value}`
      }

      return entry.value
    })
    .join('\n')
}
