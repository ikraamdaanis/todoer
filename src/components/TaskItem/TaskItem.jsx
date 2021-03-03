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
import { Link } from 'react-router-dom'

export const TaskItem = ({ task, tasksToComplete }) => {
  const [taskMenuOpen, setTaskMenuOpen] = useState(false)

  const TaskMenuButtonRef = useRef(null)
  const TaskMenuRef = useRef(null)
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
              clearTimeout(timer)
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
                  <Link
                    to={`/app/${task.project.toLowerCase()}/delete/${task.id}`}
                  >
                    <DeleteButton
                      title='Delete this task'
                      onClick={() => setTaskMenuOpen(false)}
                    >
                      <DeleteIcon />
                      <span>Delete task</span>
                    </DeleteButton>
                  </Link>
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
    </TaskListItem>
  )
}
