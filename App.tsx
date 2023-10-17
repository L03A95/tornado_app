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
import { useState, useEffect } from 'react'
import axios from "axios";
import CardScreen from './src/components/CardScreen';
import CreateForm from './src/components/CreateForm';

const Stack = createStackNavigator();



function App(): JSX.Element { 

  const [menus, setMenus] = useState([])

  useEffect(() => {
      axios.get('https://tornado-api.vercel.app')
      .then(res => setMenus(res.data))
      .catch(err => console.log(err.message))
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Home">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        {menus.map((m : any) => {
          return <Stack.Screen name={m._id} component={CardScreen} options={{headerShown: false}} key={m._id}/>
        })}
        <Stack.Screen name='CreateForm' component={CreateForm} options={{headerShown: false}}/>
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
