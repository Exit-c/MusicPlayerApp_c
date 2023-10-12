import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type StackParamList = {
  Home: undefined;
  ArtistDetail: undefined;
};

export type HomeScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Home'>;
};
