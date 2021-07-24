import React, { useState } from 'react';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { Box } from 'native-base';
import CardItem from '../components/CardItem';
import Dialog from '../components/Dialog';

const appeals = [
  {
    id: 0,
    imageURI: 'https://getwallpapers.com/wallpaper/full/b/b/d/63297.jpg',
  },
  { id: 1, imageURI: 'https://wallpapercave.com/wp/wp1874702.jpg' },
  {
    id: 2,
    imageURI: 'https://getwallpapers.com/wallpaper/full/b/b/d/63297.jpg',
  },
  { id: 3, imageURI: 'https://wallpapercave.com/wp/wp1874702.jpg' },
  {
    id: 4,
    imageURI: 'https://getwallpapers.com/wallpaper/full/b/b/d/63297.jpg',
  },
  { id: 5, imageURI: 'https://wallpapercave.com/wp/wp1874702.jpg' },
  {
    id: 6,
    imageURI: 'https://getwallpapers.com/wallpaper/full/b/b/d/63297.jpg',
  },
  { id: 7, imageURI: 'https://wallpapercave.com/wp/wp1874702.jpg' },
  {
    id: 8,
    imageURI: 'https://getwallpapers.com/wallpaper/full/b/b/d/63297.jpg',
  },
  { id: 9, imageURI: 'https://wallpapercave.com/wp/wp1874702.jpg' },
];

export default function Feed() {
  const [cardCount, setCardCount] = useState(appeals.length - 1);
  const [outOfCardsDialog, setOutOfCardsDialog] = useState(false);

  return (
    <>
      <Box flex={1}>
        <CardStack
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          onSwiped={() => {
            setCardCount(cardCount - 1);
            if (cardCount === 0) {
              setOutOfCardsDialog(true);
            }
          }}
        >
          {appeals.map((item) => (
            <Card key={item.id}>
              <CardItem imageURI={item.imageURI} />
            </Card>
          ))}
        </CardStack>
      </Box>
      <Dialog
        header="No More Images"
        body="Here's a cookie for you 🍪"
        isOpen={outOfCardsDialog}
        onClose={() => setOutOfCardsDialog(false)}
      />
    </>
  );
}
