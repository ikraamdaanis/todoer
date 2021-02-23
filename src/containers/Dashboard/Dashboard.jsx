import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { firestore } from '../../firebase/config'
import { DashboardContainer, ProjectContainer } from './DashboardStyles'

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
        </ProjectContainer>
        <div className='add-task-button hide' id='addTaskFormToggler'>
          <div className='plus'>
            <svg width='13' height='13'>
              <path
                d='M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z'
                fill='currentColor'
                fillRule='evenodd'
              ></path>
            </svg>
          </div>
          <p className='add-task-text'>Add task</p>
        </div>
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
