import { useRef, useState } from 'react';
import { AnimatedRegion, MarkerAnimatedProps, LatLng } from 'react-native-maps';

const useAnimatedMarker = (initialCoordinate: LatLng) => {
  const [currentAnimatedCoordinate, setCurrentAnimatedCoordinate] = useState({
    latitude: initialCoordinate.latitude,
    longitude: initialCoordinate.longitude,
  });
  const markerCoordinate = useRef(
    new AnimatedRegion({
      latitude: initialCoordinate.latitude,
      longitude: initialCoordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  ).current;

  const animateMarker = (newCoordinate: LatLng, duration = 2000) => {
    markerCoordinate
      .timing({
        latitude: newCoordinate.latitude,
        longitude: newCoordinate.longitude,
        duration: duration,
        useNativeDriver: false,
      })
      .start();
    setCurrentAnimatedCoordinate({
      latitude: newCoordinate.latitude,
      longitude: newCoordinate.longitude,
    });
  };

  return {
    markerCoordinate,
    animateMarker,
    currentAnimatedCoordinate,
  };
};

export default useAnimatedMarker;
