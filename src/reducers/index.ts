import { combineReducers } from 'redux'
import todos from './Todos'
import user from "./User";
// import visibilityFilter from './visibilityFilter'

export default combineReducers({
    todos,
    user
})