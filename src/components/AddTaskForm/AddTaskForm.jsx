import { useState, useRef, useEffect } from 'react'
import {
  AddTaskCancel,
  AddTaskFormContainer,
  AddTaskFormForm,
  AddTaskSubmitButton,
  Container,
  Priority,
  ProjectSelection,
  SubOptions,
} from './AddTaskFormStyles'
import { DatePicker } from '../DatePicker/DatePicker'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from '../Menu/Menu'
import { createTask } from '../../store/actions/taskActions'
import { format } from 'date-fns'
import { getProjectTasks } from '../../store/actions/projectActions'
import { v4 as uuidv4 } from 'uuid'

export const AddTaskForm = ({ currentProject, setIsOpen }) => {
  const [todoDescription, setTodoDescription] = useState('')
  const [selectedProject, setSelectedProject] = useState('')
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const todoInput = useRef(null)
  const form = useRef(null)
  const menuButton = useRef(null)
  const menu = useRef(null)

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const allProjectsDetails = useSelector(state => state.allProjectsDetails)
  const {
    loading: projectsLoading,
    projects: projectsDetails,
  } = allProjectsDetails

  useEffect(() => {
    console.log({ selectedProject, todoDescription })
    // dispatch(getProjectTasks('Development'))
  }, [selectedProject])

  useEffect(() => {
    const toggleFocus = ({ target }) => {
      !form.current?.contains(target) ? setIsActive(false) : setIsActive(true)
    }
    document.body.addEventListener('click', toggleFocus)
    return () => {
      document.body.removeEventListener('click', toggleFocus)
    }
  }, [])

  useEffect(() => {
    const toggleFocus = ({ target }) => {
      if (menuButton?.current?.contains(target)) {
        setIsMenuOpen(prev => !prev)
        return
      }
      !menu.current?.contains(target)
        ? setIsMenuOpen(false)
        : setIsMenuOpen(true)
    }
    document.body.addEventListener('click', toggleFocus)
    return () => {
      document.body.removeEventListener('click', toggleFocus)
    }
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    console.log({ todoDescription, selectedProject, date })

    dispatch(
      createTask(selectedProject, {
        description: todoDescription,
        project: selectedProject,
        dueDate: date,
        createdAt: new Date(),
        id: uuidv4(),
      })
    )
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
            <DatePicker setDate={setDate} />
            <ProjectSelection>
              <p htmlFor='projects' ref={menuButton}>
                {selectedProject}
              </p>
              {isMenuOpen && (
                <Menu
                  data={projectsDetails}
                  state={selectedProject}
                  setState={setSelectedProject}
                  toggleOpen={setIsMenuOpen}
                  ref={menu}
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
