import React, { useEffect, useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Center, Text } from 'native-base';

const DEEPLENS_LOCATION = {
  latitude: 1.311553,
  longitude: 103.790532,
  latitudeDelta: 0.001,
  longitudeDelta: 0.005,
};

export default function Home() {
  const [mapRegion, setmapRegion] = useState(null);

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
          >
            <Marker coordinate={DEEPLENS_LOCATION} title="SafeStop" />
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
