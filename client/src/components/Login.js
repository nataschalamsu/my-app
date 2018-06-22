import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Alert, AsyncStorage } from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {signIn} from '../store/users/action'

class Login extends Component {
  constructor () {
    super ()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSignIn = async () => {
    let user = {
      email: this.state.email,
      password: this.state.password
    }
    console.log('user login ===> ', user)
    await this.props.signIn(user)
    if (this.props.isLogin) {
      try {
        AsyncStorage.setItem('userId', this.props.user.nowLogin._id)
      } catch (err) {
        console.log(err)
      }
      Alert.alert('Login Success')
      this.props.navigation.navigate('Timeline')
    } else {
      Alert.alert('Login Failed')
    }
  }

  render() {
    return (
      <View>
        <Text>An App</Text>
        <Text>Login</Text>
        <Text>Email:</Text>
        <TextInput
        name='email'
        placeholder='Email'
        value={this.state.email}
        onChangeText={(email) => this.setState({email})}
        />
        <Text>Password:</Text>
        <TextInput
        name='password'
        secureTextEntry={true}
        placeholder='Password'
        value={this.state.password}
        onChangeText={(password) => this.setState({password})}
        />
        <Button
        title='Sign In'
        onPress={() => this.handleSignIn()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
})

const mapStateToProps = (state) => {
  // console.log('ini isi state =>', state)
  const { data, isLogin, loading, error } = state.users
  return {
    user: data,
    isLogin: isLogin,
    loading: loading,
    error
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signIn
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (Login);