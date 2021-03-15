import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { BulletPoint } from '../../containers/Sidebar/SidebarStyles'
import { Arrow, MenuContainer, MenuItem, MenuList } from './ProjectSelectMenuStyles'
import { CheckmarkIcon, InboxIcon } from '../../assets/'

export const ProjectSelectMenu = forwardRef(({ data, state, setState, setIsMenuOpen }, ref) => {
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
                <CheckmarkIcon />
              </div>
            )}
          </MenuItem>
        ))}
      </MenuList>
    </MenuContainer>
  )
})

ProjectSelectMenu.propTypes = {
  ref: PropTypes.object,
  data: PropTypes.object,
  state: PropTypes.object,
  setState: PropTypes.func,
  setIsMenuOpen: PropTypes.func,
}

ProjectSelectMenu.displayName = 'ProjectSelectMenu'
