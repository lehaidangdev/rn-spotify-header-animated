import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar} from 'react-native';
import {Album as AlbumModel} from './src/models/models';
import Album from './src/components/album';

const album: AlbumModel = {
  name: 'Remote Control',
  artist: 'Jan Blomqvist',
  release: 2016,
  // eslint-disable-next-line global-require
  cover: require('./src/assets/1.jpg'),
  tracks: [
    {name: 'Stories Over'},
    {name: 'More', artist: 'Jan Blomqvist, Elena Pitoulis'},
    {name: 'Empty Floor'},
    {name: 'Her Great Escape'},
    {name: 'Dark Noise'},
    {name: 'Drift', artist: 'Jan Blomqvist, Aparde'},
    {name: 'Same Mistake'},
    {
      name: 'Dancing People Are Never Wrong',
      artist: 'Jan Blomqvist, The Bianca Story',
    },
    {name: 'Back in the Taxi'},
    {name: 'Ghosttrack'},
    {name: 'Just OK'},
    {name: 'The End'},
  ],
};

const App = () => {
  // const [ready, setReady] = useState(false);
  // useEffect(() => {
  //   (async () => {
  //     // await Asset.loadAsync(album.cover);
  //     setReady(true);
  //   })();
  // });
  // if (!ready) {
  //   return <ActivityIndicator />;
  // }
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Album {...{album}} />
    </>
  );
};

export default App;
