import {
  ADD_POST_SUCCESS,
  ADD_COMMENT_SUCCESS,
  GET_POSTS_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_POST_SUCCESS,
  LIKE_SUCCESS,
  DISLIKE_SUCCESS,
  LOADING,
  ERROR,
  GET_USER_POSTS_SUCCESS
} from './action.type'

const initialState = {
  postData: [],
  userPosts: [],
  data: {},
  loading: false,
  error: {
    message: '',
    status: false
  }
}

console.log(initialState)

const posts = (state={...initialState}, action) => {
  switch(action.type) {
    case GET_POSTS_SUCCESS:
      return ({
        ...state,
        loading: false,
        postData: action.payload
      })
    case GET_USER_POSTS_SUCCESS:
      return ({
        ...state,
        loading: false,
        userPosts: action.payload
      })
    case ADD_POST_SUCCESS:
      return ({
        ...state,
        loading: false,
        data: action.payload
      })
    case ADD_COMMENT_SUCCESS:
      return ({
        ...state,
        loading: false,
        data: action.payload
      })
    case DELETE_POST_SUCCESS:
      return ({
        ...state,
        loading: false
      })
    case DELETE_COMMENT_SUCCESS:
      return ({
        ...state,
        loading: false
      })
    case LIKE_SUCCESS:
      return ({
        ...state,
        loading: false
      })
    case DISLIKE_SUCCESS:
      return ({
        ...state,
        loading: false
      })
    case LOADING:
      return ({
        ...state,
        loading: true
      })
    case ERROR:
      return ({
        ...state,
        loading: false,
        error: {
          message: action.payload,
          status: true
        }
      })
    default:
      return state
  }
}

export default posts