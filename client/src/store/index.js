import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import users from './users/reducers'
import posts from './posts/reducers'

const reducers = combineReducers({
  users,
  posts
})

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

export default store