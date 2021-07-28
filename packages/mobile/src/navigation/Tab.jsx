import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withAuthenticator } from 'aws-amplify-react-native';
import Feed from '../screens/Feed';
import Home from '../screens/Home';
import { ProfilePage } from './Stack';
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
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
}

export default withAuthenticator(Tabs);
