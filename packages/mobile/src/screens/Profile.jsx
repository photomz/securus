/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Clipboard, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Auth, Storage } from 'aws-amplify';

export default function App() {
  const [image, setImage] = useState(null);
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
          alert('Sorry, we need these permissions to make this work!');
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
      setImage(data);
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
        alert('Upload cancelled');
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
      alert('Upload failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set your Face ID!</Text>
      {percentage !== 0 && <Text style={styles.percentage}>{percentage}%</Text>}

      {image && (
        <View>
          <Text style={styles.result}>
            <Image
              source={{ uri: image }}
              style={{ width: 250, height: 250 }}
            />
          </Text>
          <Text style={styles.info} onPress={() => Clipboard.setString(image)}>
            Long press to copy the image url
          </Text>
        </View>
      )}

      <Button onPress={takePhoto} title="Take a photo" />
    </View>
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
