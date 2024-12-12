import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoints } from "../../config/api";

const initialState = {
  isLoading: false,
  user: null,
  isAuthenticated: false,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData) => {
    const response = await axios.post(endpoints.auth.register, formData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk("auth/login", async (formData) => {
  const response = await axios.post(endpoints.auth.login, formData, {
    withCredentials: true,
  });
  return response.data;
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const response = await axios.get(endpoints.auth.checkAuth, {
    withCredentials: true,
  });
  return response.data;
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
  const response = await axios.post(
    endpoints.auth.logout,
    {},
    {
      withCredentials: true,
    }
  );
  if (response.data.success) {
    window.location.href = '/auth/login';
  }
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      // Check auth cases
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
