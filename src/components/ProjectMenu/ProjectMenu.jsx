import React, { useRef } from 'react'
import {
  DropdownContainer,
  DropdownItem,
  DropdownList,
  Line,
} from '../Dropdown/Dropdown'
import { ReactComponent as DeleteIcon } from '../../assets/images/delete.svg'
import { ReactComponent as CompleteIcon } from '../../assets/images/complete-icon.svg'
import { ReactComponent as HideIcon } from '../../assets/images/hide-icon.svg'

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
          }}
        >
          {showCompletedTasks ? <HideIcon /> : <CompleteIcon />}
          <span>{showCompletedTasks ? 'Hide' : 'Show'} completed tasks</span>
        </DropdownItem>
        <Line style={{ width: '96%', margin: '0.2rem auto' }} />
        {currentProject?.title !== 'Inbox' && isProject && (
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
        )}
      </DropdownList>
    </DropdownContainer>
  )
}
