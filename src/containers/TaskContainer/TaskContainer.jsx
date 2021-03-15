import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'
import { TaskList } from './TaskContainerStyles'
import { TaskItem } from '../../components'

export const TaskContainer = ({
  tasks,
  overdue,
  project,
  isComplete,
  setTasksToComplete,
  setTasksToNotComplete,
  setIsUndoVisible,
  clearTimer,
  sortOptions,
  setDashboardTasks,
  setTasksLoading,
}) => {
  const [projectTaskList, setProjectTaskList] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    const { option, direction } = sortOptions
    if (option === 'createdAt') {
      setProjectTaskList(null)
      return
    }

    const tasksToSort = []
    const tasksToNotSort = []

    tasks?.forEach(task => {
      task[option] ? tasksToSort.push(task) : tasksToNotSort.push(task)
    })

    switch (option) {
      case 'description':
        tasksToSort.sort((a, b) => a[option].toLowerCase().localeCompare(b[option].toLowerCase()))
        break
      case 'dueDate':
        tasksToSort.sort((a, b) => new Date(a[option]) - new Date(b[option]))
        break
      default:
        tasksToSort.sort((a, b) => a[option] - b[option])
    }

    const data = tasksToSort.concat(tasksToNotSort)
    direction === 'desc' && data.reverse()

    setDashboardTasks(data)
    setProjectTaskList(data)
  }, [sortOptions, tasks, setDashboardTasks, id, isComplete])

  useEffect(() => {
    setTimeout(() => {
      overdue && setTasksLoading(false)
    }, 500)
  }, [overdue, setTasksLoading])

  return (
    <TaskList>
      {projectTaskList?.length
        ? projectTaskList
            ?.filter(task => task.isComplete === isComplete)

            .map(task => (
              <TaskItem
                key={task.id}
                task={task}
                setTasksToComplete={setTasksToComplete}
                setTasksToNotComplete={setTasksToNotComplete}
                setIsUndoVisible={setIsUndoVisible}
                clearTimer={clearTimer}
                currentProject={project}
              />
            ))
        : tasks
            ?.filter(task => task.isComplete === isComplete)
            .sort((a, b) => a.createdAt - b.createdAt)
            .map(task => (
              <TaskItem
                key={task.id}
                task={task}
                setTasksToComplete={setTasksToComplete}
                setTasksToNotComplete={setTasksToNotComplete}
                setIsUndoVisible={setIsUndoVisible}
                clearTimer={clearTimer}
                currentProject={project}
              />
            ))}
    </TaskList>
  )
}

TaskContainer.propTypes = {
  tasks: PropTypes.array,
  overdue: PropTypes.array,
  project: PropTypes.object,
  isComplete: PropTypes.bool,
  setTasksToComplete: PropTypes.func,
  setTasksToNotComplete: PropTypes.func,
  setIsUndoVisible: PropTypes.func,
  clearTimer: PropTypes.func,
  sortOptions: PropTypes.object,
  setDashboardTasks: PropTypes.func,
  setTasksLoading: PropTypes.func,
}
