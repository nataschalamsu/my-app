import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image 
} from 'react-native';

class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={ require('../assets/kucing.gif') }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Loading;