import React from 'react';
import { Alert } from 'react-native';
import { Image, Stack, Heading, Pressable } from 'native-base';

export default function CardComponent({ image, name, price }) {
  function confirmPurchase() {
    Alert.alert(
      'Confirmation',
      `Are you sure you want to buy ${name} for ${price} coins?`,
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => console.log('OK Pressed'), // increment user coins
        },
      ]
    );
  }

  return (
    <Pressable
      onPress={confirmPurchase}
      bg="white"
      shadow={2}
      rounded="lg"
      maxWidth={230}
      mr={3}
    >
      <Image source={image} resizeMode="cover" height={230} roundedTop="md" />
      <Stack space={4} p={[4, 4, 8]}>
        <Heading size={['md', 'lg', 'md']} noOfLines={2}>
          {name}
        </Heading>
      </Stack>
    </Pressable>
  );
}
