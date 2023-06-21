import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { SearchInterface } from "./types";

const initialState: SearchInterface = {
  searchValue: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
