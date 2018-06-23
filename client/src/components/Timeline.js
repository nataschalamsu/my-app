import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Alert, AsyncStorage, FlatList, Image, TouchableOpacity } from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getAllPost, addComment, likePost, dislikePost} from '../store/posts/action'
import {signOut} from '../store/users/action'
import Loading from './Loading';
import NotFound from './NotFound';

class Timeline extends Component {
  constructor () {
    super ()
    this.state = {
      comment: ''
    }
  }

  componentDidMount() {
    this.props.getAllPost()
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

  handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('userId')
      await this.props.signOut()
      this.props.navigation.navigate('Login')
    } catch (err) {
      console.log(err)
    }
  }

  handleLikePost = async (postId) => {
    try {
      await this.props.likePost(postId)
    } catch (err) {
      console.log(err)
    }
  }

  handleDisikePost = async (postId) => {
    try {
      await this.props.dislikePost(postId)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { posts, loading, error } = this.props
    // console.log(typeof posts)
    // console.log('ini posts ====> ', posts)
    if (loading) {
      return <Loading/>
    } else if (error.message) {
      return <NotFound error={error}/>
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.subtitle}>Timeline</Text>
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
              onPress={() => this.props.navigation.navigate('Profile')}
              >PROFILE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text
              style={styles.txtbtn}
              onPress={() => {this.handleSignOut()}}
              >SIGN OUT</Text>
            </TouchableOpacity>
          </View>
          <FlatList
          data={ posts }
          // keyExtractor={({item}) => item._id}
          renderItem={({item}) => (
            <View style={styles.timeline}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{ item.user.email }</Text>
              <View>
                <Image source={{ uri: item.image }} style={styles.image}/>
              </View>
              <View>
                <Text style={{ margin: 5, fontSize: 16 }}>{ item.status }</Text>
                <View style={styles.commentBox}>
                  <Text style={{ fontWeight: 'bold', borderBottomWidth: 1 }}>Comments</Text>
                  <FlatList
                  data={item.comments}
                  renderItem={({item}) => (
                    <View style={{ borderBottomWidth: 1 }}>
                      <Text>{item.user.email}</Text>
                      <Text>{item.comments}</Text>
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
              </View>
              <Text
              onPress={() => {this.handleLikePost(item._id)}}
              >Like</Text>
              <Text
              onPress={() => {this.handleLikePost(item._id)}}
              >Unlike</Text>
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
  textInput: {
    borderWidth: 1,
    borderColor: 'black'
  },
  button: {
    backgroundColor: 'skyblue',
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
  text: {

  }
})

const mapStateToProps = (state) => {
  console.log('ini state post===>', state.posts )
  const { postData, loading, error } = state.posts
  return {
    posts: postData,
    loading: loading,
    error: error
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAllPost,
  addComment,
  signOut,
  likePost,
  dislikePost
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (Timeline);