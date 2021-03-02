import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import {
  projectListReducer,
  projectCreateModalReducer,
  projectCreateReducer,
  projectTasksReducer,
} from './reducers/projectReducers'
import {
  taskDeleteModalReducer,
  taskReducer,
  tasksReducer,
} from './reducers/taskReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  projectCreate: projectCreateReducer,
  projectCreateModal: projectCreateModalReducer,
  allProjectsDetails: projectListReducer,
  allProjectTasks: tasksReducer,
  projectTasksDetails: projectTasksReducer,
  taskCreate: taskReducer,
  taskDeleteModal: taskDeleteModalReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const allProjectsFromStorage = localStorage.getItem('allProjects')
  ? JSON.parse(localStorage.getItem('allProjects'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  allProjectsDetails: { projects: allProjectsFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
