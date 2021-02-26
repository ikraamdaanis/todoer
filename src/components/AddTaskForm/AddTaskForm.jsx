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
import { useSelector } from 'react-redux'
import { Menu } from '../Menu/Menu'

export const AddTaskForm = ({ setIsOpen }) => {
  const [todoDescription, setTodoDescription] = useState('')
  const [selectedProject, setSelectedProject] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const todoInput = useRef(null)
  const form = useRef(null)

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const allProjectsDetails = useSelector(state => state.allProjectsDetails)
  const {
    loading: projectsLoading,
    projects: projectsDetails,
  } = allProjectsDetails

  useEffect(() => {
    console.log({ selectedProject })
  }, [selectedProject])

  useEffect(() => {
    const toggleFocus = ({ target }) => {
      !form.current?.contains(target) ? setIsActive(false) : setIsActive(true)
    }

    document.body.addEventListener('click', toggleFocus)
    return () => {
      document.body.removeEventListener('click', toggleFocus)
    }
  }, [form])

  const handleSubmit = event => {
    event.preventDefault()

    setIsOpen(false)
  }

  return (
    <AddTaskFormContainer>
      <AddTaskFormForm
        autoComplete='off'
        onClick={({ target }) =>
          target === form.current && todoInput.current.focus()
        }
        onSubmit={handleSubmit}
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

            <ProjectSelection>
              <p htmlFor='projects' onClick={() => setIsMenuOpen(true)}>
                {selectedProject}
              </p>
              {isMenuOpen && (
                <Menu
                  data={projectsDetails}
                  state={selectedProject}
                  setState={setSelectedProject}
                  toggleOpen={setIsMenuOpen}
                />
              )}
            </ProjectSelection>
            <Priority></Priority>
          </SubOptions>
        </Container>
        <AddTaskSubmitButton
          type='submit'
          disabled={todoDescription.length < 1}
        >
          Add task
        </AddTaskSubmitButton>
        <AddTaskCancel type='button' onClick={() => setIsOpen(false)}>
          Cancel
        </AddTaskCancel>
      </AddTaskFormForm>
    </AddTaskFormContainer>
  )
}
