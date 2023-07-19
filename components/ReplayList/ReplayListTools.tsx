'use client'

import { useState } from 'react'
import ListAction from '../List/ListAction'
import Modal from '../Modal/Modal'
import ReplayFilterForm from './ReplayFilterForm'

export default function ReplayListTools() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <ReplayFilterForm onChanged={() => setShowModal(false)} />
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
