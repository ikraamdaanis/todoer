import React from 'react'
import { BulletPoint } from '../../containers/Sidebar/SidebarStyles'
import { Arrow, MenuContainer, MenuItem, MenuList } from './MenuStyles'

export const Menu = ({ projectsDetails }) => {
  return (
    <MenuContainer>
      <Arrow />
      <MenuList>
        {projectsDetails.map(project => (
          <MenuItem key={project.title}>
            <BulletPoint>
              <div></div>
            </BulletPoint>
            <span>{project.title}</span>
          </MenuItem>
        ))}
      </MenuList>
    </MenuContainer>
  )
}
