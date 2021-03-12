import { useState, useRef, useEffect } from 'react'
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
import { ReactComponent as TickIcon } from '../../assets/images/tick.svg'
import { ReactComponent as MenuToggler } from '../../assets/images/more-icon.svg'
import { ReactComponent as EditIcon } from '../../assets/images/edit-icon.svg'
import { ReactComponent as DeleteIcon } from '../../assets/images/delete.svg'
import { ReactComponent as DueDateIcon } from '../../assets/images/due-date.svg'
import { ReactComponent as InboxSmallIcon } from '../../assets/images/inbox-small.svg'
import { ReactComponent as Dot } from '../../assets/images/dot.svg'

import { useMenu } from '../../hooks/useMenu'
import { setDateColour } from '../../utils/setDateColour'
import { setDateText } from '../../utils/setDateText'
import { DeleteModal } from '../DeleteModal/DeleteModal'
import { deleteTask } from '../../store/actions/taskActions'
import { Modal } from '../Modal/Modal'
import { AddTaskForm } from '../AddTaskForm/AddTaskForm'
import { Link } from 'react-router-dom'

export const TaskItem = ({
  task,
  setTasksToComplete,
  setTasksToNotComplete,
  setIsUndoVisible,
  clearTimer,
  currentTaskForm,
  setCurrentTaskForm,
  currentProject,
}) => {
  const [taskMenuOpen, setTaskMenuOpen] = useState(false)
  const [editMenuOpen, setEditMenuOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const TaskMenuRef = useRef(null)
  const TaskMenuButtonRef = useRef(null)

  useMenu(TaskMenuButtonRef, TaskMenuRef, setTaskMenuOpen)

  useEffect(() => {
    currentTaskForm !== 'edit' && setEditMenuOpen(false)
  }, [currentTaskForm])

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
                <div
                  className={`circle ${
                    task.isComplete ? 'complete' : undefined
                  }`}
                >
                  <TickIcon />
                </div>
              </TaskCheck>
              <TaskDescription
                className={`${task.isComplete ? 'complete' : undefined}`}
              >
                {task.description}
              </TaskDescription>
              <TaskMenuContainer>
                <div
                  className='toggler'
                  ref={TaskMenuButtonRef}
                  onClick={() => setTaskMenuOpen(prev => !prev)}
                >
                  <MenuToggler />
                </div>
                {taskMenuOpen && (
                  <TaskMenu ref={TaskMenuRef}>
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
                    color: setDateColour(
                      setDateText(task.dueDate),
                      task.dueDate
                    ),
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
                        <InboxSmallIcon className='inbox' />
                      ) : (
                        <Dot className='dot' />
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
