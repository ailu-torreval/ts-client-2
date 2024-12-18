import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    createAction,
  } from "@reduxjs/toolkit";

import * as SecureStore from 'expo-secure-store';
import { User } from "../entities/User";
import { LoginUserDto } from "../entities/LoginUserDto";
import { UserAPI } from "../api/userAPI";
import { SignupUserDto } from "../entities/SignupUserDto";
import { Platform } from "react-native";
import { Order } from "../entities/Order";
  
  export interface UserState {
    user: User | null;
    token: string | null;
    activeOrders: Order[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: UserState = {
    user: null,
    token: null,
    activeOrders: [],
    loading: false,
    error: null,
  };

  function saveToken(token: string) {
    if (Platform.OS === 'web') {
      localStorage.setItem('token', token);
    } else {
    SecureStore.setItemAsync('token', token);
    }
  }
  
  export const login = createAsyncThunk(
    "login",
    async (credentials: LoginUserDto, thunkAPI) => {
      try {
        const response = await UserAPI.login(credentials);
        console.log("response", response);
        console.log(response);
        return response;
      } catch (error) {
        if (error instanceof Error) {
          console.log("error", error);
          return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  );
  
  export const signup = createAsyncThunk(
    "signup",
    async (userData: SignupUserDto, thunkAPI) => {
      try {
        const response = UserAPI.signup(userData);
        // console.log("userSlice", response);
        return response;
      } catch (error) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  );
  
  export const getProfile = createAsyncThunk(
    "profile",
    async (token: string, thunkAPI) => {
      try {
        const response = UserAPI.getProfile(token);
        return response;
      } catch (error) {
        if (error instanceof Error) {
          return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  );
  
  export const logout = createAsyncThunk('logout', async () => {
    if (Platform.OS === 'web') {
      await localStorage.removeItem('token');
    } else {
    await SecureStore.deleteItemAsync('token');
    }
  });
  
  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setToken: (state, action: PayloadAction<string>) => {
        state.token = action.payload;
      },
        addOrder: (state, action: PayloadAction<Order>) => {
          console.log("order from slice", action.payload);
        state.activeOrders.push(action.payload) 
        if (state.user && state.user.orders) {
          state.user.orders.push(action.payload);
        } else if (state.user) {
          state.user.orders = [action.payload];
        }
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          saveToken(action.payload.token);
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          console.log("state", state);
        })
        .addCase(signup.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(signup.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          saveToken(action.payload.token);
        })
        .addCase(signup.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(getProfile.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(getProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(logout.fulfilled, (state) => {
          state.token = '';
          state.user = null;
          state.activeOrders = [];
        });
    },
  });
  
  export const { setToken } = userSlice.actions;
  export const { addOrder } = userSlice.actions;
  
  export default userSlice.reducer;
  