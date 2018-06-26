import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Alert, AsyncStorage, FlatList, Image, TouchableOpacity } from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getPostByUser, addComment, deletePost, deleteComment} from '../store/posts/action'
import {signOut} from '../store/users/action'
import Loading from './Loading';
import NotFound from './NotFound';

class Profile extends Component {
  constructor () {
    super ()
    this.state = {
      comment: ''
    }
  }

  componentDidMount() {
    this.props.getPostByUser()
  }

  static navigationOptions = {
    title: 'PROFILE'
  }

  handleAddComment = async (postId) => {
    let newComment = {
      id: postId,
      comments: this.state.comment
    }
    try {
      await this.props.addComment(newComment)
      Alert.alert('Thanks for your comment!')
    } catch (err) {
      Alert.alert('Oops!')
    }
  }

  handleDeletePost = async (postId) => {
    try {
      await this.props.deletePost(postId)
      this.props.navigation.navigate('Profile')
    } catch (err) {
      console.log(err)
    }
  }

  handleDeleteComment = async (commentId) => {
    try {
      await this.props.deleteComment(commentId)
      this.props.navigation.navigate('Profile')
    } catch (err) {
      console.log(err)
    }
  }

  handleSignOut = async () => {
    if (this.props.isLogin) {
      try {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('userId')
        await this.props.signOut()
        this.props.navigation.navigate('Login')
      } catch (err) {
        console.log(err)
      }
    } else {
      Alert.alert('What are you trying to do?')
    }
  }

  dateFormat (dates) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let date = new Date(dates).getDate()
    let month = new Date(dates).getMonth()
    let year = new Date(dates).getFullYear()
    return (date < 10)? `0${date} ${months[month]} ${year}`: `${date} ${months[month]} ${year}`
  }

  render() {
    const { posts, loading, error } = this.props
    // console.log('props profile =======', posts)
    if (loading) {
      return <Loading/>
    } else if (error.message) {
      return <NotFound error={error}/>
    } else {
      return (
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.button}>
              <Text
              style={styles.txtbtn}
              onPress={() => this.props.navigation.navigate('AddPost')}
              >ADD POST</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text
              style={styles.txtbtn}
              onPress={() => {this.handleSignOut()}}
              >SIGN OUT</Text>
            </TouchableOpacity>
          </View>
          <FlatList
          data={posts}
          keyExtractor={(item) => 'id' + item._id}
          renderItem={({item}) => (
            <View style={styles.timeline}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{ item.user.email }</Text>
              <View>
                <Image source={{ uri: item.image }} style={styles.image}/>
              </View>
              <Text style={{ margin: 5, fontSize: 16 }}>{ item.status }</Text>
              <Text style={{ margin: 3 }}>posted at: {this.dateFormat( item.createdAt )}</Text>
                <View style={styles.commentBox}>
                  <Text style={{ fontWeight: 'bold', borderBottomWidth: 1, fontSize: 14 }}>Comments</Text>
                  <FlatList
                  data={item.comments}
                  renderItem={({item}) => (
                    <View style={{ borderBottomWidth: 1, margin: 5 }}>
                      <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>{item.user.email}</Text>
                      <Text>{item.comments}</Text>
                      <Text
                      style={{ color: 'red' }}
                      onPress={() => this.handleDeleteComment(item._id)}
                      >Delete</Text>
                    </View>
                  )}
                  />
                  <Text>Comment:</Text>
                  <TextInput
                  name='comment'
                  style={styles.textInput}
                  multiline={true}
                  numberOfLines={3}
                  onChangeText={(comment) => this.setState({comment})}
                  />
                  <TouchableOpacity style={styles.button}>
                    <Text
                    style={styles.txtbtn}
                    onPress={() => this.handleAddComment(item._id)}
                    >COMMENT</Text>
                  </TouchableOpacity>
                </View>
                <Text
                style={{ color: 'red' }}
                onPress={() => this.handleDeletePost(item._id)}
                >Delete Post</Text>
            </View>
          )}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  image: {
    height: 300,
    width: 300,
    margin: 5,
    alignSelf: 'center'
  },
  commentBox: {
    padding: 5,
    backgroundColor: 'white',
    width: 300,
    margin: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 25
  },
  label: {
    fontSize: 18,
    padding: 2
  },
  timeline: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'skyblue',
    margin: 5,
    padding: 5
  },
  button: {
    backgroundColor: '#144182',
    margin: 5,
    padding: 5,
    width: 100
  },
  txtbtn: {
    fontWeight: 'bold',
    padding: 2,
    alignSelf: 'center',
    color: 'white'
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black'
  }
})

const mapStateToProps = (state) => {
  // console.log('ini isi state =>', state)
  const { isLogin } = state.users
  const { userPosts, loading, error } = state.posts
  return {
    isLogin,
    posts: userPosts,
    loading: loading,
    error
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPostByUser,
  addComment,
  deletePost,
  deleteComment,
  signOut
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile);;