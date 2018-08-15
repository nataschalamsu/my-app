import React, { Component } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TextInput, 
  Button, 
  Alert, 
  AsyncStorage, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  RefreshControl 
} from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllPost, 
  addComment, 
  likePost, 
  dislikePost 
} from '../../store/posts/action'
import { signOut } from '../../store/users/action'
import TimelineItems from './timelineItems'
import CommentItems from './commentItems'
import Loading from '../../components/Loading'
import NotFound from '../../components/NotFound'

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
      } catch (err) {
        alert('Add Comment Failed')
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
      alert('Sign Out Error')
    }
  }

  handleLikePost = async (postId, post) => {
    try {
      await this.props.likePost(postId)
      await this.props.getAllPost()
    } catch (err) {
      alert(JSON.stringify(err))
    }
  }

  handleDislikePost = async (postId) => {
    try {
      await this.props.dislikePost(postId)
      await this.props.getAllPost()
    } catch (err) {
      alert(JSON.stringify(err))
    }
  }

  render() {
    const { 
      posts, 
      loading, 
      error 
    } = this.props
    if (loading) {
      return <Loading/>
    } else if (error.message) {
      return <NotFound error={error}/>
    } else {
      return (
        <View style={ styles.container }>
          <View style={ styles.containerTop }>
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
          keyExtractor={( item ) => 'id' + item._id}
          renderItem={({ item }) => (
            <TimelineItems item={ item } />
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
    width: 100,
    borderRadius: 5
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
    padding: 5,
    borderRadius: 5
  },
  buttonlike: {
    backgroundColor: '#040615',
    margin: 5,
    padding: 5,
    width: 100
  },
  likeBtnContainer: {
    flexDirection: 'row', 
    margin: 5
  },
  status: { 
    margin: 5, 
    fontSize: 16 
  },
  email: { 
    fontWeight: 'bold', 
    fontSize: 20 
  },
  postedAt: { 
    margin: 5 
  },
  userEmail: { 
    textDecorationLine: 'underline', 
    fontWeight: 'bold' 
  },
  likesContainer: { 
    flexDirection: 'row' 
  },
  commentTitle: { 
    fontWeight: 'bold', 
    borderBottomWidth: 1, 
    fontSize: 14 
  },
  containerTop: { 
    flexDirection: 'row' 
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