import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Stacks from '../navigation/Stack';
import Tabs from '../navigation/Tab';

function userIsLoggedIn() {
  return true;
}

export default function Securus() {
  return (
    <NavigationContainer>
      {userIsLoggedIn() ? (
        <Tabs />
      ) : (
        <Stacks />
      )}
    </NavigationContainer>
  );
}
