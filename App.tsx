import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import useAnimatedMarker from './useAnimatedMarker';

const App = () => {
  const mapRegion = {
    latitude: -6.226734421460244,
    longitude: 106.99631198290072,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const mapRef = useRef<MapView | null>(null);
  const markerRef = useRef<Marker | null>(null);

  const newCoordinate = {
    latitude: -6.226286468560401,
    longitude: 107.0006464324527,
  };

  const initCoordinate = {
    latitude: -6.226734421460244,
    longitude: 106.99631198290072,
  };

  const { currentAnimatedCoordinate, markerCoordinate, animateMarker } =
    useAnimatedMarker(initCoordinate);

  useEffect(() => {}, [markerCoordinate]);

  const handlePress = () => {

    if (
      JSON.stringify(currentAnimatedCoordinate) ==
      JSON.stringify(initCoordinate)
    ) {
      animateMarker(newCoordinate);

      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: newCoordinate.latitude,
            longitude: newCoordinate.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          },
          2000
        );
      }
      console.log('ok change to new');
    } else {
      animateMarker(initCoordinate);
      console.log('ok change to init');
      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: initCoordinate.latitude,
            longitude: initCoordinate.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          },
          2000
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={mapRegion}
        ref={mapRef}
        minZoomLevel={15}>
        <Marker.Animated ref={markerRef} coordinate={markerCoordinate} />
      </MapView>
      <Button title="Move Marker" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
