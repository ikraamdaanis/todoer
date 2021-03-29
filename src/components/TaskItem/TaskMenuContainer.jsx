import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { MenuItem, MenuList, TaskMenu, Container } from './TaskItemStyles'
import { DeleteIcon, EditIcon, MoreIcon } from '../../assets'
import { useMenu } from '../../hooks'
import { TaskFormContext } from '../../App'

export const TaskMenuContainer = ({ task, darkTheme, setEditMenuOpen, setDeleteModalOpen }) => {
  const [taskMenuOpen, setTaskMenuOpen] = useState(false)
  const { currentTaskForm, setCurrentTaskForm } = useContext(TaskFormContext)

  useEffect(() => {
    currentTaskForm !== 'edit' && setEditMenuOpen(false)
  }, [currentTaskForm, setEditMenuOpen])

  const TaskMenuRef = useRef(null)
  const TaskMenuButtonRef = useRef(null)
  useMenu(TaskMenuButtonRef, TaskMenuRef, setTaskMenuOpen)

  return (
    <Container>
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
    </Container>
  )
}

TaskMenuContainer.propTypes = {
  task: PropTypes.object,
  darkTheme: PropTypes.bool,
  setEditMenuOpen: PropTypes.func,
  setDeleteModalOpen: PropTypes.func,
}
