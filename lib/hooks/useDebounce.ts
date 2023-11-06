import { DependencyList, useEffect } from 'react'

type Effect = () => void | Promise<void>

/**
 * Debounce hook to throttle the execution interval of the effect.
 * Can be used to slow down the rate of re-fetching API data, when
 * the state is dependent on continuous user input.
 *
 * @param effect The effect to be executed
 * @param delay The delay in milliseconds between calls to the effect
 * @param dependencies The dependencies on which the effect depends
 */
export function useDebounce(effect: Effect, delay: number, dependencies?: DependencyList) {
  useEffect(() => {
    const id = setTimeout(effect, delay)
    return () => clearTimeout(id)
  }, dependencies)
}
