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
import {
  FriendSearch,
  SelectFriend,
  Artist,
  AWSEngineer,
  AzureEngineer,
  SafeDistancingAmbassador,
  Youtuber,
} from '../assets';

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
                source={{ uri: FriendSearch }}
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
              <Image
                source={{ uri: getAvatar(friend.avatar) }}
                size="sm"
                mr={5}
              />
              <Text color="muted.700" fontSize="xl" fontWeight="500">
                {friend.name}
              </Text>
              <Spacer />
              <Pressable>
                <Image source={{ uri: SelectFriend }} size="xs" />
              </Pressable>
            </HStack>
          );
        })}
      </ScrollView>
    </>
  );
}
