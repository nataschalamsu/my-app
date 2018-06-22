import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Alert, AsyncStorage } from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {signUp} from '../store/users/action'

class Home extends Component {
  constructor () {
    super ()
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  handleSignUp = async () => {
    let newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    console.log('from state===>', newUser)
    await this.props.signUp(newUser)
    if (this.props.isLogin) {
      console.log('ini props user ====>', this.props.user)
      // this.setItem('userId', this.props.user.newData._id)
      try {
        await AsyncStorage.setItem('userId', this.props.user.newData._id)
        // return item
      } catch (err) {
        console.log(err)
      }
      Alert.alert('Registration Success')
      this.props.navigation.navigate('Timeline')
    } else {
      Alert.alert('Registration Failed')
    }
  }

  render() {
    return (
      <View>
        <Text>An App</Text>
        <Text>Register</Text>
        <Text>Username:</Text>
        <TextInput
        name='username'
        placeholder='Username'
        value={this.state.username}
        onChangeText={(username) => this.setState({username})}
        />
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
        title='Sign Up'
        onPress={() => this.handleSignUp()}
        />
        <Text
        onPress={() => this.props.navigation.navigate('Login')}
        >Already a member? Login here</Text>
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
  signUp
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (Home);