import React from 'react'
import PropTypes from 'prop-types'
import {
  UndoNotification,
  UndoContainer,
  UndoText,
  UndoButton,
  UndoCloseButton,
} from './UndoCompleteStyles'
import { CloseIcon } from '../../assets'

export const UndoComplete = ({ tasksToComplete, cancelCompleteTask, setIsUndoVisible }) => {
  return (
    <UndoNotification>
      <UndoContainer>
        <UndoText>
          {tasksToComplete.length > 1
            ? `${tasksToComplete.length} tasks completed`
            : `${tasksToComplete.length} task completed`}
        </UndoText>
        <UndoButton type='button' onClick={() => cancelCompleteTask()}>
          Undo
        </UndoButton>
        <UndoCloseButton type='button' onClick={() => setIsUndoVisible(false)}>
          <CloseIcon />
        </UndoCloseButton>
      </UndoContainer>
    </UndoNotification>
  )
}

UndoComplete.propTypes = {
  tasksToComplete: PropTypes.array,
  cancelCompleteTask: PropTypes.func,
  setIsUndoVisible: PropTypes.func,
}
