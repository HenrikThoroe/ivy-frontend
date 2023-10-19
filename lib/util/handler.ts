import { SyntheticEvent } from 'react'

/**
 * Returns a handler, that prevents the default action and stops the propagation of the given event.
 *
 * @param action The action to execute.
 * @returns A handler, that prevents the default action and stops the propagation of the given event.
 */
export function customHandler<E extends SyntheticEvent>(action: (e: E) => Promise<void> | void) {
  return async (e: E) => {
    e.preventDefault()
    e.stopPropagation()
    await action(e)
  }
}
