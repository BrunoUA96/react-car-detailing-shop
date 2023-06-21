import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { LoadingStateInterface } from "./types";

const initialState: LoadingStateInterface = {
  isLoading: true,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
