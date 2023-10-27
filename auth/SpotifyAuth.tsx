import { useEffect, useContext } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const SPOTIFY_CLIENT_ID = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
const SPOTIFY_REDIRECT_URI = process.env.EXPO_PUBLIC_SPOTIFY_REDIRECT_URI;

export default function SpotifyAuth({ navigation }: any) {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: SPOTIFY_CLIENT_ID,
      scopes: ['user-read-email', 'playlist-modify-public'],
      // To follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri({
        scheme: SPOTIFY_REDIRECT_URI,
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log('code', code);

      navigation.navigate('BottomTabs');
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/music_splash.jpg')}
        resizeMode="contain"
        style={styles.backgroundImage}
      >
        <TouchableOpacity
          style={styles.button}
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        >
          <Text style={styles.buttonTitle}>Login</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    backgroundColor: '#333',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  buttonTitle: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
