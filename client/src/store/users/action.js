import {
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
  LOADING,
  ERROR,
  SIGNOUT
} from './action.type'
import { AsyncStorage } from 'react-native'
import axios from 'axios'
const url = 'https://my-app-h8.herokuapp.com'

export const signUp = (data) => {
  return async dispatch => {
    dispatch(loading())
    try {
      const user = await axios({
        method: 'post',
        url: 'http://ff1ff19d.ngrok.io/users/signup',
        data: data
      })
      dispatch(signUpSuccess(user.data))
    } catch (err) {
      dispatch(processFailed())
    }
  }
}

export const signIn = (data) => {
  return async dispatch => {
    dispatch(loading())
    try {
      const user = await axios({
        method: 'post',
        url: 'http://ff1ff19d.ngrok.io/users/signin',
        data: data
      })
      console.log('user data===>', user.data)
      await AsyncStorage.setItem('token', user.data.token)
      dispatch(signInSuccess(user.data))
    } catch (err) {
      dispatch(processFailed())
    }
  }
}

export const signOut = () => {
  return async dispatch => {
    dispatch(loading())
    try {
      dispatch(logout())
    } catch (err) {
      dispatch(processFailed(err))
    }
  }
}

const signUpSuccess = (data) => ({
  type: SIGNUP_SUCCESS,
  payload: data
})

const signInSuccess = (data) => ({
  type: SIGNIN_SUCCESS,
  payload: data
})

const loading = () => ({
  type: LOADING
})

const processFailed = () => ({
  type: ERROR
})

const logout = () => ({
  type: SIGNOUT
})