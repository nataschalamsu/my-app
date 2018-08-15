import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'

class CommentItems extends Component {

  handleDeleteComment = async (commentId) => {
    try {
      await this.props.deleteComment(commentId)
      this.props.navigation.navigate('Profile')
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { item } = this.props
    return (
      <View style={ styles.commentList }>
        <Text style={ styles.userEmail }>
          { item.user.email }
        </Text>
        <Text>{ item.comments }</Text>
        <Text
          style={ styles.deleteComment }
          onPress={() => this.handleDeleteComment(item._id)}>
          Delete
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  commentList: { 
    borderBottomWidth: 1, 
    margin: 5 
  },
  userEmail: { 
    textDecorationLine: 'underline', 
    fontWeight: 'bold' 
  },
  deleteComment: { 
    color: 'red' 
  }
})

export default CommentItems
