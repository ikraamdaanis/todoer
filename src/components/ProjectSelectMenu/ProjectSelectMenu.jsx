import { forwardRef } from 'react'
import { BulletPoint } from '../../containers/Sidebar/SidebarStyles'
import {
  Arrow,
  MenuContainer,
  MenuItem,
  MenuList,
} from './ProjectSelectMenuStyles'
import { ReactComponent as Checkmark } from '../../assets/images/checkmark.svg'
import { ReactComponent as InboxIcon } from '../../assets/images/inbox.svg'

export const ProjectSelectMenu = forwardRef((props, ref) => {
  const { data, state, setState, setIsMenuOpen } = props

  return (
    <MenuContainer ref={ref}>
      <Arrow />
      <MenuList>
        {data?.map(project => (
          <MenuItem
            key={project.id}
            onClick={() => {
              setState && setState(project.title)
              setIsMenuOpen(false)
            }}
            className={state === project.title ? 'selected' : undefined}
          >
            {project.title === 'Inbox' ? (
              <BulletPoint>
                <InboxIcon style={{ color: '#246fe0' }} />
              </BulletPoint>
            ) : (
              <BulletPoint>
                <div></div>
              </BulletPoint>
            )}
            <span>{project.title}</span>
            {state === project.title && (
              <div className='checkmark'>
                <Checkmark />
              </div>
            )}
          </MenuItem>
        ))}
      </MenuList>
    </MenuContainer>
  )
})
