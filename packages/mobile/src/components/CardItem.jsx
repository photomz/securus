import React from 'react';
import { Box, HStack, Icon, Image, Stack } from 'native-base';
// eslint-disable-next-line import/no-extraneous-dependencies
import Constants from 'expo-constants';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';

export default function CardItem({ imageURI }) {
  let marginTop;
  if (Constants.platform.ios) marginTop = '30%';
  else if (Constants.platform.android) marginTop = '20%';

  return (
    <Box bg="white" shadow={2} rounded="lg" mt={marginTop} mx="auto">
      <Image
        source={{
          uri: imageURI,
        }}
        alt="Incriminating image"
        resizeMode="cover"
        roundedTop="md"
        h="500px"
      />
      <Stack alignItems="center">
        <HStack my={6} space={10} alignItems="center">
          <Icon
            as={<Ionicons name="ios-close-circle" />}
            color="red"
            size={10}
            mx={10}
          />
          <Icon
            as={<Ionicons name="ios-checkmark-circle" />}
            color="green"
            size={10}
            mx={10}
          />
        </HStack>
      </Stack>
    </Box>
  );
}
