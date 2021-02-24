import { useState, useEffect } from 'react'
import {
  AddProjectButton,
  AddProjectForm,
  AddProjectInput,
  Container,
  ProjectTitles,
  SidebarContainer,
} from './SidebarStyles'
import { useDispatch, useSelector } from 'react-redux'
import {
  createProject,
  getAllProjects,
} from '../../store/actions/projectActions'
import { firestore } from '../../firebase/config'

export const Sidebar = ({ isClosed }) => {
  const [project, setProject] = useState('')
  const [allProjects, setAllProjects] = useState([])
  const dispatch = useDispatch()

  const projectCreate = useSelector(state => state.projectCreate)
  const { loading, error } = projectCreate
  const allProjectsDetails = useSelector(state => state.allProjectsDetails)
  const { projects: stuff } = allProjectsDetails
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    // const unsubscribe = firestore
    //   .collection('users')
    //   .doc(userInfo?.id)
    //   .collection('projects')
    //   .orderBy('createdAt')
    //   .onSnapshot(snapshot => {
    //     let myDataArray = []
    //     console.log(snapshot)
    //     snapshot.forEach(doc => myDataArray.push({ ...doc.data() }))
    //     setAllProjects(myDataArray)
    //   })
    // console.log(stuff)
    // return () => {
    //   unsubscribe()
    // }
  }, [firestore])

  const handleSubmit = event => {
    event.preventDefault()
    console.log(project)
    dispatch(createProject(project))
    setProject('')
  }

  return (
    <SidebarContainer className={isClosed && 'closed'}>
      <Container>
        <ProjectTitles>
          {allProjects.length > 1 &&
            allProjects.map(project => (
              <li key={project.title}>{project.title}</li>
            ))}
        </ProjectTitles>
        <AddProjectForm autoComplete='off' onSubmit={handleSubmit}>
          <AddProjectInput
            type='text'
            id='projectTitle'
            required
            placeholder='Add new Project'
            value={project}
            onChange={event => setProject(event.target.value)}
          />
          <AddProjectButton type='submit'>+</AddProjectButton>
        </AddProjectForm>
      </Container>
    </SidebarContainer>
  )
}
