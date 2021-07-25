import React from 'react';
// prettier-ignore
import {
  Avatar, Button, Center, Icon, Text
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const navigation = useNavigation();

  function navigateToShop() {
    navigation.navigate('Shop');
  }

  function navigateToFriends() {
    navigation.navigate('Friends');
  }

  return (
    <Center flex={1}>
      <Avatar
        size="2xl"
        source={{
          uri: 'https://i.pinimg.com/736x/43/1b/21/431b211b0f3c41da7ac1e962de725415.jpg',
        }}
      >
        LG
      </Avatar>
      <Text bold fontSize="xl" mt={2}>
        We Eat Bears
      </Text>
      <Button
        mt={10}
        bg="primary.400"
        w="50%"
        p={4}
        rounded="xl"
        startIcon={
          <Icon as={<Ionicons name="ios-cart" color="white" />} size={6} />
        }
        onPress={navigateToShop}
        _text={{
          fontSize: 'md',
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        Coins: 1000
      </Button>
      <Button
        mt={6}
        bg="primary.400"
        w="50%"
        p={4}
        rounded="xl"
        startIcon={
          <Icon as={<Ionicons name="ios-people" color="white" />} size={6} />
        }
        onPress={navigateToFriends}
        _text={{
          fontSize: 'md',
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        Friends: 10
      </Button>
    </Center>
  );
}
