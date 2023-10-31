import { VerificationResult } from '@ivy-chess/model'

/**
 * Parse the data for the game count chart.
 *
 * @param result The verification result.
 * @returns The data for the game count chart.
 */
export function parseGameCountData(result: VerificationResult) {
  return result.results.map((result) => [
    {
      name: 'White',
      wins: result.performance.white.wins,
      draws: result.performance.white.draws,
      defeats: result.performance.white.defeats,
    },
    {
      name: 'Black',
      wins: result.performance.black.wins,
      draws: result.performance.black.draws,
      defeats: result.performance.black.defeats,
    },
    {
      name: 'Total',
      wins: result.performance.accumulated.wins,
      draws: result.performance.accumulated.draws,
      defeats: result.performance.accumulated.defeats,
    },
  ])
}

/**
 * Parse the data for the win rate chart.
 *
 * @param result The verification result.
 * @param key Which win rate to parse.
 * @returns The data for the win rate chart.
 */
export function parseWinRateData(result: VerificationResult, key: 'winRatio' | 'win2DefeatRatio') {
  return result.results.map((result, i) => ({
    name: `Node ${i + 1}`,
    total: result.performance.accumulated[key],
    white: result.performance.white[key],
    black: result.performance.black[key],
  }))
}
