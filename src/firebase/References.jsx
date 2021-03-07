import { useSelector } from 'react-redux'
import { firestore } from './config'

export const ProjectTasksReference = project => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return firestore
    .collection('users')
    .doc(userInfo?.id)
    .collection('projects')
    .doc(project)
    .collection('tasks')
}
