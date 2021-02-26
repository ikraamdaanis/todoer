import { forwardRef } from 'react'
import { BulletPoint } from '../../containers/Sidebar/SidebarStyles'
import { Arrow, MenuContainer, MenuItem, MenuList } from './MenuStyles'
import { ReactComponent as Checkmark } from '../../assets/images/checkmark.svg'

export const Menu = forwardRef((props, ref) => {
  const { data, state, setState, toggleOpen } = props
  return (
    <MenuContainer onClick={() => toggleOpen(false)} ref={ref}>
      <Arrow />
      <MenuList>
        {data?.map(project => (
          <MenuItem
            key={project.title}
            onClick={() => setState && setState(project.title)}
            className={state === project.title ? 'selected' : undefined}
          >
            <BulletPoint>
              <div></div>
            </BulletPoint>
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
