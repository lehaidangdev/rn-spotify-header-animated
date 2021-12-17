import * as React from 'react';
import {Image, StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {Album, MAX_HEADER_HEIGHT, HEADER_DELTA} from '../models/models';
import {BUTTON_HEIGHT} from './shuffleplay';

interface CoverProps {
  album: Album;
  y: SharedValue<number>;
}

export default ({album: {cover}, y}: CoverProps) => {
  const derivedY = useDerivedValue(() => y.value);
  const animatedCoverContainer = useAnimatedStyle(() => {
    const scale: any = interpolate(
      derivedY.value,
      [-MAX_HEADER_HEIGHT, 0],
      [4, 1],
      {
        extrapolateRight: Extrapolate.CLAMP,
      },
    );
    return {
      transform: [{scale: scale}],
    };
  });

  const animatedCoverOverlay = useAnimatedStyle(() => {
    const opacity = interpolate(
      derivedY.value,
      [-64, 0, HEADER_DELTA],
      [0, 0.2, 1],
      {
        extrapolateRight: Extrapolate.CLAMP,
      },
    );
    return {
      opacity: opacity,
    };
  });
  return (
    <Animated.View style={[styles.container, animatedCoverContainer]}>
      <Image style={styles.image} source={cover} />
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'black',
          },
          animatedCoverOverlay,
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: MAX_HEADER_HEIGHT + BUTTON_HEIGHT * 2,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});
