import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../pages/HomeScreen';
import ArtistDetail from '../pages/ArtistDetail';

const HomeStackScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      {/* ArtistDetail을 Stack Navigator로 감싸서 페이지 쌓기 */}
      <Stack.Screen
        name="ArtistDetail"
        component={ArtistDetail}
        options={{ title: 'ArtistDetail' }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;
