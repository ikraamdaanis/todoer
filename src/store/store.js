import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import {
  allProjectsDetailsReducer,
  projectCreateReducer,
  projectTasksDetailsReducer,
} from './reducers/projectReducers'
import { taskCreateReducer } from './reducers/taskReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  projectCreate: projectCreateReducer,
  allProjectsDetails: allProjectsDetailsReducer,
  projectTasksDetails: projectTasksDetailsReducer,
  taskCreate: taskCreateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const allProjectsFromStorage = localStorage.getItem('allProjects')
  ? JSON.parse(localStorage.getItem('allProjects'))
  : null

const tasksFromStorage = localStorage.getItem('tasks')
  ? JSON.parse(localStorage.getItem('tasks'))
  : []

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  projectTasksDetails: { tasks: tasksFromStorage },
  allProjectsDetails: { projects: allProjectsFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
