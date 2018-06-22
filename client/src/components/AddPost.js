import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Alert, AsyncStorage } from 'react-native'
import { ImagePicker } from 'expo'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addPost} from '../store/posts/action'

class AddPost extends Component {
  constructor () {
    super ()
    this.state = {
      post: '',
      image: ''
    }
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  handleAddPost = async () => {
    if (this.props.isLogin) {
      const { post, image } = this.state
      const formPost = new FormData()
      formPost.append('status', post)
      formPost.append('image', image)
  
      await this.props.addPost(formPost)
      Alert.alert('Add Post Success!')
    } else {
      Alert.alert('Add Post Failed!')
    }
  }

  render() {
    return (
      <View>
        <Text>Add Post</Text>
        <TextInput
        name='post'
        placeholder="How are you?"
        style={styles.textInput}
        multiline={true}
        numberOfLines={3}
        onChangeText={(post) => this.setState({post})}
        />
        <Button
        title='Add Image'
        onPress={() => this.pickImage()}
        />
        {this.state.image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Button
        title='Post'
        onPress={() => this.handleAddPost()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: 'black'
  }
})

const mapStateToProps = (state) => {
  // console.log('ini isi state =>', state)
  const { isLogin } = state.users
  const { data, loading, error } = state.posts
  return {
    isLogin: isLogin,
    loading: loading,
    error
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addPost
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps) (AddPost);