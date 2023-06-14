'use client'

import React, { useState } from 'react'
import { ActionModalProps } from './ActionModal'

interface ChildProps {
  onClick?: () => void
}

interface Props {
  modal: React.ReactElement<ActionModalProps>
  children: React.ReactElement<ChildProps>
}

export default function WithModal(props: Props) {
  const { modal, children } = props
  const [show, setShow] = useState(false)

  return (
    <>
      {React.cloneElement(children, {
        onClick: () => {
          setShow(true)
        },
      })}
      {React.cloneElement(modal, {
        action: {
          ...modal.props.action,
          onClick: () => {
            setShow(false)
            modal.props.action.onClick()
          },
        },
        open: show,
        onClose: () => {
          setShow(false)
        },
      })}
    </>
  )
}
