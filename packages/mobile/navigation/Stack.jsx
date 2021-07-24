import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Friends from '../screens/Friends';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Shop from '../screens/Shop';
import SignUp from '../screens/SignUp';

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Sign Up" component={SignUp} />
    </Stack.Navigator>
  );
}

export function HomePage() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen name="Shop" component={Shop} />
      <HomeStack.Screen name="Friends" component={Friends} />
    </HomeStack.Navigator>
  );
}
