import React from 'react'
import PropTypes from 'prop-types'
import { DropdownContainer, DropdownItem, DropdownList } from '../Dropdown/Dropdown'
import { AlphabetIcon, DueDateIcon } from '../../assets/'

export const ProjectSortMenu = ({
  reference,
  projectSortOpen,
  setProjectSortOpen,
  projectSortMenuRight,
  setSortOptions,
}) => {
  return (
    <DropdownContainer
      ref={reference}
      className={`project-menu ${projectSortOpen ? 'open' : undefined}`}
      style={{
        transform: `translate(${projectSortMenuRight}px, 100px)`,
      }}
    >
      <DropdownList>
        <DropdownItem
          title={'Sort by due date'}
          onClick={() => {
            setSortOptions({
              option: 'dueDate',
              optionName: 'by due date',
              direction: 'asc',
            })
            setProjectSortOpen(false)
          }}
        >
          <DueDateIcon />
          <span>Sort by due date</span>
        </DropdownItem>
        <DropdownItem
          title={'Sort alphabetically'}
          onClick={() => {
            setSortOptions({
              option: 'description',
              optionName: 'alphabetically',
              direction: 'asc',
            })
            setProjectSortOpen(false)
          }}
        >
          <AlphabetIcon />
          <span>Sort alphabetically</span>
        </DropdownItem>
      </DropdownList>
    </DropdownContainer>
  )
}

ProjectSortMenu.propTypes = {
  reference: PropTypes.object,
  projectSortOpen: PropTypes.bool,
  setProjectSortOpen: PropTypes.func,
  projectSortMenuRight: PropTypes.number,
  setSortOptions: PropTypes.func,
}
