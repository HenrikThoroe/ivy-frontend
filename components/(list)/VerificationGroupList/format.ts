import { EngineInstance } from '@ivy-chess/model'

/**
 * Format an engine instance for display
 *
 * @param engine The engine instance to format
 * @returns The formatted engine instance
 */
export function formatEngine(engine: EngineInstance) {
  return `${engine.name} ${engine.version.major}.${engine.version.minor}.${engine.version.patch}`
}
