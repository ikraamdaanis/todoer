import { useEffect } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { firestore } from '../../firebase/config'
import {
  AddTask,
  AddTaskText,
  DashboardContainer,
  PlusButton,
  ProjectContainer,
} from './DashboardStyles'
import { ReactComponent as PlusButtonSVG } from '../../assets/images/plus-icon.svg'
import { AddTaskForm } from '../../components'

export const Dashboard = ({ isClosed }) => {
  // useEffect(() => {

  // }, [])

  return (
    // {todos?.docs.map(todo => (
    //   <p key={todo.id}>{todo.data().title}</p>
    // ))}
    <DashboardContainer className={isClosed && 'closed'}>
      <ProjectContainer>
        <h1 className='empty'>Add a project in the menu on the left!</h1>
        <AddTask>
          <PlusButton className='plus'>
            <PlusButtonSVG />
          </PlusButton>
          <AddTaskText>Add task</AddTaskText>
        </AddTask>
        <AddTaskForm />
      </ProjectContainer>
    </DashboardContainer>
  )
}
