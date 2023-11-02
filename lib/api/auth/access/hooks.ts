import { useEffect, useState } from 'react'
import { clientStrategy } from '../strategy/client'
import { isContributor } from './roles'

/**
 * Checks whether the current user has access to
 * edit content.
 *
 * @returns Whether the user has editing enabled
 */
export function useEditorMode() {
  const [editingEnabled, setEditingEnabled] = useState(false)

  useEffect(() => {
    if (process.env.NODE_ENV === 'test') {
      setEditingEnabled(true)
      return
    }

    isContributor(clientStrategy()).then(setEditingEnabled)
  }, [])

  return editingEnabled
}
