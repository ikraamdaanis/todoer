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
  BulletPoint,
} from './AddTaskFormStyles'
import { DatePicker, ProjectSelectMenu } from '../'
import { useDispatch, useSelector } from 'react-redux'
import { createTask, editTask } from '../../store/actions/taskActions'
import { v4 as uuidv4 } from 'uuid'
import { ReactComponent as InboxIconSmall } from '../../assets/images/inbox-small.svg'
import { useMenu } from '../../hooks/useMenu'
import { useFocus } from '../../hooks/useFocus'
import { format } from 'date-fns'
import { useHistory } from 'react-router'

export const AddTaskForm = ({
  edit,
  setIsOpen,
  currentProject,
  scrollDownToLastTask = null,
  taskDetails = {},
}) => {
  const history = useHistory()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [todoDescription, setTodoDescription] = useState(
    taskDetails.description || ''
  )
  const [selectedProject, setSelectedProject] = useState(
    (!['today', 'upcoming'].includes(currentProject?.title) &&
      currentProject?.title) ||
      'Inbox'
  )
  const [date, setDate] = useState(
    taskDetails.dueDate
      ? taskDetails.dueDate
      : currentProject?.title === 'today'
      ? format(new Date(), 'yyyy-MM-dd')
      : ''
  )

  useEffect(() => {
    setSelectedProject(
      (!['today', 'upcoming'].includes(currentProject?.title) &&
        currentProject?.title) ||
        'Inbox'
    )
  }, [currentProject])

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

    if (edit) {
      dispatch(
        editTask(selectedProject, {
          description: todoDescription,
          project: selectedProject,
          isComplete: taskDetails.isComplete || false,
          dueDate: date ? date : null,
          createdAt: taskDetails.createdAt || new Date(),
          id: taskDetails.id || uuidv4(),
        })
      )

      setIsOpen(false)
    } else {
      dispatch(
        createTask(selectedProject, {
          description: todoDescription,
          project: selectedProject,
          isComplete: false,
          dueDate: date ? date : null,
          createdAt: new Date(),
          id: uuidv4(),
        })
      )
      setTodoDescription('')
      setSelectedProject(
        (!['today', 'upcoming'].includes(currentProject?.title) &&
          currentProject?.title) ||
          'Inbox'
      )
      setDate(
        currentProject?.title === 'today'
          ? format(new Date(), 'yyyy-MM-dd')
          : ''
      )

      scrollDownToLastTask()
    }
    currentProject.title !== 'today' &&
      history.push(`/app/${project.toLowerCase()}`)
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
                {!['Inbox', 'today', 'upcoming'].includes(selectedProject) ? (
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
                <ProjectSelectMenu
                  data={projects}
                  state={selectedProject}
                  setState={setSelectedProject}
                  setIsMenuOpen={setIsMenuOpen}
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
          {edit ? 'Save' : 'Add task'}
        </AddTaskSubmitButton>
        <AddTaskCancel type='button' onClick={() => setIsOpen(false)}>
          Cancel
        </AddTaskCancel>
      </AddTaskFormForm>
    </AddTaskFormContainer>
  )
}
