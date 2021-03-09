import {
  DropdownContainer,
  DropdownItem,
  DropdownList,
} from '../Dropdown/Dropdown'
import { ReactComponent as DueDate } from '../../assets/images/due-date-large.svg'

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
              optionName: 'due date',
              direction: 'asc',
            })
            setProjectSortOpen(false)
          }}
        >
          <DueDate />
          <span>Sort by due date</span>
        </DropdownItem>
      </DropdownList>
    </DropdownContainer>
  )
}
