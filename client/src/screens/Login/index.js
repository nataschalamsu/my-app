import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Alert, AsyncStorage, ScrollView } from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {signIn} from '../../store/users/action'
import Loading from '../../components/Loading'
import NotFound from '../../components/NotFound'

class Login extends Component {
  constructor () {
    super ()
    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('userId', (error, result) => {
      if (result) {
        this.props.navigation.navigate('Timeline')
      }
    })
  }

  handleSignIn = async () => {
    let { email, password } = this.state
    if (!email || !password) {
      Alert.alert('Please fill in the form to Login')
    } else {
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
        this.props.navigation.navigate('Timeline')
      } else {
        Alert.alert('Login Failed')
      }
    }
  }

  render() {
    const { loading, error } = this.props
    if (loading) {
      return <Loading/>
    } else if (error.message) {
      return <NotFound error={error}/>
    } else {
      return (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.form}>
              <Text style={styles.subtitle}>Login</Text>
              <Text style={styles.label}>Email:</Text>
              <TextInput
              style={styles.textInput}
              name='email'
              placeholder='Email'
              value={this.state.email}
              onChangeText={(email) => this.setState({email})}
              />
              <Text style={styles.label}>Password:</Text>
              <TextInput
              style={styles.textInput}
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
          </View>
        </ScrollView>
      );
    }
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
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    margin: 5
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 25,
    margin: 2
  },
  label: {
    fontSize: 18,
    margin: 2
  },
  textInput: {
    width: 300,
    padding: 5
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
  signIn
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (Login);