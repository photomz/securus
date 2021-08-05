import React from 'react';
import { Image, Box, Stack, Heading } from 'native-base';

export default function CardComponent({ image, name }) {
  return (
    <Box bg="white" shadow={2} rounded="lg" maxWidth="60%" mr={3}>
      <Image source={image} resizeMode="cover" height={230} roundedTop="md" />
      <Stack space={4} p={[4, 4, 8]}>
        <Heading size={['md', 'lg', 'md']} noOfLines={2}>
          {name}
        </Heading>
      </Stack>
    </Box>
  );
}
