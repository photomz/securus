import React from 'react';
import { Heading, ScrollView } from 'native-base';
import CardItem from '../components/Card';
import {
  Artist,
  AWSEngineer,
  AzureEngineer,
  SafeDistancingAmbassador,
  Youtuber,
  TwoPowerup,
  ThreePowerup,
  FivePowerup,
} from '../assets';

const avatars = [
  { image: Artist, name: 'Artist', price: 250 },
  { image: AWSEngineer, name: 'AWS Engineer', price: 750 },
  { image: AzureEngineer, name: 'Azure Engineer', price: 250 },
  {
    image: SafeDistancingAmbassador,
    name: 'Safe Distancing Ambassador',
    price: 250,
  },
  { image: Youtuber, name: 'Youtuber', price: 650 },
];

const powerups = [
  { image: TwoPowerup, name: '2x Power Up', price: 200 },
  { image: ThreePowerup, name: '3x Power Up', price: 360 },
  { image: FivePowerup, name: '5x Power Up', price: 550 },
];

export default function Shop() {
  return (
    <ScrollView m={3}>
      <Heading mb={3}>Avatars</Heading>
      <ScrollView horizontal>
        {avatars.map((avatar) => (
          <CardItem
            image={avatar.image}
            name={avatar.name}
            price={avatar.price}
          />
        ))}
      </ScrollView>
      <Heading my={3}>Power Ups</Heading>
      <ScrollView horizontal>
        {powerups.map((powerup) => (
          <CardItem
            image={powerup.image}
            name={powerup.name}
            price={powerup.price}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
}
