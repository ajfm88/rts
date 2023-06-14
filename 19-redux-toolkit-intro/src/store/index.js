import { configureStore, createSlice } from '@reduxjs/toolkit';

const songSlice = createSlice({
  name: 'song',
  initialState: [],
  reducers: {
    addSong(state, action) {
      state.push(action.payload);
    },
    removeSong(state, action) {
      //
    },
  },
});

const store = configureStore({
  reducer: {
    songs: songSlice.reducer,
  },
});

// console.log(songsSlice.actions.addSong('Some song!'));

const startingState = sotre.getState();
console.log(JSON.stringify(startingState));

store.dispatch(songSlice.actions.addSong('Some song!'));

const finalState = store.getState();
console.log(JSON.stringify(finalState));
