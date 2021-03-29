import React from 'react'
import PropTypes from 'prop-types'
import { TaskTags } from './TaskItemStyles'
import { setDateColour, setDateText } from '../../utils'
import { DotIcon, DueDateIcon, InboxIconSm } from '../../assets'
import { Link } from 'react-router-dom'

export const TaskTagsContainer = ({ task, currentProject, darkTheme }) => {
  return (
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
              <InboxIconSm className='inbox' style={{ color: darkTheme ? '#5297ff' : '#246fe0' }} />
            ) : (
              <DotIcon className='dot' />
            )}
          </Link>
        </div>
      )}
    </TaskTags>
  )
}

TaskTagsContainer.propTypes = {
  task: PropTypes.object,
  currentProject: PropTypes.object,
  darkTheme: PropTypes.bool,
}
