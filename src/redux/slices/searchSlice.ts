import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

type SearchInterface = {
  searchValue: string;
};

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

export const selectSearchValue = (state: RootState) => state.search;

// Action creators are generated for each case reducer function
export const { setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
