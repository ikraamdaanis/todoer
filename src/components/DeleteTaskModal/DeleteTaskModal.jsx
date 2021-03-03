import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
  TaskModal,
  TaskModalBody,
  TaskModalFooter,
  DeleteTaskButton,
} from './DeleteTaskModalStyles'
import { deleteTask } from '../../store/actions/taskActions'
import { Spinner } from '../Spinner/Spinner'
import { useMenu } from '../../hooks/useMenu'

export const DeleteTaskModal = ({ task, setDeleteModalOpen }) => {
  const dispatch = useDispatch()

  const modal = useRef(null)
  const cancelButton = useRef(null)

  useMenu(modal, cancelButton, setDeleteModalOpen)

  return !task ? (
    <Spinner />
  ) : (
    <TaskModal ref={modal}>
      <TaskModalBody>
        <h3>
          Are you sure you want to delete <strong>{task.description}</strong>?
        </h3>
      </TaskModalBody>
      <TaskModalFooter>
        <DeleteTaskButton type='button' ref={cancelButton}>
          Cancel
        </DeleteTaskButton>
        <DeleteTaskButton
          type='button'
          className='delete'
          onClick={() => {
            dispatch(deleteTask(task.project, task.id))
            setDeleteModalOpen(false)
          }}
        >
          Delete
        </DeleteTaskButton>
      </TaskModalFooter>
    </TaskModal>
  )
}
