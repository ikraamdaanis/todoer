import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { TaskList, TaskListHeading } from './TaskSectionStyles'
import { TaskItem } from '../../components'

export const OverdueSection = ({
  tasks,
  project,
  isComplete,
  setTasksToComplete,
  setTasksToNotComplete,
  setIsUndoVisible,
  clearTimer,
  currentTaskForm = '',
  setCurrentTaskForm = null,
}) => {
  return (
    <>
      {tasks?.some(task => !task.isComplete) && (
        <>
          <TaskListHeading>
            <h3>Overdue</h3>
          </TaskListHeading>
          <TaskList className='overdue'>
            {tasks
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

OverdueSection.propTypes = {
  tasks: PropTypes.array,
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
