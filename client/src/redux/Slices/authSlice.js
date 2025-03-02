import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
import { getCookie, removeCookie, setCookie } from "../../utils/utils.js";

const initialState = {
  loading: false,
  authenticated: getCookie('isAuthenticated') || false,
  name: getCookie('name') || null,
  id: getCookie('id') || null,
  preferences: JSON.parse(localStorage.getItem('preferences')) || [],
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
      return {...res.data, ...verifyres.data}

    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    logOut: function(state){
        state.authenticated = false
        state.id = null
        state.name = null
        removeCookie('isAuthenticated')
        removeCookie('name')
        removeCookie('id')
    }
  },
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
        state.authenticated = action.payload.authenticated
        state.name = action.payload.name
        state.id = action.payload.id

        setCookie('isAuthenticated', action.payload.authenticated)
        setCookie('name', action.payload.name)
        setCookie('id', action.payload.id)
        setCookie('email', action.payload.email)

        state.preferences = action.payload.preferences
        localStorage.setItem("preferences", JSON.stringify(action.payload.preferences))

        toast.success(action.payload.message);
    
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.response.data.message);
      });
  },
});

export default authSlice.reducer;
export const {logOut} = authSlice.actions
