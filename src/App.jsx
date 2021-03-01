import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import {
  DeleteTaskModal,
  Modal,
  ScrollToTop,
  AddProjectModal,
} from './components'
import { Dashboard, Navbar } from './containers'
import { Home, SignIn, SignUp } from './pages'
import { GlobalStyle } from './styles/globalStyle'

export const App = () => {
  const [isClosed, setIsClosed] = useState(false)
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const projectCreateModal = useSelector(state => state.projectCreateModal)
  const { isOpen: isProjectModalOpen } = projectCreateModal

  const taskDeleteModal = useSelector(state => state.taskDeleteModal)
  const { isOpen: isTaskModalOpen } = taskDeleteModal

  return (
    <>
      <Router>
        <GlobalStyle />
        <Navbar setIsClosed={setIsClosed} />
        <ScrollToTop />
        <main>
          <Switch style={{ display: 'flex' }}>
            <Route exact path='/app'>
              {userInfo && <Redirect to='/app/today' />}
            </Route>
            <Route
              path='/app/:id'
              render={props => <Dashboard {...props} isClosed={isClosed} />}
            />
            <Route
              exact
              path='/signin'
              render={props => <SignIn {...props} />}
            />
            <Route
              exact
              path='/signup'
              render={props => <SignUp {...props} />}
            />
            <Route exact path='/'>
              {userInfo && <Redirect to='/app/today' />}
            </Route>
          </Switch>
        </main>
        {isProjectModalOpen && (
          <Modal>
            <AddProjectModal />
          </Modal>
        )}
        <Route exact path='/app/:id/:action/:task'>
          <Modal>
            <DeleteTaskModal />
          </Modal>
        </Route>
      </Router>
    </>
  )
}
