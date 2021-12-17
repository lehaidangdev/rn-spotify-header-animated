import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import Animated, {
  interpolate,
  Extrapolate,
  SharedValue,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {MIN_HEADER_HEIGHT, HEADER_DELTA} from '../models/models';
import {BUTTON_HEIGHT} from './shuffleplay';

interface HeaderProps {
  artist: string;
  y: SharedValue<number>;
}

export default ({artist, y}: HeaderProps) => {
  const derivedY = useDerivedValue(() => y.value);
  console.log('HEADER', derivedY.value);

  const animatedContainer = useAnimatedStyle(() => {
    const opacity = interpolate(
      derivedY.value,
      [HEADER_DELTA - 16, HEADER_DELTA],
      [0, 1],
      {
        extrapolateRight: Extrapolate.CLAMP,
      },
    );
    return {opacity: opacity};
  });

  const animatedArtistName = useAnimatedStyle(() => {
    const textOpacity = interpolate(
      derivedY.value,
      [HEADER_DELTA - 8, HEADER_DELTA - 4],
      [0, 1],
      {extrapolateRight: Extrapolate.CLAMP},
    );
    return {opacity: textOpacity};
  });
  return (
    <Animated.View style={[styles.container, animatedContainer]}>
      <Animated.Text style={[styles.title, animatedArtistName]}>
        {artist}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: BUTTON_HEIGHT / 2 - MIN_HEADER_HEIGHT,
    left: 0,
    right: 0,
    height: MIN_HEADER_HEIGHT,
    backgroundColor: 'black',
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '400',
  },
});
