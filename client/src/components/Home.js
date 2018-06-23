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
    let { username, email, password } = this.state
    let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    if (!username || !email || !password) {
      Alert.alert('Please fill the form to register')
    } else if (!email.match(emailRegex)) {
      Alert.alert('Wrong email format')
    } else {
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
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.title}>Welcome to An App!</Text>
        <View style={styles.form}>
          <Text style={styles.subtitle}>Register</Text>
          <Text style={styles.label}>Username:</Text>
          <TextInput
          name='username'
          placeholder='Username'
          value={this.state.username}
          style={styles.textInput}
          onChangeText={(username) => this.setState({username})}
          />
          <Text style={styles.label}>Email:</Text>
          <TextInput
          name='email'
          placeholder='Email'
          value={this.state.email}
          style={styles.textInput}
          onChangeText={(email) => this.setState({email})}
          />
          <Text style={styles.label}>Password:</Text>
          <TextInput
          name='password'
          secureTextEntry={true}
          placeholder='Password'
          value={this.state.password}
          style={styles.textInput}
          onChangeText={(password) => this.setState({password})}
          />
          <Button
          title='Sign Up'
          onPress={() => this.handleSignUp()}
          />
          <Text
          style={styles.label}
          onPress={() => this.props.navigation.navigate('Login')}
          >Already a member? Login here</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1
  },
  textInput: {
    width: 300,
    padding: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    margin: 5
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 25,
    margin: 5,
  },
  label: {
    fontSize: 18,
    margin: 2
  },
  form: {
    backgroundColor: '#88afdd',
    margin: 5,
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#4776b9'
  }
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