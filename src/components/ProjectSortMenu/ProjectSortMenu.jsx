import {
  DropdownContainer,
  DropdownItem,
  DropdownList,
} from '../Dropdown/Dropdown'
import { ReactComponent as DueDate } from '../../assets/images/due-date-large.svg'

export const ProjectSortMenu = ({
  projectSortOpen,
  setProjectSortOpen,
  projectSortMenuRight,
  reference,
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
        <DropdownItem title={'Sort by due date'} onClick={() => {}}>
          <DueDate />
          <span>Sort by due date</span>
        </DropdownItem>
      </DropdownList>
    </DropdownContainer>
  )
}
