import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {Album as AlbumModel} from '../models/models';
import Content from './content';
import Cover from './cover';

interface AlbumProps {
  album: AlbumModel;
}

export default ({album}: AlbumProps) => {
  const y = useSharedValue(0);
  return (
    <View style={styles.container}>
      <Cover {...{y, album}} />
      <Content {...{y, album}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
