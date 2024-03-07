import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IsLoggedIn {
  value: boolean;
}

const initialState: IsLoggedIn = {
  value: false,
};

const loginSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    loggedIn: state => {
      state.value = true;
    },
    loggedOut: state => {
      state.value = false;
    },
  },
});

export const {loggedIn, loggedOut} = loginSlice.actions;
export default loginSlice.reducer;
