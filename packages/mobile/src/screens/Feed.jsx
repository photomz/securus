import React, { useState } from 'react';
import { Alert } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { Box } from 'native-base';
import CardItem from '../components/TinderCard';
import A from '../assets/maskCAPTCHA/a.jpg';
import B from '../assets/maskCAPTCHA/b.jpg';
import C from '../assets/maskCAPTCHA/c.jpg';
import D from '../assets/maskCAPTCHA/d.jpg';
import E from '../assets/maskCAPTCHA/e.jpg';
import F from '../assets/maskCAPTCHA/f.jpg';
import G from '../assets/maskCAPTCHA/g.jpg';
import H from '../assets/maskCAPTCHA/h.jpg';

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
