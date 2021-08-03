import React, { useEffect, useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Center, Text } from 'native-base';
import SafeStop from '../assets/misc/safestop.png';

const DEEPLENS_LOCATION = {
  latitude: 1.311423,
  longitude: 103.790593,
  latitudeDelta: 0.001,
  longitudeDelta: 0.005,
};

// some abstract math that works
function calculateDistance({ latitude, longitude }) {
  if (
    latitude === DEEPLENS_LOCATION.latitude &&
    longitude === DEEPLENS_LOCATION.longitude
  ) {
    return 0;
  }

  const radlat1 = (Math.PI * latitude) / 180;
  const radlat2 = (Math.PI * DEEPLENS_LOCATION.latitude) / 180;
  const theta = longitude - DEEPLENS_LOCATION.longitude;
  const radtheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  return dist * 1.609344 * 1000; // no idea but refer to this: https://www.geodatasource.com/developers/javascript
}

export default function Home() {
  const [mapRegion, setmapRegion] = useState(null);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Missing Permissions',
          'Please give us access to your location to proceed.'
        );
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      setmapRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

  return (
    <>
      {mapRegion ? (
        <View style={styles.container}>
          <MapView
            provider="google"
            style={styles.map}
            region={mapRegion}
            showsUserLocation
            showsMyLocationButton
            showsCompass
            onUserLocationChange={({ nativeEvent }) => {
              if (
                !rewardClaimed &&
                calculateDistance(nativeEvent.coordinate) <= 50
              ) {
                Alert.alert('SafeStop in Proximity', 'Claim your rewards?', [
                  {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Yes',
                    onPress: () => console.log('OK Pressed'), // increment user coins
                  },
                ]);

                setRewardClaimed(true);
              }
            }}
          >
            <Marker
              coordinate={DEEPLENS_LOCATION}
              title="Rail Corridor"
              // eslint-disable-next-line global-require
              image={SafeStop}
            />
          </MapView>
        </View>
      ) : (
        <Center flex={1}>
          <Text bold fontSize="xl" mt={2}>
            Loading...
          </Text>
        </Center>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    alignSelf: 'stretch',
    height: '100%',
  },
});
