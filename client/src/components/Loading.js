import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
// import kucing from './kucing.gif'

class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={ require('./kucing.gif') }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Loading;