import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  profilePicture: string;
  location: string;
  tags: string[];
}

interface FavoriteState {
  favoriteUsers: User[];
}

const initialState: FavoriteState = {
  favoriteUsers: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<User>) => {
      state.favoriteUsers.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteUsers = state.favoriteUsers.filter(
        (user) => user.id !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
