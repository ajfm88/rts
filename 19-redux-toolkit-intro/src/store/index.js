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

const startingState = sotre.getState();
console.log(JSON.stringify(startingState));

store.dispatch({
  type: 'song/addSong',
  payload: 'New Song!!!',
});

const finalState = store.getState();
console.log(JSON.stringify(finalState));
