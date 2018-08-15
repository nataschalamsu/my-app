import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View
} from 'react-native';

class NotFound extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <Text>404 Not Found</Text>
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
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default NotFound;