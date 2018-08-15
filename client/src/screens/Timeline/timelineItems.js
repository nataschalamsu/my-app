import React, { Component } from 'react'
import { 
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native'

import CommentItems from './commentItems'

class TimelineItems extends Component {
  constructor () {
    super ()
    this.state = {
      comment: '',
      refreshing: false,
      like: 'Like',
      dislike: 'Dislike'
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
    const { item } = this.props

    return (
      <View style={styles.timeline}>
        <Text style={ styles.email }>{ item.user.email }</Text>
        <View>
          <Image source={{ uri: item.image }} style={styles.image}/>
        </View>
        <View>
          <Text style={ styles.status }>{ item.status }</Text>
          <Text style={ styles.postedAt }>posted at: {this.dateFormat( item.createdAt )}</Text>
          <View style={ styles.likeBtnContainer }>
            <Text>{ item.likes.length } Likes </Text>
            <Text>{ item.dislikes.length } Dislikes</Text>
          </View>
          <View style={styles.commentBox}>
            <Text style={ styles.commentTitle }>Comments</Text>
            <FlatList
            data={item.comments}
            renderItem={({item}) => (
              <CommentItems item={ item }/>
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
        <View style={ styles.likesContainer }>
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
    )
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
    alignSelf: 'center',
    borderRadius: 5
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
    margin: 5,
    borderRadius: 5
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
  }
})

export default TimelineItems