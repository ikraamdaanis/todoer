import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { TaskItem } from '../../components'
import { TaskList, TaskListHeading } from '../TaskContainer/TaskContainerStyles'
import { format } from 'date-fns'

export const TodayTaskContainer = ({
  allTasks,
  loadingTasks,
  project,
  isComplete,
  setTasksToComplete,
  setTasksToNotComplete,
  setIsUndoVisible,
  clearTimer,
  currentTaskForm = '',
  setCurrentTaskForm = null,
}) => {
  const [overdueTasks, setOverdueTasks] = useState(null)

  useEffect(() => {
    !loadingTasks && setOverdueTasks(allTasks?.overdue)
  }, [allTasks, loadingTasks, project])

  return (
    <>
      {overdueTasks?.some(task => !task.isComplete) && (
        <>
          <TaskListHeading>
            <h3>Overdue</h3>
          </TaskListHeading>
          <TaskList className='overdue'>
            {overdueTasks
              ?.filter(task => task.isComplete === isComplete)
              .map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  setTasksToComplete={setTasksToComplete}
                  setTasksToNotComplete={setTasksToNotComplete}
                  setIsUndoVisible={setIsUndoVisible}
                  clearTimer={clearTimer}
                  currentTaskForm={currentTaskForm}
                  setCurrentTaskForm={setCurrentTaskForm}
                  currentProject={project}
                />
              ))}
          </TaskList>
          <TaskListHeading>
            <h3>Today ‧ {format(new Date(), 'iii do MMM')}</h3>
          </TaskListHeading>
        </>
      )}
    </>
  )
}

TodayTaskContainer.propTypes = {
  allTasks: PropTypes.object,
  loadingTasks: PropTypes.bool,
  project: PropTypes.object,
  isComplete: PropTypes.bool,
  setTasksToComplete: PropTypes.func,
  setTasksToNotComplete: PropTypes.func,
  setIsUndoVisible: PropTypes.func,
  clearTimer: PropTypes.func,
  sortOptions: PropTypes.object,
  setDashboardTasks: PropTypes.func,
  setTasksLoading: PropTypes.func,
  currentTaskForm: PropTypes.string,
  setCurrentTaskForm: PropTypes.func,
}
