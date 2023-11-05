import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

// Define a type for the slice state
interface SpotifyState {
  asccessToken: string;
  refreshToken: string;
  episodes: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

// Define the initial state using that type
const initialState: SpotifyState = {
  asccessToken: '',
  refreshToken: '',
  episodes: [],
  status: 'idle',
  error: '',
};

const episodeEndpoint =
  'https://api.spotify.com/v1/episodes/3hGhgcjRDI0PFnKmJpMTyo';
// Spotify API 호출
export const fetchSpotifyEpisodes = createAsyncThunk(
  'spotify/fetchEpisodes',
  async (accessToken: string) => {
    try {
      const response = await fetch(episodeEndpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        //ok 속성은 HTTP 응답 상태 코드가 200에서 299 사이의 값인지 여부를 나타냄
        throw new Error('Failed to fetch episodes');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const spotifySlice = createSlice({
  name: 'spotify',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getAccessToken: (state, action: PayloadAction<string>) => {
      state.asccessToken = action.payload;
    },
    getRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpotifyEpisodes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSpotifyEpisodes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.episodes = action.payload;
        state.error = undefined;
      })
      .addCase(fetchSpotifyEpisodes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { getAccessToken, getRefreshToken } = spotifySlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.spotify.value;

export default spotifySlice.reducer;
