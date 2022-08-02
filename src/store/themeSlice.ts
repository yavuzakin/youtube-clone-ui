import { createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  isDarkTheme: boolean;
}

const initialState: ThemeState = {
  isDarkTheme: true,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const { updateTheme } = themeSlice.actions;

export default themeSlice.reducer;
