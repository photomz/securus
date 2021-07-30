import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Home() {
  const [mapRegion, setmapRegion] = useState({
    latitude: 1.311553,
    longitude: 103.790532,
    latitudeDelta: 0.001,
    longitudeDelta: 0.005,
  });

  return (
    <View style={styles.container}>
      <MapView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={mapRegion}
        showsUserLocation
      >
        <Marker coordinate={mapRegion} title="DeepLens Location" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
