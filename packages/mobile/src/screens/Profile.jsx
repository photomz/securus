import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Center, Icon, Text as TextNB } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Auth, Storage } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

function Home() {
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
      <TextNB bold fontSize="xl" mt={2}>
        We Eat Bears
      </TextNB>
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

export default function Profile() {
  const [image, setImage] = useState(false);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const cameraRollStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          cameraRollStatus.status !== 'granted' ||
          cameraStatus.status !== 'granted'
        ) {
          Alert.alert(
            'Missing Permissions',
            'Please give us access to your camera and camera roll to proceed.'
          );
        }
      }
    })();
  }, []);

  const uploadImage = async (filename, img) => {
    try {
      const data = await Storage.put(filename, img, {
        level: 'public',
        contentType: 'image/jpeg',
        progressCallback(progress) {
          setPercentage((progress.loaded / progress.total) * 100);
        },
      });
      return data.key;
    } catch (e) {
      console.log(e);
      return e.response;
    }
  };

  const downloadImage = async (uri) => {
    try {
      const data = await Storage.get(uri);
      setImage(true);
      Alert.alert('Upload Successful', 'Face ID has been set up!');
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const takePhoto = async () => {
    const pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: 'Images',
      aspect: [4, 3],
    });

    try {
      if (pickerResult.cancelled) {
        Alert.alert(
          'Upload Cancelled',
          'Please take a photo of your face for Face ID'
        );
      } else {
        setPercentage(0);
        const img = await fetchImageFromUri(pickerResult.uri);
        const user = await Auth.currentAuthenticatedUser();
        const uploadUrl = await uploadImage(
          `faceIds/${user.username}.jpg`,
          img
        );
        downloadImage(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Upload Failed', 'Please try again later');
    }
  };

  return (
    <>
      {image ? (
        <Home />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Set up your Face ID!</Text>
          {percentage !== 0 && (
            <Text style={styles.percentage}>{percentage}%</Text>
          )}
          <Button
            bg="primary.400"
            p={4}
            onPress={takePhoto}
            startIcon={
              <Icon
                as={
                  <MaterialCommunityIcons
                    name="face-recognition"
                    color="white"
                  />
                }
                size={6}
              />
            }
            _text={{
              fontSize: 'md',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Take a Photo
          </Button>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    marginHorizontal: 15,
  },
  percentage: {
    marginBottom: 10,
  },
  result: {
    paddingTop: 5,
  },
  info: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
