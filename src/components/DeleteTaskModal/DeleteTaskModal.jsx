import { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  TaskModal,
  TaskModalBody,
  TaskModalFooter,
  DeleteTaskButton,
} from './DeleteTaskModalStyles'
import { deleteTask } from '../../store/actions/taskActions'
import { useParams, useHistory } from 'react-router-dom'
import { Spinner } from '../Spinner/Spinner'

export const DeleteTaskModal = () => {
  const [taskToDelete, setTaskToDelete] = useState(null)

  const dispatch = useDispatch()
  const params = useParams()
  const history = useHistory()

  const modal = useRef(null)
  const cancelButton = useRef(null)

  const projectTasksDetails = useSelector(state => state.projectTasksDetails)
  const { tasks } = projectTasksDetails

  useEffect(() => {
    const toggleFocus = ({ target }) => {
      if (cancelButton.current?.contains(target)) {
        history.push(`/app/${params.id}`)
        return
      }
      !modal.current?.contains(target) && history.push(`/app/${params.id}`)
    }
    document.body.addEventListener('click', toggleFocus)
    return () => {
      document.body.removeEventListener('click', toggleFocus)
    }
  }, [])

  useEffect(() => {
    tasks && setTaskToDelete(tasks.filter(task => task.id === params.task)[0])
    console.log({ taskToDelete })
  }, [tasks])

  return !taskToDelete ? (
    <Spinner />
  ) : (
    <TaskModal ref={modal}>
      <TaskModalBody>
        <h3>
          Are you sure you want to delete{' '}
          <strong>{taskToDelete.description}</strong>?
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
            dispatch(deleteTask(taskToDelete.project, taskToDelete.id))
            history.push(`/app/${params.id}`)
          }}
        >
          Delete
        </DeleteTaskButton>
      </TaskModalFooter>
    </TaskModal>
  )
}
