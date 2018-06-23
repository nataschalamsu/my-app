import {
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
  LOADING,
  ERROR,
  SIGNOUT
} from './action.type'

const initialState = {
  data: {},
  isLogin: false,
  loading: false,
  error: {
    message: '',
    status: false
  }
}

console.log('initial state --->', initialState)

const users = (state={...initialState}, action) => {
  switch(action.type) {
    case SIGNUP_SUCCESS:
      return ({
        ...state,
        data: action.payload,
        loading: false,
        isLogin: true
      })
    case SIGNIN_SUCCESS:
      return ({
        ...state,
        isLogin: true,
        data: action.payload,
        loading: false
      })
    case SIGNOUT:
      return ({
        ...state,
        isLogin: false,
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
        isLogin: false,
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

export default users