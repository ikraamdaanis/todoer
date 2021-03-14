import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { TaskModal, TaskModalBody, TaskModalFooter, DeleteTaskButton } from './DeleteModalStyles'
import { useMenu } from '../../hooks'

export const DeleteModal = ({ id, detail, action, setDeleteModalOpen, project }) => {
  const dispatch = useDispatch()

  const modal = useRef(null)
  const cancelButton = useRef(null)

  useMenu(modal, cancelButton, setDeleteModalOpen)

  return (
    <TaskModal ref={modal}>
      <TaskModalBody>
        <h3>
          Are you sure you want to delete <strong>{detail}</strong>?
        </h3>
      </TaskModalBody>
      <TaskModalFooter>
        <DeleteTaskButton
          type='button'
          ref={cancelButton}
          onClick={() => setDeleteModalOpen(false)}
        >
          Cancel
        </DeleteTaskButton>
        <DeleteTaskButton
          type='button'
          className='delete'
          onClick={() => {
            dispatch(action(id, project))
            setDeleteModalOpen(false)
          }}
        >
          Delete
        </DeleteTaskButton>
      </TaskModalFooter>
    </TaskModal>
  )
}
