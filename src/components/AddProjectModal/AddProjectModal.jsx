import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  createProject,
  toggleProjectModal,
} from '../../store/actions/projectActions'
import {
  AddProjectButton,
  AddProjectFooter,
  AddProjectForm,
  AddProjectFormBody,
  AddProjectFormField,
  AddProjectFormHeader,
  AddProjectInput,
  AddProjectLabel,
  ModalContainer,
  ProjectModal,
} from './AddProjectModalStyles'

export const AddProjectModal = () => {
  const [project, setProject] = useState('')
  const dispatch = useDispatch()

  const projectCreate = useSelector(state => state.projectCreate)
  const { loading, success, error } = projectCreate

  const handleSubmit = async event => {
    event.preventDefault()
    dispatch(createProject(project))
  }

  const history = useHistory()

  useEffect(() => {
    if (success) {
      const proj = project
      setProject('')
      proj && history.push(`/app/${proj.toLowerCase()}`)
      proj && dispatch(toggleProjectModal())
    }
  }, [success])

  const form = useRef(null)
  const cancelButton = useRef(null)

  useEffect(() => {
    const toggleFocus = ({ target }) => {
      if (cancelButton.current?.contains(target)) {
        dispatch(toggleProjectModal())
        return
      }
      !form.current?.contains(target) && dispatch(toggleProjectModal())
    }
    document.body.addEventListener('click', toggleFocus)
    return () => {
      document.body.removeEventListener('click', toggleFocus)
    }
  }, [])

  return (
    <ModalContainer>
      <ProjectModal>
        <AddProjectForm onSubmit={handleSubmit} autoComplete='off' ref={form}>
          <AddProjectFormHeader>
            <h1>Add project</h1>
          </AddProjectFormHeader>
          <AddProjectFormBody>
            <AddProjectFormField>
              <AddProjectLabel htmlFor='projectName'>Name</AddProjectLabel>
              <AddProjectInput
                type='text'
                id='projectName'
                value={project}
                onChange={({ target }) => setProject(target.value)}
              />
            </AddProjectFormField>
          </AddProjectFormBody>
          <AddProjectFooter>
            <AddProjectButton type='button' ref={cancelButton}>
              Cancel
            </AddProjectButton>
            <AddProjectButton
              type='submit'
              className='add'
              aria-disabled={!!!project}
              disabled={!!!project}
            >
              Add
            </AddProjectButton>
          </AddProjectFooter>
        </AddProjectForm>
      </ProjectModal>
    </ModalContainer>
  )
}
