import React from 'react';
import { Button, HStack, Image, Text, ScrollView, Spacer } from 'native-base';
import Artist from '../assets/avatars/artist.png';
import AWSEngineer from '../assets/avatars/aws-engineer.png';
import AzureEngineer from '../assets/avatars/azure-engineer.png';
import SafeDistancingAmbassador from '../assets/avatars/safe-distancing-ambassador.png';
import Youtuber from '../assets/avatars/youtuber.png';
import Coins from '../assets/misc/coins.png';

const players = [
  { name: 'Securus :^)', avatar: 'AWS_ENGINEER', coins: 69421 },
  { name: 'le gandee 🥸', avatar: 'AWS_ENGINEER', coins: 69420 },
  { name: 'Candice', avatar: 'YOUTUBER', coins: 100 },
  { name: 'Ligma', avatar: 'ARTIST', coins: 99 },
  { name: 'NotAKaren.', avatar: 'SAFE_DISTANCING_AMBASSADOR', coins: 98 },
  { name: 'Sugandi', avatar: 'AZURE_ENGINEER', coins: 97 },
  { name: 'Candice', avatar: 'YOUTUBER', coins: 96 },
  { name: 'Ligma', avatar: 'ARTIST', coins: 69 },
  { name: 'NotAKaren.', avatar: 'SAFE_DISTANCING_AMBASSADOR', coins: 42 },
  { name: 'noobmaster69', avatar: 'AZURE_ENGINEER', coins: 1 },
];

export default function Leaderboard() {
  function getAvatar(avatar) {
    switch (avatar) {
      case 'ARTIST':
        return Artist;
      case 'AWS_ENGINEER':
        return AWSEngineer;
      case 'AZURE_ENGINEER':
        return AzureEngineer;
      case 'SAFE_DISTANCING_AMBASSADOR':
        return SafeDistancingAmbassador;
      case 'YOUTUBER':
        return Youtuber;
    }
  }

  return (
    <ScrollView pt={15} mt={10}>
      {players.map((player, idx) => {
        return (
          <HStack
            w="100%"
            alignItems="center"
            key={idx.toString()}
            px={3}
            my={2}
            shadow={7}
          >
            <Image source={getAvatar(player.avatar)} size="xs" mr={5} />
            <Text color="muted.700" fontSize="xl" fontWeight="500">
              {player.name}
            </Text>
            <Spacer />
            <Button startIcon={<Image source={Coins} size={3} />}>
              <Text>{player.coins}</Text>
            </Button>
          </HStack>
        );
      })}
    </ScrollView>
  );
}
