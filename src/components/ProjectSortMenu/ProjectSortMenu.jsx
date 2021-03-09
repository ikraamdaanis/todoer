import {
  DropdownContainer,
  DropdownItem,
  DropdownList,
} from '../Dropdown/Dropdown'
import { ReactComponent as DueDate } from '../../assets/images/due-date-large.svg'
import { ReactComponent as Alphabet } from '../../assets/images/alphabet.svg'

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
          <DueDate />
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
          <Alphabet />
          <span>Sort alphabetically</span>
        </DropdownItem>
      </DropdownList>
    </DropdownContainer>
  )
}
