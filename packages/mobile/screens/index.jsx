import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import SignUp from './SignUp';

const AppStack = createStackNavigator();

export default function Securus() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: true }}>
        <AppStack.Screen name="Login" component={Login} />
        <AppStack.Screen name="Sign Up" component={SignUp} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
