import React from 'react';
import { Box, HStack, Image, Stack } from 'native-base';
// eslint-disable-next-line import/no-extraneous-dependencies
import Constants from 'expo-constants';
import { Nah, Yay } from '../assets';

export default function CardItem({ image }) {
  let marginTop;
  if (Constants.platform.ios) marginTop = '28%';
  else if (Constants.platform.android) marginTop = '22%';

  return (
    <Box bg="white" shadow={2} rounded="lg" mt={marginTop}>
      <Image
        source={{ uri: image }}
        resizeMode="cover"
        roundedTop="md"
        h="550px"
      />
      <Stack alignItems="center">
        <HStack my={6} space={10} alignItems="center">
          <Image source={{ uri: Nah }} size="sm" mx={10} />
          <Image source={{ uri: Yay }} size="sm" mx={10} />
        </HStack>
      </Stack>
    </Box>
  );
}
