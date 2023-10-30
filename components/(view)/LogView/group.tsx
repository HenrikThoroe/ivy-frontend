import { UCILog, UCIMessage } from '@ivy-chess/model'

/**
 * Creates groups of messages from a log.
 *
 * Each input is a one-element group.
 * Consecutive output lines are grouped together.
 *
 * @param logs The log to group.
 * @returns The grouped log messages.
 */
export function groupLogMessages(logs: UCILog): UCIMessage[][] {
  const groups: UCIMessage[][] = []

  for (const msg of logs.messages) {
    if (groups.length === 0) {
      groups.push([msg])
    } else {
      const last = groups[groups.length - 1]

      if (last[0].type === msg.type && msg.type === 'recv') {
        last.push(msg)
      } else {
        groups.push([msg])
      }
    }
  }

  return groups
}
