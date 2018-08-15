import React, { Component } from 'react';
import { View, 
  StyleSheet, 
  Text, 
  TextInput, 
  Button, 
  Alert, 
  AsyncStorage, 
  Image, 
  ScrollView 
} from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signUp } from '../../store/users/action'
import logo from '../../assets/people.png'
import Loading from '../../components/Loading'
import NotFound from '../../components/NotFound'

class Home extends Component {
  constructor () {
    super ()
    this.state = {
      username: '',
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
      await this.props.signUp(newUser)
      if (this.props.isLogin) {
        try {
          await AsyncStorage.setItem('userId', this.props.user.newData._id)
        } catch (err) {
          console.log(err)
        }
        Alert.alert('Registration Success')
        this.props.navigation.navigate('Login')
      } else {
        Alert.alert('Registration Failed')
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
        <Image source={ logo }/>
        <Text style={styles.title}>AN APP</Text>
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
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
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
    fontSize: 30,
    margin: 5
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 25,
    margin: 5,
    alignSelf: 'center'
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
  },
  image: {
    height: 50,
    width: 50,
    margin: 10,
    padding: 5
  }
})

const mapStateToProps = (state) => {
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