import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Alert, AsyncStorage, Image, TouchableOpacity } from 'react-native'
import { ImagePicker } from 'expo'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addPost} from '../store/posts/action'

class AddPost extends Component {
  constructor () {
    super ()
    this.state = {
      post: '',
      image: null
    }
  }

  pickImage = async () => {
    console.log('masuk pick image')
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log('ini result pick image', result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  handleAddPost = async () => {
    if (this.props.isLogin) {
      const { post, image } = this.state
      const formPost = new FormData()
      formPost.append('status', post)
      // formPost.append('images', image)
      formPost.append('image', {
        uri: image,
        type: 'image', // or photo.type
        name: 'testPhotoName'
      });
      // fetch('https://my-app-h8.herokuapp.com/posts/user', {
      //   method: 'post',
      //   body: data
      // }).then(res => {
      //   console.log(res)
      // });

      await this.props.addPost(formPost)
      Alert.alert('Add Post Success!')
    } else {
      Alert.alert('Add Post Failed!')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.label}>Add Post</Text>
          <TextInput
          name='post'
          placeholder="How are you?"
          style={styles.textInput}
          multiline={true}
          numberOfLines={3}
          onChangeText={(post) => this.setState({post})}
          />
          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity style={styles.button}>
              <Text
              style={styles.txtbtn}
              onPress={() => this.pickImage()}
              >ADD IMAGE</Text>
            </TouchableOpacity>
            {this.state.image &&
            <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}

            <TouchableOpacity style={styles.button}>
              <Text
              style={styles.txtbtn}
              onPress={() => this.handleAddPost()}
              >POST</Text>
            </TouchableOpacity>
          </View>
          {/* <Button
          title='Add Image'
          onPress={() => this.pickImage()}
          />
          
          <Button
          title='Post'
          onPress={() => this.handleAddPost()}
          /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    width: 300,
    padding: 5
  },
  container: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 1
  },
  form: {
    backgroundColor: '#88afdd',
    margin: 5,
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#4776b9'
  },
  label: {
    fontSize: 18,
    margin: 2
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