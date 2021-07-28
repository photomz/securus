import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Friends from '../screens/Friends';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import Shop from '../screens/Shop';
import SignUp from '../screens/SignUp';

const Stack = createStackNavigator();
const ProfileStack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Sign Up" component={SignUp} />
    </Stack.Navigator>
  );
}

export function ProfilePage() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen name="Shop" component={Shop} />
      <ProfileStack.Screen name="Friends" component={Friends} />
    </ProfileStack.Navigator>
  );
}
