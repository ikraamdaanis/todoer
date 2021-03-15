import React from 'react'
import PropTypes from 'prop-types'
import { DropdownContainer, DropdownItem, DropdownList, Line } from '../Dropdown/Dropdown'
import { CompleteIcon, DeleteIcon, HideIcon } from '../../assets/'

export const ProjectMenu = ({
  reference,
  projectMenuRight,
  showCompletedTasks,
  setShowCompletedTasks,
  currentProject,
  isProject,
  projectMenuOpen,
  setDeleteModalOpen,
  setProjectMenuOpen,
}) => {
  return (
    <DropdownContainer
      ref={reference}
      className={`project-menu ${projectMenuOpen ? 'open' : undefined}`}
      style={{
        transform: `translate(${projectMenuRight}px, 100px)`,
      }}
    >
      <DropdownList>
        <DropdownItem
          title={`${showCompletedTasks ? 'Hide' : 'Show'} completed tasks`}
          onClick={() => {
            setShowCompletedTasks(prev => !prev)
            setProjectMenuOpen(false)
          }}
        >
          {showCompletedTasks ? <HideIcon /> : <CompleteIcon />}
          <span>{showCompletedTasks ? 'Hide' : 'Show'} completed tasks</span>
        </DropdownItem>
        {currentProject?.title !== 'Inbox' && isProject && (
          <>
            <Line style={{ width: '96%', margin: '0.2rem auto' }} />
            <DropdownItem
              title='Delete this project'
              onClick={() => {
                setDeleteModalOpen(true)
                setProjectMenuOpen(false)
              }}
            >
              <DeleteIcon />
              <span>Delete project</span>
            </DropdownItem>
          </>
        )}
      </DropdownList>
    </DropdownContainer>
  )
}

ProjectMenu.propTypes = {
  reference: PropTypes.object,
  projectMenuRight: PropTypes.number,
  showCompletedTasks: PropTypes.bool,
  setShowCompletedTasks: PropTypes.func,
  currentProject: PropTypes.object,
  isProject: PropTypes.bool,
  projectMenuOpen: PropTypes.bool,
  setDeleteModalOpen: PropTypes.func,
  setProjectMenuOpen: PropTypes.func,
}
