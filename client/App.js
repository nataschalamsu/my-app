import React, { Component } from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './src/store/index'
import Home from './src/screens/Home'
import Login from './src/screens/Login'
import Timeline from './src/screens/Timeline'
import Profile from './src/screens/Profile'
import AddPost from './src/screens/AddPost'

const TimelineStack = createStackNavigator({
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
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})

const RootStack = createStackNavigator({
  Home: {
    screen: Home
  },
  Login: {
    screen: Login
  },
  Timeline: {
    screen: TimelineStack
  }
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    title: 'AN APP',
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
