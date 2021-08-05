import React from 'react';
import { Heading, ScrollView } from 'native-base';
import CardItem from '../components/Card';
import Artist from '../assets/avatars/artist.png';
import AWSEngineer from '../assets/avatars/aws-engineer.png';
import AzureEngineer from '../assets/avatars/azure-engineer.png';
import SafeDistancingAmbassador from '../assets/avatars/safe-distancing-ambassador.png';
import Youtuber from '../assets/avatars/youtuber.png';

const avatars = [
  { image: Artist, name: 'Artist' },
  { image: AWSEngineer, name: 'AWS Engineer' },
  { image: AzureEngineer, name: 'Azure Engineer' },
  { image: SafeDistancingAmbassador, name: 'Safe Distancing Ambassador' },
  { image: Youtuber, name: 'Youtuber' },
];

export default function Shop() {
  return (
    <ScrollView m={3}>
      <Heading mb={3}>Avatars</Heading>
      <ScrollView horizontal>
        {avatars.map((avatar) => (
          <CardItem image={avatar.image} name={avatar.name} />
        ))}
      </ScrollView>
    </ScrollView>
  );
}
