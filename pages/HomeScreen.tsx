import { useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { HomeScreenProps } from '../types/home';
import PressSwipeCarousel from '../components/PressSwipeCarousel';
import { fetchSpotifyEpisodes } from '../redux/features/spotify/spotifySlice';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const dispatch = useAppDispatch();
  const { asccessToken } = useAppSelector((state) => state.spotify);
  const { episodes } = useAppSelector((state) => state.spotify);
  const { status } = useAppSelector((state) => state.spotify);
  const { error } = useAppSelector((state) => state.spotify);

  useEffect(() => {
    dispatch(fetchSpotifyEpisodes(asccessToken));
  }, [dispatch, asccessToken]);

  if (status === 'loading') {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }
  if (status === 'failed') {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <PressSwipeCarousel data={episodes} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
