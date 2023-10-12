import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './pages/HomeStackScreen';
import AlbumStackScreen from './pages/AlbumStackScreen';
import MyMusicStackScreen from './pages/MyMusicStackScreen';
import ProfileStackScreen from './pages/ProfileStackScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }} // header title 제거
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{ title: 'Home' }}
        />
        <Tab.Screen
          name="Album"
          component={AlbumStackScreen}
          options={{ title: 'Album' }}
        />
        <Tab.Screen
          name="My Music"
          component={MyMusicStackScreen}
          options={{ title: 'My Music' }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{ title: 'Profile' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
