import React, { useState } from 'react';
import { Alert } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { Box } from 'native-base';
import CardItem from '../components/TinderCard';
import { A, B, C, D, E, F, G, H } from '../assets';

const appeals = [
  { id: 0, image: A },
  { id: 1, image: B },
  { id: 2, image: C },
  { id: 3, image: D },
  { id: 4, image: E },
  { id: 5, image: F },
  { id: 6, image: G },
  { id: 7, image: H },
];

export default function Feed() {
  const [cardCount, setCardCount] = useState(appeals.length - 1);

  return (
    <Box flex={1}>
      <CardStack
        verticalSwipe={false}
        renderNoMoreCards={() => null}
        onSwiped={() => {
          setCardCount(cardCount - 1);
          if (cardCount === 0) {
            Alert.alert('No More Images', "But here's a cookie for you 🍪");
          }
        }}
      >
        {appeals.map((item) => (
          <Card key={item.id}>
            <CardItem image={item.image} />
          </Card>
        ))}
      </CardStack>
    </Box>
  );
}
