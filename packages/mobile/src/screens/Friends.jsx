import React, { useState } from 'react';
import {
  Button,
  HStack,
  Image,
  Input,
  Text,
  Pressable,
  ScrollView,
  Spacer,
} from 'native-base';
import FriendSearch from '../assets/friends/friend-search.png';
import SelectFriend from '../assets/friends/select-friend.png';
import Artist from '../assets/avatars/artist.png';
import AWSEngineer from '../assets/avatars/aws-engineer.png';
import AzureEngineer from '../assets/avatars/azure-engineer.png';
import SafeDistancingAmbassador from '../assets/avatars/safe-distancing-ambassador.png';
import Youtuber from '../assets/avatars/youtuber.png';

const friends = [
  { name: 'Sugandi', avatar: 'AZURE_ENGINEER' },
  { name: 'Candice', avatar: 'YOUTUBER' },
  { name: 'Ligma', avatar: 'ARTIST' },
  { name: 'NotAKaren.', avatar: 'SAFE_DISTANCING_AMBASSADOR' },
];

export default function Friends() {
  const [inputValue, setInputValue] = useState(null);

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
    <>
      <Input
        variant="filled"
        InputRightElement={
          <Button
            startIcon={
              <Image
                source={FriendSearch}
                size="xs"
                onPress={() => {
                  // addFriend(inputValue);
                  setInputValue('');
                }}
              />
            }
          />
        }
        onChangeText={(v) => setInputValue(v)}
        value={inputValue}
        placeholder="Add Friend"
        m={3}
      />
      <ScrollView>
        {friends.map((friend, idx) => {
          return (
            <HStack
              w="100%"
              alignItems="center"
              key={idx.toString()}
              px={3}
              my={2}
            >
              <Image source={getAvatar(friend.avatar)} size="sm" mr={5} />
              <Text color="muted.700" fontSize="xl" fontWeight="500">
                {friend.name}
              </Text>
              <Spacer />
              <Pressable>
                <Image source={SelectFriend} size="xs" />
              </Pressable>
            </HStack>
          );
        })}
      </ScrollView>
    </>
  );
}
