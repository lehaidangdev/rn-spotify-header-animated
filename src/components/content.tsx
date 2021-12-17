import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Animated, {
  Extrapolate,
  useAnimatedScrollHandler,
  interpolate,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {} from 'react-native-gesture-handler';

import {Album, MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT} from '../models/models';
import Track from './track';
import ShufflePlay, {BUTTON_HEIGHT} from './shuffleplay';
import Header from './header';

interface ContentProps {
  album: Album;
  y: Animated.SharedValue<number>;
}

export default ({album: {artist, tracks}, y}: ContentProps) => {
  const derivedY = useDerivedValue(() => y.value);
  console.log('CONTENT', derivedY.value);

  const animatedLinearGradient = useAnimatedStyle(() => {
    const height = interpolate(
      derivedY.value,
      [-MAX_HEADER_HEIGHT, -BUTTON_HEIGHT / 2],
      [0, MAX_HEADER_HEIGHT + BUTTON_HEIGHT],
      {
        extrapolateRight: Extrapolate.CLAMP,
      },
    );
    return {
      height: height,
    };
  });

  const animatedArtist = useAnimatedStyle(() => {
    const opacity = interpolate(
      derivedY.value,
      [-MAX_HEADER_HEIGHT / 2, 0, MAX_HEADER_HEIGHT / 2],
      [0, 1, 0],
      {
        extrapolateRight: Extrapolate.CLAMP,
      },
    );
    return {
      opacity: opacity,
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      y.value = event.contentOffset.y;
      console.log('NEW Y', derivedY.value);
    },
  });
  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
      stickyHeaderIndices={[1]}>
      <View style={styles.cover}>
        <Animated.View style={[styles.gradient, animatedLinearGradient]}>
          <LinearGradient
            style={StyleSheet.absoluteFill}
            start={[0, 0.3]}
            end={[0, 1]}
            colors={['transparent', 'rgba(0, 0, 0, 0.2)', 'black']}
          />
        </Animated.View>
        <View style={styles.artistContainer}>
          <Animated.Text style={[styles.artist, animatedArtist]}>
            {artist}
          </Animated.Text>
        </View>
      </View>
      <View style={styles.header}>
        <Header {...{y, artist}} />
        <ShufflePlay />
      </View>
      <View style={styles.tracks}>
        {tracks.map((track, key) => (
          <Track index={key + 1} {...{track, key, artist}} />
        ))}
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: MIN_HEADER_HEIGHT - BUTTON_HEIGHT / 2,
  },
  cover: {
    height: MAX_HEADER_HEIGHT - BUTTON_HEIGHT,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
  },
  artistContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artist: {
    textAlign: 'center',
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  header: {
    marginTop: -BUTTON_HEIGHT,
  },
  tracks: {
    paddingTop: 32,
    backgroundColor: 'black',
  },
});
