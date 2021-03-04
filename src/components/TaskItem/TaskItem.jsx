import { useState, useRef } from 'react'
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
import { Modal } from '../Modal/Modal'
import { DeleteTaskModal } from '../DeleteTaskModal/DeleteTaskModal'
import { useMenu } from '../../hooks/useMenu'
import { setDateColour } from '../../utils/setDateColour'

export const TaskItem = ({
  task,
  tasksToComplete,
  setTasksToComplete,
  setIsUndoVisible,
  clearTime,
}) => {
  const [taskMenuOpen, setTaskMenuOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const TaskMenuRef = useRef(null)
  const TaskMenuButtonRef = useRef(null)

  useMenu(TaskMenuButtonRef, TaskMenuRef, setTaskMenuOpen)

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
              onClick={() => setTaskMenuOpen(prev => !prev)}
            >
              <MenuToggler />
            </div>
            {taskMenuOpen && (
              <TaskMenu ref={TaskMenuRef}>
                <TaskMenuList>
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
                color: setDateColour(checkDate(task.dueDate), task.dueDate),
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
