import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useFocus, useMenu } from "../../hooks/"
import { createProject } from "../../store/actions/"
import {
  AddProjectButton,
  AddProjectFooter,
  AddProjectForm,
  AddProjectFormBody,
  AddProjectFormField,
  AddProjectFormHeader,
  AddProjectInput,
  AddProjectLabel,
  ProjectModal
} from "./AddProjectModalStyles"

export const AddProjectModal = ({ setIsProjectModalOpen }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const projectCreate = useSelector(state => state.projectCreate)
  const { success } = projectCreate

  const [project, setProject] = useState("")

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(createProject(project))
  }

  useEffect(() => {
    if (success) {
      const proj = project
      setProject("")
      proj && history.push(`/app/${proj.toLowerCase()}`)
      proj && setIsProjectModalOpen(false)
    }
  }, [history, project, success, setIsProjectModalOpen])

  const form = useRef(null)
  const cancelButton = useRef(null)
  useMenu(form, cancelButton, setIsProjectModalOpen)

  const input = useRef(null)
  useFocus(input)

  return (
    <ProjectModal>
      <AddProjectForm onSubmit={handleSubmit} autoComplete="off" ref={form}>
        <AddProjectFormHeader>
          <h1>Add project</h1>
        </AddProjectFormHeader>
        <AddProjectFormBody>
          <AddProjectFormField>
            <AddProjectLabel htmlFor="projectName">Name</AddProjectLabel>
            <AddProjectInput
              type="text"
              id="projectName"
              value={project}
              ref={input}
              onChange={({ target }) => setProject(target.value)}
            />
          </AddProjectFormField>
        </AddProjectFormBody>
        <AddProjectFooter>
          <AddProjectButton
            type="button"
            ref={cancelButton}
            onClick={() => setIsProjectModalOpen(false)}
          >
            Cancel
          </AddProjectButton>
          <AddProjectButton
            type="submit"
            className="add"
            aria-disabled={!project}
            disabled={!project}
          >
            Add
          </AddProjectButton>
        </AddProjectFooter>
      </AddProjectForm>
    </ProjectModal>
  )
}

AddProjectModal.propTypes = {
  setIsProjectModalOpen: PropTypes.func
}
