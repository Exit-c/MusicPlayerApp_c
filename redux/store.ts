import { configureStore } from '@reduxjs/toolkit';
import spotifyReducer from './features/spotify/spotifySlice';

const store = configureStore({
  reducer: {
    spotify: spotifyReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
