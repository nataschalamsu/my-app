import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Alert, AsyncStorage, FlatList, Image, TouchableOpacity } from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getAllPost, addComment} from '../store/posts/action'

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

  render() {
    const { posts, loading, error } = this.props
    // console.log(typeof posts)
    // console.log('ini posts ====> ', posts)
    return (
      <View>
        <Text>Timeline</Text>
        <TouchableOpacity style={styles.button}>
          <Text
          style={styles.txtbtn}
          onPress={() => this.props.navigation.navigate('AddPost')}
          >ADD POST</Text>
        </TouchableOpacity>
        <FlatList
        data={ posts }
        // keyExtractor={({item}) => item._id}
        renderItem={({item}) => (
          <View style={styles.container}>
            <Text>{ item.user.email }</Text>
            <View>
              <Image source={{ uri: item.image }} style={styles.image}/>
            </View>
            <View>
              <Text>{ item.status }</Text>
              <View style={styles.commentBox}>
                <Text>Comments</Text>
                <FlatList
                data={item.comments}
                renderItem={({item}) => (
                  <View>
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
          </View>
        )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: 'column',
    borderColor: 'black',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 1,
    borderWidth: 1
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
    backgroundColor: 'skyblue'
  },
  txtbtn: {
    fontWeight: 'bold',
    padding: 2,
    alignSelf: 'center',
    color: 'white'
  },
  commentBox: {
    flex: 3,
    padding: 2,
    borderWidth: 1,
    width: 300,
    margin: 2
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
  addComment
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (Timeline);