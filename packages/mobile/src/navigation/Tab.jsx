import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withAuthenticator } from 'aws-amplify-react-native';
import Feed from '../screens/Feed';
import Profile from '../screens/Profile';
import { HomePage } from './Stack';
import Leaderboard from '../screens/Leaderboard';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Feed') {
            iconName = focused
              ? 'ios-file-tray-stacked'
              : 'ios-file-tray-stacked-outline';
          } else if (route.name === 'Leaderboard') {
            iconName = focused ? 'ios-podium' : 'ios-podium-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default withAuthenticator(Tabs);
