import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import HomeStackScreen from './HomeStackScreen';
import AlbumStackScreen from './AlbumStackScreen';
import MyMusicStackScreen from './MyMusicStackScreen';
import ProfileStackScreen from './ProfileStackScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const AllBottomTabs = ({ route }: any) => {
  const { code } = route.params;
  console.log('codeAll', code);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Tab.Navigator
        initialRouteName="HomeStack"
        screenOptions={{ headerShown: false }} // header title 제거
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStackScreen}
          options={{ title: 'Home' }}
        />
        <Tab.Screen
          name="AlbumStack"
          component={AlbumStackScreen}
          options={{ title: 'Album' }}
        />
        <Tab.Screen
          name="MyMusicStack"
          component={MyMusicStackScreen}
          options={{ title: 'My Music' }}
        />
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStackScreen}
          options={{ title: 'Profile' }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default AllBottomTabs;
