import React from 'react'
import PropTypes from 'prop-types'
import { MenuItem, MenuList, TaskMenu } from './TaskItemStyles'
import { DeleteIcon, EditIcon } from '../../assets'

export const TaskMenuWrapper = ({
  task,
  TaskMenuRef,
  darkTheme,
  setEditMenuOpen,
  setCurrentTaskForm,
  setDeleteModalOpen,
  setTaskMenuOpen,
}) => {
  return (
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
  )
}

TaskMenuWrapper.propTypes = {
  task: PropTypes.object,
  TaskMenuRef: PropTypes.object,
  darkTheme: PropTypes.bool,
  setEditMenuOpen: PropTypes.func,
  setCurrentTaskForm: PropTypes.func,
  setDeleteModalOpen: PropTypes.func,
  setTaskMenuOpen: PropTypes.func,
}
