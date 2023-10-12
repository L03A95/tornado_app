import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/components/Login';
import Home from './src/components/Home';

const Stack = createStackNavigator();


function App(): JSX.Element { 
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#a00'
  }
})

export default App;
