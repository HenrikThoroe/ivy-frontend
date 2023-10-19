'use client'

import { useState } from 'react'
import Modal from '../../Modal/Modal'
import ListAction from '../List/ListAction'
import ReplayFilterPrompt from './ReplayFilterPrompt'

/**
 * A set of tools for the replay list header.
 * Contains a button to open the {@link ReplayFilterPrompt filter prompt}.
 */
export default function ReplayListTools() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <ReplayFilterPrompt onChanged={() => setShowModal(false)} />
      </Modal>
      <div className="flex flex-row justify-end">
        <ListAction
          icon="filter"
          variant="action"
          style="primary"
          onClick={() => setShowModal(true)}
        />
      </div>
    </>
  )
}
