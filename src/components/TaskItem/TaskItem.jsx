import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  TaskCheck,
  TaskDescription,
  TaskDetails,
  TaskItemContainer,
  TaskListItem,
  TaskTags,
} from './TaskItemStyles'
import { DotIcon, DueDateIcon, InboxIconSm, TickIcon } from '../../assets/'
import { setDateColour, setDateText } from '../../utils'
import { deleteTask } from '../../store/actions/'
import { AddTaskForm, DeleteModal, Modal } from '../'
import { ThemeContext } from '../../App'
import { TaskMenuContainer } from './TaskMenuContainer'

export const TaskItem = ({
  task,
  setTasksToComplete,
  setTasksToNotComplete,
  setIsUndoVisible,
  clearTimer,
  currentProject,
}) => {
  const [editMenuOpen, setEditMenuOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const { darkTheme } = useContext(ThemeContext)

  return (
    <TaskListItem key={task.id}>
      <TaskItemContainer>
        {editMenuOpen ? (
          <AddTaskForm
            edit={true}
            setIsOpen={setEditMenuOpen}
            currentProject={{ title: task.project }}
            taskDetails={task}
          />
        ) : (
          <>
            <TaskDetails>
              <TaskCheck
                onClick={() => {
                  if (!task.isComplete) {
                    clearTimer()
                    setTasksToComplete(prev => [
                      ...prev,
                      {
                        project: task.project,
                        id: task.id,
                      },
                    ])
                    setIsUndoVisible(true)
                  } else if (task.isComplete) {
                    setTasksToNotComplete(prev => [
                      ...prev,
                      {
                        project: task.project,
                        id: task.id,
                      },
                    ])
                  }
                }}
              >
                <div className={`circle ${task.isComplete ? 'complete' : undefined}`}>
                  <TickIcon />
                </div>
              </TaskCheck>
              <TaskDescription className={`${task.isComplete ? 'complete' : undefined}`}>
                {task.description}
              </TaskDescription>
              <TaskMenuContainer
                task={task}
                darkTheme={darkTheme}
                setEditMenuOpen={setEditMenuOpen}
                setDeleteModalOpen={setDeleteModalOpen}
              />
            </TaskDetails>
            {task.dueDate && (
              <TaskTags>
                <div
                  className='date'
                  style={{
                    color: setDateColour(setDateText(task.dueDate), task.dueDate, darkTheme),
                  }}
                >
                  <DueDateIcon />
                  <span>{setDateText(task.dueDate)}</span>
                </div>
                {['today', 'upcoming'].includes(currentProject.title) && (
                  <div className='project'>
                    <Link to={`/app/${task.project.toLowerCase()}`}>
                      <small>{task.project}</small>
                      {task.project === 'Inbox' ? (
                        <InboxIconSm
                          className='inbox'
                          style={{ color: darkTheme ? '#5297ff' : '#246fe0' }}
                        />
                      ) : (
                        <DotIcon className='dot' />
                      )}
                    </Link>
                  </div>
                )}
              </TaskTags>
            )}
          </>
        )}
      </TaskItemContainer>
      {deleteModalOpen && (
        <Modal>
          <DeleteModal
            id={task.id}
            detail={task.description}
            action={deleteTask}
            setDeleteModalOpen={setDeleteModalOpen}
            project={task.project}
          />
        </Modal>
      )}
    </TaskListItem>
  )
}

TaskItem.propTypes = {
  task: PropTypes.object,
  setTasksToComplete: PropTypes.func,
  setTasksToNotComplete: PropTypes.func,
  setIsUndoVisible: PropTypes.func,
  clearTimer: PropTypes.func,
  currentProject: PropTypes.object,
}
