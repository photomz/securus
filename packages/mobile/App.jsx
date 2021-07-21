import React from 'react';
import { NativeBaseProvider } from 'native-base';
import Securus from './screens';

export default function App() {
  return (
    <NativeBaseProvider>
      <Securus />
    </NativeBaseProvider>
  );
}
