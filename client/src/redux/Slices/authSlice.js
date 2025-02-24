import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

const initialState = {
  loading: false,
};

export const signUp = createAsyncThunk(
  "/signUp",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signIn = createAsyncThunk(
  "/signIn",
  async (data, { rejectWithValue }) => {
    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        data, {withCredentials: true}
      );

      const verifyres = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        {withCredentials: true}
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message);
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.response.data.message);
      })

      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.response.data.message);
      });
  },
});

export default authSlice.reducer;
