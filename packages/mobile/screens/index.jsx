import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import SignUp from './SignUp';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function userIsLoggedIn() {
  return true;
}

export default function Securus() {
  return (
    <NavigationContainer>
      {userIsLoggedIn() ? (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Login} />
          <Tab.Screen name="Settings" component={SignUp} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Sign Up" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
