import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from '../screens/Feed';
import { HomePage } from './Stack';
import Leaderboard from '../screens/Leaderboard';

const Tab = createBottomTabNavigator();

export default function Tabs() {
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
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
    </Tab.Navigator>
  );
}
