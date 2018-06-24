import React, { Component } from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './src/store/index'
import Home from './src/components/Home'
import Login from './src/components/Login'
import Timeline from './src/components/Timeline'
import Profile from './src/components/Profile'
import AddPost from './src/components/AddPost'



const RootStack = createStackNavigator({
  Home: {
    screen: Home
  },
  Login: {
    screen: Login
  },
  Timeline: {
    screen: Timeline
  },
  Profile: {
    screen: Profile
  },
  AddPost: {
    screen: AddPost
  }
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    title: 'MY APP',
    headerStyle: {
      backgroundColor: '#144182',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack/>
      </Provider>
    );
  }
}
