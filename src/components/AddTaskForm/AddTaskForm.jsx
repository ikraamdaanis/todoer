import React from 'react'
import {
  AddTaskCancel,
  AddTaskFormContainer,
  AddTaskFormForm,
  AddTaskSubmitButton,
  Container,
  DueDate,
  Priority,
  ProjectSelection,
  SubOptions,
} from './AddTaskFormStyles'
import { DatePicker } from '../DatePicker/DatePicker'

export const AddTaskForm = () => {
  return (
    <AddTaskFormContainer>
      <AddTaskFormForm autoComplete='off'>
        <Container>
          <div className='title'>
            <label htmlFor='title'>Title</label>
            <input
              name='title'
              id='title'
              placeholder='e.g. Learn Spanish every 2 days'
              required
            />
          </div>

          <SubOptions>
            <DatePicker />
            {/* 
            <DueDate>
              <label htmlFor='date'>Pick a date: </label>
              <input type='date' name='date' id='date' />
            </DueDate>
            <ProjectSelection>
              <label htmlFor='projects'>Project: </label>
              <select name='projects' id='projects'></select>
            </ProjectSelection>
            <Priority>
              <label htmlFor='priority'>Priority: </label>
              <select name='priority' id='priority' className='priority-select'>
                <option value='none'>None</option>
                <option value='important'>Important</option>
                <option value='urgent'>Urgent</option>
              </select>
            </Priority> */}
          </SubOptions>
        </Container>
        <AddTaskSubmitButton type='submit'>Add Task</AddTaskSubmitButton>
        <AddTaskCancel type='button' className='cancel' id='cancelAddTask'>
          Cancel
        </AddTaskCancel>
      </AddTaskFormForm>
    </AddTaskFormContainer>
  )
}
