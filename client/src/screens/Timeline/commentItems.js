import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'

class CommentItems extends Component {
  render() {
    const { item } = this.props
    return (
      <View style={ styles.commentList }>
        <Text style={ styles.userEmail }>
          {item.user.email}
        </Text>
        <Text>{item.comments}</Text>
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
  }
})

export default CommentItems
