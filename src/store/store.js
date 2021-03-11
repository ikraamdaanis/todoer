import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import {
  projectListReducer,
  projectCreateReducer,
} from './reducers/projectReducers'
import { taskReducer, taskListReducer } from './reducers/taskReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  projectCreate: projectCreateReducer,
  taskCreate: taskReducer,
  taskList: taskListReducer,
  projectList: projectListReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const allProjectsFromStorage = localStorage.getItem('allProjects')
  ? JSON.parse(localStorage.getItem('allProjects'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  projectList: { projects: allProjectsFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
