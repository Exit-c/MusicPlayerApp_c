import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch } from '../../hooks';
import { getAccessToken, getRefreshToken } from './spotifySlice';
import { Buffer } from 'buffer';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const SPOTIFY_CLIENT_ID = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.EXPO_PUBLIC_SPOTIFY_REDIRECT_URI;

export default function SpotifyAuth({ navigation }: any) {
  const dispatch = useAppDispatch();

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

      const requestBody = new URLSearchParams();
      requestBody.append('code', code);
      requestBody.append('grant_type', 'authorization_code');
      SPOTIFY_REDIRECT_URI
        ? requestBody.append('redirect_uri', SPOTIFY_REDIRECT_URI)
        : null;

      fetch(discovery.tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            Buffer.from(
              `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
            ).toString('base64'),
        },
        body: requestBody.toString(),
      })
        .then((response) => response.json())
        .then((data) => {
          const { access_token, refresh_token } = data;
          dispatch(getAccessToken(access_token));
          dispatch(getRefreshToken(refresh_token));
        })
        .catch((error) => {
          console.error('Token exchange error:', error);
        });

      navigation.navigate('BottomTabs');
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/music_splash.jpg')}
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
