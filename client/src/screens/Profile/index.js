import React, { Component } from 'react';
import { View, 
  StyleSheet, 
  Text,
  Alert, 
  AsyncStorage, 
  FlatList,
  TouchableOpacity 
} from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
  getPostByUser, 
  addComment, 
  deletePost, 
  deleteComment 
} from '../../store/posts/action'
import { signOut } from '../../store/users/action'
import TimelineItems from './timelineItems'
import Loading from '../../components/Loading'
import NotFound from '../../components/NotFound'

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
    if (loading) {
      return <Loading/>
    } else if (error.message) {
      return <NotFound error={error}/>
    } else {
      return (
        <View style={styles.container}>
          <View style={ styles.containerTop }>
            <TouchableOpacity style={ styles.button }>
              <Text
              style={ styles.txtbtn }
              onPress={() => this.props.navigation.navigate('AddPost')}
              >ADD POST</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ styles.button }>
              <Text
              style={ styles.txtbtn }
              onPress={() => {this.handleSignOut()}}
              >SIGN OUT</Text>
            </TouchableOpacity>
          </View>
          <FlatList
          data={ posts }
          keyExtractor={( item ) => 'id' + item._id}
          renderItem={({ item }) => (
            <TimelineItems item={ item }/>
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
    width: 100,
    borderRadius: 5
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
  },
  containerTop: { 
    flexDirection: 'row' 
  },
  userEmail: { 
    fontWeight: 'bold', 
    fontSize: 20 
  },
  status: { 
    margin: 5, 
    fontSize: 16 
  },
  deletePost: { 
    color: 'red' 
  },
  postedAt: { 
    margin: 3 
  },
  commentTitle: { 
    fontWeight: 'bold', 
    borderBottomWidth: 1, 
    fontSize: 14 
  },
  commentsContainer: { 
    borderBottomWidth: 1, 
    margin: 5 
  },
  userEmail: { 
    textDecorationLine: 'underline', 
    fontWeight: 'bold' 
  }
})

const mapStateToProps = (state) => {
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