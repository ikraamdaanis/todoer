import { useState, useEffect, useRef } from 'react'
import {
  DeleteButton,
  TaskCheck,
  TaskDescription,
  TaskDetails,
  TaskItemContainer,
  TaskListItem,
  TaskMenu,
  TaskMenuContainer,
  TaskMenuList,
  TaskTags,
} from './TaskItemStyles'
import { ReactComponent as TickIcon } from '../../assets/images/tick.svg'
import { ReactComponent as MenuToggler } from '../../assets/images/more-icon.svg'
import { ReactComponent as DeleteIcon } from '../../assets/images/delete.svg'
import { ReactComponent as DueDateIcon } from '../../assets/images/due-date.svg'
import { add, format, isBefore, isToday, isTomorrow } from 'date-fns'
import { Link } from 'react-router-dom'
import { Modal } from '../Modal/Modal'
import { DeleteTaskModal } from '../DeleteTaskModal/DeleteTaskModal'

export const TaskItem = ({
  task,
  tasksToComplete,
  setTasksToComplete,
  setIsUndoVisible,
  clearTime,
}) => {
  const [taskMenuOpen, setTaskMenuOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const TaskMenuButtonRef = useRef(null)
  const TaskMenuRef = useRef(null)

  const checkDate = actualDate => {
    if (isToday(new Date(actualDate))) {
      return 'Today'
    } else if (isTomorrow(new Date(actualDate))) {
      return 'Tomorrow'
    } else if (isBefore(new Date(actualDate), add(new Date(), { days: 7 }))) {
      return format(new Date(actualDate), 'EEEE')
    } else {
      return format(new Date(actualDate), 'do MMM')
    }
  }

  const dateColour = (displayDate, actualDate) =>
    displayDate === 'Today'
      ? '#25b84c'
      : displayDate === 'Tomorrow'
      ? '#ff9a14'
      : isBefore(new Date(actualDate), add(new Date(), { days: 7 }))
      ? '#a970ff'
      : 'unset'

  useEffect(() => {
    const toggleFocus = ({ target }) => {
      if (TaskMenuButtonRef?.current?.contains(target)) {
        setTaskMenuOpen(prev => !prev)
        return
      }
      !TaskMenuRef?.current?.contains(target) && setTaskMenuOpen(false)
    }
    taskMenuOpen && document.body.addEventListener('click', toggleFocus)
    return () => document.body.removeEventListener('click', toggleFocus)
  }, [TaskMenuButtonRef, TaskMenuRef, taskMenuOpen])

  return (
    <TaskListItem
      key={task.id}
      className={
        tasksToComplete?.some(item => item.id === task.id) ? 'hide' : undefined
      }
    >
      <TaskItemContainer>
        <TaskDetails>
          <TaskCheck
            onClick={() => {
              clearTime()
              setTasksToComplete(prev => [
                ...prev,
                {
                  project: task.project,
                  id: task.id,
                },
              ])
              setIsUndoVisible(true)
            }}
          >
            <div className='circle'>
              <TickIcon />
            </div>
          </TaskCheck>

          <TaskDescription>{task.description}</TaskDescription>
          <TaskMenuContainer>
            <div
              className='toggler'
              ref={TaskMenuButtonRef}
              onClick={() => setTaskMenuOpen(task.id)}
            >
              <MenuToggler />
            </div>
            {taskMenuOpen === task.id && (
              <TaskMenu ref={TaskMenuRef}>
                <TaskMenuList>
                  {/* <Link
                    to={`/app/${task.project.toLowerCase()}/delete/${task.id}`}
                  > */}
                  <DeleteButton
                    title='Delete this task'
                    onClick={() => {
                      setDeleteModalOpen(true)
                      setTaskMenuOpen(false)
                    }}
                  >
                    <DeleteIcon />
                    <span>Delete task</span>
                  </DeleteButton>
                  {/* </Link> */}
                </TaskMenuList>
              </TaskMenu>
            )}
          </TaskMenuContainer>
        </TaskDetails>
        {task.dueDate && (
          <TaskTags>
            <div
              className='date'
              style={{
                color: dateColour(checkDate(task.dueDate), task.dueDate),
              }}
            >
              <DueDateIcon />
              <span>{checkDate(task.dueDate)}</span>
            </div>
          </TaskTags>
        )}
      </TaskItemContainer>
      {deleteModalOpen && (
        <Modal>
          <DeleteTaskModal
            task={task}
            setDeleteModalOpen={setDeleteModalOpen}
          />
        </Modal>
      )}
    </TaskListItem>
  )
}
