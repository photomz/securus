import React from 'react';
import { Heading, ScrollView } from 'native-base';
import CardItem from '../components/Card';
import Artist from '../assets/avatars/artist.png';
import AWSEngineer from '../assets/avatars/aws-engineer.png';
import AzureEngineer from '../assets/avatars/azure-engineer.png';
import SafeDistancingAmbassador from '../assets/avatars/safe-distancing-ambassador.png';
import Youtuber from '../assets/avatars/youtuber.png';
import TwoPowerup from '../assets/powerups/two-powerup.png';
import ThreePowerup from '../assets/powerups/three-powerup.png';
import FivePowerup from '../assets/powerups/five-powerup.png';

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
