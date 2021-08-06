import React from 'react';
import {
  Button,
  Center,
  HStack,
  Image,
  Text,
  ScrollView,
  Spacer,
} from 'native-base';
import Constants from 'expo-constants';
import {
  Artist,
  AWSEngineer,
  AzureEngineer,
  SafeDistancingAmbassador,
  Youtuber,
  Coins,
} from '../assets';

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
  let mt;
  if (Constants.platform.web) {
    mt = 3;
  } else {
    mt = 10;
  }

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
    <ScrollView pt={15} mt={mt} mx={3}>
      {players.map((player, idx) => {
        return (
          <HStack
            w="100%"
            alignItems="center"
            key={idx.toString()}
            px={3}
            my={2}
          >
            <Text fontSize="2xl" fontWeight="600" mr={3}>
              {idx + 1}.
            </Text>
            <Image source={getAvatar(player.avatar)} size="xs" mr={5} />
            <Text color="muted.700" fontSize="xl" fontWeight="500">
              {player.name}
            </Text>
            <Spacer />
            <Button shadow={7} startIcon={<Image source={Coins} size={3} />}>
              <Text>{player.coins}</Text>
            </Button>
          </HStack>
        );
      })}
    </ScrollView>
  );
}
