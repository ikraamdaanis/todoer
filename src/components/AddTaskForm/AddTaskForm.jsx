import { useState, useRef, useEffect } from 'react'
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
  const [todoDescription, setTodoDescription] = useState('')
  const [isActive, setIsActive] = useState(false)

  const todoInput = useRef(null)
  const form = useRef(null)

  document.body.onclick = ({ target }) =>
    !form.current.contains(target) ? setIsActive(false) : setIsActive(true)

  return (
    <AddTaskFormContainer>
      <AddTaskFormForm
        autoComplete='off'
        onClick={({ target }) =>
          target === form.current && todoInput.current.focus()
        }
      >
        <Container className={isActive && 'focused'} ref={form}>
          <div className='title'>
            <label htmlFor='title'>Title</label>
            <input
              name='title'
              id='title'
              placeholder='e.g. Complete this task today'
              value={todoDescription}
              onChange={e => setTodoDescription(e.target.value)}
              required
              ref={todoInput}
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
        <AddTaskSubmitButton
          type='submit'
          disabled={todoDescription.length < 1}
        >
          Add task
        </AddTaskSubmitButton>
        <AddTaskCancel type='button'>Cancel</AddTaskCancel>
      </AddTaskFormForm>
    </AddTaskFormContainer>
  )
}
