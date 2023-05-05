import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   isLoading: true,
};

export const loadingSlice = createSlice({
   name: 'loading',
   initialState,
   reducers: {
      setIsLoading: (state, action) => {
         state.isLoading = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setIsLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
