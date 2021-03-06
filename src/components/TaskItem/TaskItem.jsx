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
import { useMenu } from '../../hooks/useMenu'
import { setDateColour } from '../../utils/setDateColour'
import { setDateText } from '../../utils/setDateText'
import { DeleteModal } from '../DeleteModal/DeleteModal'
import { deleteTask } from '../../store/actions/taskActions'
import { Modal } from '../Modal/Modal'

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
                color: setDateColour(setDateText(task.dueDate), task.dueDate),
              }}
            >
              <DueDateIcon />
              <span>{setDateText(task.dueDate)}</span>
            </div>
          </TaskTags>
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
