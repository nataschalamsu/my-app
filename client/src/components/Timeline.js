import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Alert, AsyncStorage, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native'

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
      comment: '',
      refreshing: false,
      like: 'Like',
      dislike: 'Dislike'
    }
  }

  static navigationOptions = {
    title: 'TIMELINE',
    headerLeft: null
  }

  componentDidMount() {
    this.props.getAllPost()
  }

  handleAddComment = async (postId) => {
    if (!this.state.comment) {
      Alert.alert("Fill the comment box to comment this post" )
    } else {
      let newComment = {
        id: postId,
        comments: this.state.comment
      }
      try {
        await this.props.addComment(newComment)
        // await this.props.getAllPost()
      } catch (err) {
        console.log(err)
      }
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

  handleLikePost = async (postId, post) => {
    // console.log('ini post >>>>>', postId)
    try {
      await this.props.likePost(postId)
      // this.setState({ like: 'Liked' })
      await this.props.getAllPost()
    } catch (err) {
      console.log(err)
    }
  }

  handleDislikePost = async (postId) => {
    try {
      await this.props.dislikePost(postId)
      // this.setState({ dislike: 'Disliked' })
      await this.props.getAllPost()
    } catch (err) {
      console.log(err)
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
          keyExtractor={(item) => 'id' + item._id}
          renderItem={({item}) => (
            <View style={styles.timeline}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{ item.user.email }</Text>
              <View>
                <Image source={{ uri: item.image }} style={styles.image}/>
              </View>
              <View>
                <Text style={{ margin: 5, fontSize: 16 }}>{ item.status }</Text>
                <Text style={{ margin: 5 }}>posted at: {this.dateFormat( item.createdAt )}</Text>
                <View style={{ flexDirection: 'row', margin: 5 }}>
                  <Text>{ item.likes.length } Likes </Text>
                  <Text>{ item.dislikes.length } Dislikes</Text>
                </View>
                <View style={styles.commentBox}>
                  <Text style={{ fontWeight: 'bold', borderBottomWidth: 1, fontSize: 14 }}>Comments</Text>
                  <FlatList
                  data={item.comments}
                  renderItem={({item}) => (
                    <View style={{ borderBottomWidth: 1, margin: 5 }}>
                      <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>
                        {item.user.email}
                      </Text>
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
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.buttonlike}>
                  <Text
                  style={styles.txtbtn}
                  onPress={() => this.handleLikePost(item._id)}
                  >{this.state.like}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonlike}>
                  <Text
                  style={styles.txtbtn}
                  onPress={() => this.handleDislikePost(item._id)}
                  >{this.state.dislike}</Text>
                </TouchableOpacity>
              </View>
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
  buttonlike: {
    backgroundColor: '#040615',
    margin: 5,
    padding: 5,
    width: 100
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