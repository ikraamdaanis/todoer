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
import { v4 as uuidv4 } from 'uuid'

export const AddTaskForm = ({ history, currentProject, setIsOpen }) => {
  const [todoDescription, setTodoDescription] = useState('')
  const [selectedProject, setSelectedProject] = useState(currentProject?.title)
  const [date, setDate] = useState('')
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
    let project = selectedProject

    dispatch(
      createTask(selectedProject, {
        description: todoDescription,
        project: selectedProject,
        dueDate: date,
        createdAt: format(new Date(), 'yyyy-MM-dd'),
        id: uuidv4(),
      })
    )

    setTodoDescription('')
    setSelectedProject(currentProject.title)
    setDate('')

    history.push(`/app/${project.toLowerCase()}`)
  }

  // useEffect(() => {
  //   console.log(date, selectedProject, todoDescription)
  // }, [date, selectedProject, todoDescription])

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
            <label htmlFor='description'>Description</label>
            <input
              name='description'
              id='description'
              placeholder='e.g. Complete this task today'
              value={todoDescription}
              onChange={e => setTodoDescription(e.target.value)}
              required
              ref={todoInput}
            />
          </div>

          <SubOptions>
            <DatePicker chosenDate={date} setDate={setDate} />
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
