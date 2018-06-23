import {
  ADD_POST_SUCCESS,
  ADD_COMMENT_SUCCESS,
  GET_POSTS_SUCCESS,
  GET_USER_POSTS_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_POST_SUCCESS,
  LIKE_SUCCESS,
  DISLIKE_SUCCESS,
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

export const addPost = (post) => {
  return async dispatch => {
    dispatch(loading())
    try {
      console.log('masuk add post', post)
      let token = await AsyncStorage.getItem('token')
      console.log('ini token ====> ', token)
      const newPost = await axios({
        method: 'post',
        url: 'https://my-app-h8.herokuapp.com/posts',
        data: post,
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
          'Accept': 'application/json'
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

export const getPostByUser = (data) => {
  return async dispatch => {
    dispatch(loading())
      let token = await AsyncStorage.getItem('token')
      console.log('token=====', token)
      axios.get('https://my-app-h8.herokuapp.com/posts/user', {
        headers: {
          token: token
        }
      })
      .then(({data}) => {
        console.log('data yang didapat dari user >>>>> ', data)
        dispatch(getPostByUserSuccess(data.data))
      })
      .catch(err => dispatch(processFailed(err)))
  }
}

export const deletePost = (postId) => {
  return async dispatch => {
    dispatch(loading())
    try {
      let token = await AsyncStorage.getItem('token')
      await axios.delete(`https://my-app-h8.herokuapp.com/posts/${postId}`)
      dispatch(deletePostSuccess())
    } catch (err) {
      dispatch(processFailed(err))
    }
  }
}

export const deleteComment = (commentId) => {
  return async dispatch => {
    dispatch(loading())
    try {
      let token = await AsyncStorage.getItem('token')
      await axios.delete(`https://my-app-h8.herokuapp.com/posts/${commentId}`)
      dispatch(deleteCommentSuccess())
    } catch (err) {
      dispatch(processFailed(err))
    }
  }
}

export const likePost = (postId) => {
  return async dispatch => {
    dispatch(loading())
    try {
      let token = await AsyncStorage.getItem('token')
      await axios.get(`https://my-app-h8.herokuapp.com/posts/likes/${postId}`)
      dispatch(likePostSuccess())
    } catch (err) {
      dispatch(processFailed(err))
    }
  }
}

export const dislikePost = (postId) => {
  return async dispatch => {
    dispatch(loading())
    try {
      let token = await AsyncStorage.getItem('token')
      await axios.get(`https://my-app-h8.herokuapp.com/posts/dislikes/${postId}`)
      dispatch(dislikePostSuccess())
    } catch (err) {
      dispatch(processFailed(err))
    }
  }
}

const likePostSuccess = () => ({
  type: LIKE_SUCCESS
})

const dislikePostSuccess = () => ({
  type: DISLIKE_SUCCESS
})

const getPostByUserSuccess = (data) => ({
  type: GET_USER_POSTS_SUCCESS,
  payload: data
})

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

const deletePostSuccess = () => ({
  type: DELETE_POST_SUCCESS
})

const deleteCommentSuccess = () => ({
  type: DELETE_COMMENT_SUCCESS
})

const loading = () => ({
  type: LOADING
})

const processFailed = (err) => ({
  type: ERROR,
  payload: err
})