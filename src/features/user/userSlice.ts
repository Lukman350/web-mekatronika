import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    nis: 0,
    username: "",
    email: "",
    role: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.nis = action.payload.nis;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
