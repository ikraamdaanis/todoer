import { useState } from 'react'
import {
  AddTask,
  AddTaskText,
  DashboardContainer,
  PlusButton,
  ProjectContainer,
} from './DashboardStyles'
import { ReactComponent as PlusButtonSVG } from '../../assets/images/plus-icon.svg'
import { AddTaskForm, Spinner } from '../../components'

export const Dashboard = ({ isClosed }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  setTimeout(() => {
    setIsLoading(false)
  }, 1000)

  return (
    <DashboardContainer className={isClosed && 'closed'}>
      {isLoading ? (
        <div style={{ marginTop: '10rem' }}>
          <Spinner />
        </div>
      ) : (
        <ProjectContainer>
          {!isOpen ? (
            <AddTask onClick={() => setIsOpen(!isOpen)}>
              <PlusButton className='plus'>
                <PlusButtonSVG />
              </PlusButton>
              <AddTaskText>Add task</AddTaskText>
            </AddTask>
          ) : (
            <AddTaskForm setIsOpen={setIsOpen} />
          )}
        </ProjectContainer>
      )}
    </DashboardContainer>
  )
}
