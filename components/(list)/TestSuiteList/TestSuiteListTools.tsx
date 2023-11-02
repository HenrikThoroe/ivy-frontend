'use client'

import { useEditorMode } from '@/lib/api/auth/access/hooks'
import ListAction from '../List/ListAction'

/**
 * A set of tools for the test suite list header.
 * Contains a button to create a new test suite.
 */
export default function TestSuiteListTools() {
  const editor = useEditorMode()

  if (!editor) {
    return <></>
  }

  return (
    <div className="flex flex-row justify-end">
      <ListAction icon="add" variant="link" style="primary" href="/training/suites/create" />
    </div>
  )
}
