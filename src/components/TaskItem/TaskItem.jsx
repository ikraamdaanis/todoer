import React, { useState, useRef, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  MenuItem,
  TaskCheck,
  TaskDescription,
  TaskDetails,
  TaskItemContainer,
  TaskListItem,
  TaskMenu,
  TaskMenuContainer,
  MenuList,
  TaskTags,
} from './TaskItemStyles'
import {
  EditIcon,
  DeleteIcon,
  DotIcon,
  DueDateIcon,
  InboxIconSm,
  TickIcon,
  MoreIcon,
} from '../../assets/'

import { useMenu } from '../../hooks/'
import { setDateColour, setDateText } from '../../utils'
import { deleteTask } from '../../store/actions/'
import { AddTaskForm, DeleteModal, Modal } from '../'
import { TaskFormContext, ThemeContext } from '../../App'

export const TaskItem = ({
  task,
  setTasksToComplete,
  setTasksToNotComplete,
  setIsUndoVisible,
  clearTimer,
  currentProject,
}) => {
  const [taskMenuOpen, setTaskMenuOpen] = useState(false)
  const [editMenuOpen, setEditMenuOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const TaskMenuRef = useRef(null)
  const TaskMenuButtonRef = useRef(null)

  useMenu(TaskMenuButtonRef, TaskMenuRef, setTaskMenuOpen)

  const { currentTaskForm, setCurrentTaskForm } = useContext(TaskFormContext)

  useEffect(() => {
    currentTaskForm !== 'edit' && setEditMenuOpen(false)
  }, [currentTaskForm])

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
              <TaskMenuContainer>
                <div
                  className='toggler'
                  ref={TaskMenuButtonRef}
                  onClick={() => setTaskMenuOpen(prev => !prev)}
                  style={{ color: !darkTheme && 'grey' }}
                >
                  <MoreIcon />
                </div>
                {taskMenuOpen && (
                  <TaskMenu ref={TaskMenuRef} style={{ background: !darkTheme && '#fff' }}>
                    <MenuList>
                      {!task.isComplete && (
                        <MenuItem
                          title='Edit this task'
                          onClick={() => {
                            setEditMenuOpen(true)
                            setCurrentTaskForm('edit')
                            setTaskMenuOpen(false)
                          }}
                        >
                          <EditIcon />
                          <span>Edit task</span>
                        </MenuItem>
                      )}
                      <MenuItem
                        title='Delete this task'
                        className='delete'
                        onClick={() => {
                          setDeleteModalOpen(true)
                          setTaskMenuOpen(false)
                        }}
                      >
                        <DeleteIcon />
                        <span>Delete task</span>
                      </MenuItem>
                    </MenuList>
                  </TaskMenu>
                )}
              </TaskMenuContainer>
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
                        <InboxIconSm className='inbox' />
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
