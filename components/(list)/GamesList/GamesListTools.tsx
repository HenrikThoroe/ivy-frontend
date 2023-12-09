'use client'

import { useEditorMode } from '@/lib/api/auth/access/hooks'
import ListAction from '../List/ListAction'

/**
 * A set of tools for the games list.
 * Provides a button to create a new game.
 */
export default function GamesListTools() {
  const edit = useEditorMode()

  if (!edit) {
    return <></>
  }

  return (
    <div className="flex flex-row justify-end">
      <ListAction icon="add" variant="link" style="primary" href="/games/add" />
    </div>
  )
}
