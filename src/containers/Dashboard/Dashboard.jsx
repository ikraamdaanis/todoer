import React from 'react'
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

export const Dashboard = ({ userInfo, isClosed }) => {
  const userTodosQuery = firestore
    .collection('users')
    .doc(userInfo?.id)
    .collection('todos')
  const [todos] = useCollection(userTodosQuery)
  return (
    // {todos?.docs.map(todo => (
    //   <p key={todo.id}>{todo.data().title}</p>
    // ))}
    <DashboardContainer className={isClosed && 'closed'}>
      <div className='project-container'>
        <ProjectContainer>
          <h1 className='empty'>Add a project in the menu on the left!</h1>
          <AddTask>
            <PlusButton className='plus'>
              <PlusButtonSVG />
            </PlusButton>
            <AddTaskText>Add task</AddTaskText>
          </AddTask>
        </ProjectContainer>

        <div className='add-task-form hide' id='addTaskFormContainer'>
          <form id='addTaskForm' autoComplete='off'>
            <div className='container'>
              <div className='title'>
                <label htmlFor='title'>Title: </label>
                <input
                  name='title'
                  id='title'
                  placeholder='Enter the title'
                  required
                />
              </div>
              <div className='description'>
                <label htmlFor='description'>Description: </label>
                <input
                  name='description'
                  id='description'
                  placeholder='Enter the description'
                  required
                />
              </div>
              <div className='sub-options'>
                <div className='priority'>
                  <label htmlFor='priority'>Priority: </label>
                  <select
                    name='priority'
                    id='priority'
                    className='priority-select'
                  >
                    <option value='none'>None</option>
                    <option value='important'>Important</option>
                    <option value='urgent'>Urgent</option>
                  </select>
                </div>
                <div className='date'>
                  <label htmlFor='date'>Pick a date: </label>
                  <input type='date' name='date' id='date' />
                </div>
                <div className='project-selection'>
                  <label htmlFor='projects'>Project: </label>
                  <select name='projects' id='projects'></select>
                </div>
              </div>
            </div>
            <button className='add-task-button' type='submit'>
              Add Task
            </button>
            <button type='button' className='cancel' id='cancelAddTask'>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </DashboardContainer>
  )
}
