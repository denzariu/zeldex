import { useEffect, useState, useMemo } from 'react';
import { Animated, Dimensions } from 'react-native';
import { AnimatedRegion, Region } from 'react-native-maps';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ITEM_SPACING = 10;
const ITEM_PREVIEW = 10;
const ITEM_WIDTH = screen.width - 2 * ITEM_SPACING - 2 * ITEM_PREVIEW;
const SNAP_WIDTH = ITEM_WIDTH + ITEM_SPACING;
const BREAKPOINT1 = 246;

export interface MarkerItem {
  id: number;
  amount: number;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

export interface AnimatedMapState {
  panX: Animated.Value;
  panY: Animated.Value;
  index: number;
  canMoveHorizontal: boolean;
  scrollY: Animated.AnimatedInterpolation;
  scrollX: Animated.AnimatedInterpolation;
  scale: Animated.AnimatedInterpolation;
  translateY: Animated.AnimatedInterpolation;
  markers: MarkerItem[];
  region: AnimatedRegion;
}

export const useAnimatedRegion = (
  initialRegion: Region,
  displayedMarkers: any,
) => {
  const initialState = useMemo(() => {
    const panX = new Animated.Value(0);
    const panY = new Animated.Value(0);

    const scrollY = panY.interpolate({
      inputRange: [-1, 1],
      outputRange: [1, -1],
    });

    const scrollX = panX.interpolate({
      inputRange: [-1, 1],
      outputRange: [1, -1],
    });

    const scale = scrollY.interpolate({
      inputRange: [0, BREAKPOINT1],
      outputRange: [1, 1.6],
      extrapolate: 'clamp',
    });

    const translateY = scrollY.interpolate({
      inputRange: [0, BREAKPOINT1],
      outputRange: [0, -100],
      extrapolate: 'clamp',
    });

    return {
      panX,
      panY,
      index: 0,
      canMoveHorizontal: true,
      scrollY,
      scrollX,
      scale,
      translateY,
      markers: displayedMarkers,
      region: new AnimatedRegion(initialRegion),
    };
  }, []);

  const [state, setState] = useState<AnimatedMapState>(initialState);

  const setListeners = () => {
    const { region, panX, panY, scrollX, markers } = state;

    panX.addListener(onPanXChange);
    panY.addListener(onPanYChange);

    region.stopAnimation(() => {});
    region
      .timing({
        latitude: scrollX.interpolate({
          inputRange: markers.map((_m: any, i: any) => i * SNAP_WIDTH),
          outputRange: markers.map((m: any) => m.coordinate.latitude),
        }) as unknown as number,
        longitude: scrollX.interpolate({
          inputRange: markers.map((_m: any, i: any) => i * SNAP_WIDTH),
          outputRange: markers.map((m: any) => m.coordinate.longitude),
        }) as unknown as number,
        useNativeDriver: false,
        duration: 0,
        toValue: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      })
      .start();
  };

  const onPanXChange = ({ value }: any) => {
    const { index } = state;
    const newIndex = Math.floor((-1 * value + SNAP_WIDTH / 2) / SNAP_WIDTH);
    if (index !== newIndex) {
      setState({ ...state, index: newIndex });
    }
  };

  const onPanYChange = ({ value }: any) => {
    const { canMoveHorizontal, region, scrollY, scrollX, markers, index } =
      state;
    const shouldBeMovable = Math.abs(value) < 2;
    if (shouldBeMovable !== canMoveHorizontal) {
      setState({ ...state, canMoveHorizontal: shouldBeMovable });
      if (!shouldBeMovable) {
        const { coordinate } = markers[index];
        region.stopAnimation(() => {});
        region
          .timing({
            latitude: scrollY.interpolate({
              inputRange: [0, BREAKPOINT1],
              outputRange: [
                coordinate.latitude,
                coordinate.latitude - LATITUDE_DELTA * 0.5 * 0.375,
              ],
              extrapolate: 'clamp',
            }) as unknown as number,
            latitudeDelta: scrollY.interpolate({
              inputRange: [0, BREAKPOINT1],
              outputRange: [LATITUDE_DELTA, LATITUDE_DELTA * 0.5],
              extrapolate: 'clamp',
            }) as unknown as number,
            longitudeDelta: scrollY.interpolate({
              inputRange: [0, BREAKPOINT1],
              outputRange: [LONGITUDE_DELTA, LONGITUDE_DELTA * 0.5],
              extrapolate: 'clamp',
            }) as unknown as number,
            useNativeDriver: false,
            duration: 0,
            toValue: 0,
            longitude: coordinate.longitude,
          })
          .start();
      } else {
        region.stopAnimation(() => {});
        region
          .timing({
            latitude: scrollX.interpolate({
              inputRange: markers.map((_m: any, i: any) => i * SNAP_WIDTH),
              outputRange: markers.map((m: any) => m.coordinate.latitude),
            }) as unknown as number,
            longitude: scrollX.interpolate({
              inputRange: markers.map((_m: any, i: any) => i * SNAP_WIDTH),
              outputRange: markers.map((m: any) => m.coordinate.longitude),
            }) as unknown as number,
            useNativeDriver: false,
            duration: 0,
            toValue: 0,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          })
          .start();
      }
    }
  };
  useEffect(() => {
    setListeners();
  }, []);

  return state;
};