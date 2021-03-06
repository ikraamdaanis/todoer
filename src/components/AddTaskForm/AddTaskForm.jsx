import { useState, useRef } from 'react'
import {
  AddTaskCancel,
  AddTaskFormContainer,
  AddTaskFormForm,
  AddTaskSubmitButton,
  Container,
  Priority,
  ProjectSelection,
  SubOptions,
  BulletPoint,
} from './AddTaskFormStyles'
import { DatePicker } from '../DatePicker/DatePicker'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from '../Menu/Menu'
import { createTask } from '../../store/actions/taskActions'
import { v4 as uuidv4 } from 'uuid'
import { ReactComponent as InboxIconSmall } from '../../assets/images/inbox-small.svg'
import { useMenu } from '../../hooks/useMenu'
import { useFocus } from '../../hooks/useFocus'

export const AddTaskForm = ({
  history,
  currentProject,
  setIsOpen,
  scrollDownToLastTask,
}) => {
  const [todoDescription, setTodoDescription] = useState('')
  const [selectedProject, setSelectedProject] = useState(
    currentProject?.title || 'Inbox'
  )
  const [date, setDate] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const dispatch = useDispatch()

  const projectList = useSelector(state => state.projectList)
  const { projects } = projectList

  const todoInput = useRef(null)
  const form = useRef(null)

  useMenu(form, null, setIsActive)
  useFocus(todoInput)

  const menuButton = useRef(null)
  const menu = useRef(null)

  useMenu(menuButton, menu, setIsMenuOpen)

  const handleSubmit = event => {
    event.preventDefault()
    let project = selectedProject

    dispatch(
      createTask(selectedProject, {
        description: todoDescription,
        project: selectedProject,
        isComplete: false,
        dueDate: date,
        createdAt: new Date(),
        id: uuidv4(),
      })
    )

    setTodoDescription('')
    setSelectedProject(currentProject?.title)
    setDate('')

    history.push(`/app/${project.toLowerCase()}`)
    scrollDownToLastTask()
  }

  return (
    <AddTaskFormContainer>
      <AddTaskFormForm
        autoComplete='off'
        onClick={({ target }) => {
          target === form.current && todoInput.current.focus()
          setIsActive(true)
        }}
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
              <button
                type='button'
                ref={menuButton}
                onClick={() => setIsMenuOpen(prev => !prev)}
              >
                {selectedProject !== 'Inbox' ? (
                  <>
                    <BulletPoint>
                      <div></div>
                    </BulletPoint>
                    <span>{selectedProject}</span>
                  </>
                ) : (
                  <>
                    <div className='inbox'>
                      <InboxIconSmall />
                    </div>
                    <span>Inbox</span>
                  </>
                )}
              </button>
              {isMenuOpen && (
                <Menu
                  data={projects}
                  state={selectedProject}
                  setState={setSelectedProject}
                  ref={menu}
                />
              )}
            </ProjectSelection>
            <Priority></Priority>
          </SubOptions>
        </Container>
        <AddTaskSubmitButton
          type='submit'
          disabled={todoDescription.length < 1 || !selectedProject}
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
