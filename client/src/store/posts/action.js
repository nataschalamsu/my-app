import {
  ADD_POST_SUCCESS,
  ADD_COMMENT_SUCCESS,
  GET_POSTS_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_POST_SUCCESS,
  LOADING,
  ERROR
} from './action.type'
import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const getAllPost = () => {
  return dispatch => {
    dispatch(loading())
    axios.get('https://my-app-h8.herokuapp.com/posts')
      .then(({data}) => {
        // console.log('data yang didapat ______ ', data)
        dispatch(getAllPostSuccess(data.data))
      })
      .catch(err => dispatch(processFailed(err)))
  }
}

export const addPost = (data) => {
  return async dispatch => {
    dispatch(loading())
    try {
      console.log('masuk add post', data)
      let token = await AsyncStorage.getItem('token')
      const newPost = await axios({
        method: 'post',
        url: 'https://my-app-h8.herokuapp.com/posts',
        data: data,
        headers: {
          token: token
        }
      })
      console.log('kalo sukses dapet ini ===> ', newPost.data)
      dispatch(addPostSuccess(newPost.data))
    } catch (err) {
      dispatch(processFailed(err))
    }
  }
}

export const addComment = (data) => {
  return async dispatch => {
    dispatch(loading())
      
      let token = await AsyncStorage.getItem('token')
      console.log('token=====', token)
      axios
        .post('https://my-app-h8.herokuapp.com/comments', data, {
          headers: {
            token: token
          }
        })
        .then(response => {
          dispatch(addCommentSuccess(data))
        })
        .catch(err => {
          dispatch(processFailed(err))
        })
  }
}

const getAllPostSuccess = (data) => ({
  type: GET_POSTS_SUCCESS,
  payload: data
})

const addPostSuccess = (data) => ({
  type: ADD_POST_SUCCESS,
  payload: data
})

const addCommentSuccess = (data) => ({
  type: ADD_COMMENT_SUCCESS,
  payload: data
})

const loading = () => ({
  type: LOADING
})

const processFailed = (err) => ({
  type: ERROR,
  payload: err
})