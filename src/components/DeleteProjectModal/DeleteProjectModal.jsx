import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
  TaskModal,
  TaskModalBody,
  TaskModalFooter,
  DeleteTaskButton,
} from '../DeleteTaskModal/DeleteTaskModalStyles'
import { Spinner } from '../Spinner/Spinner'
import { useMenu } from '../../hooks/useMenu'
import { deleteProject } from '../../store/actions/projectActions'

export const DeleteProjectModal = ({ project, setDeleteModalOpen }) => {
  const dispatch = useDispatch()

  const modal = useRef(null)
  const cancelButton = useRef(null)

  useMenu(modal, cancelButton, setDeleteModalOpen)

  return !project ? (
    <Spinner />
  ) : (
    <TaskModal ref={modal}>
      <TaskModalBody>
        <h3>
          Are you sure you want to delete <strong>{project.title}</strong>?
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
            dispatch(deleteProject(project))
            setDeleteModalOpen(false)
          }}
        >
          Delete
        </DeleteTaskButton>
      </TaskModalFooter>
    </TaskModal>
  )
}
