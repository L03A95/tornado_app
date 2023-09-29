/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import Login from './src/components/Login';

function App(): JSX.Element { 
  return (
    <View style={styles.background}>
      <Login></Login>
    </View>
    )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#a00'
  }
})

export default App;
