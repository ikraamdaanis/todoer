import { useRef, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { completeTask, incompleteTask } from '../store/actions/taskActions'

export const useToggleComplete = (
  tasksToComplete,
  setTasksToComplete,
  tasksToNotComplete,
  setTasksToNotComplete,
  setIsUndoVisible
) => {
  const dispatch = useDispatch()

  const timer = useRef(null)

  const completeSelectedTask = useCallback(() => {
    tasksToComplete.forEach(task => {
      const { id, project } = task
      dispatch(completeTask(id, project))
    })
    timer.current = setTimeout(() => {
      setIsUndoVisible(false)
      setTasksToComplete([])
    }, 5000)
  }, [dispatch, tasksToComplete, setIsUndoVisible, setTasksToComplete])

  const notCompleteSelectedTask = useCallback(() => {
    tasksToNotComplete.forEach(task => {
      const { id, project } = task
      dispatch(incompleteTask(id, project))
    })
    setTasksToNotComplete([])
  }, [dispatch, tasksToNotComplete, setTasksToNotComplete])

  const cancelCompleteTask = () => {
    tasksToComplete.forEach(task => {
      const { id, project } = task
      dispatch(incompleteTask(id, project))
    })
    clearTimeout(timer.current)
    setTasksToComplete([])
    setIsUndoVisible(false)
  }

  const clearTimer = () => {
    clearTimeout(timer.current)
  }

  useEffect(() => {
    if (tasksToComplete.length) {
      completeSelectedTask()
    }
  }, [tasksToComplete, timer, completeSelectedTask])

  useEffect(() => {
    if (tasksToNotComplete.length) {
      notCompleteSelectedTask()
      setTasksToComplete([])
    }
  }, [tasksToNotComplete, notCompleteSelectedTask, setTasksToComplete])

  return [clearTimer, cancelCompleteTask]
}
